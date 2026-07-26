from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uuid
import time

from app.config import get_settings
from app.models.schemas import WorkflowRequest, WorkflowResponse, WorkflowStatus
from app.workflow import content_graph


settings = get_settings()
active_workflows: dict[str, WorkflowResponse] = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    active_workflows.clear()


app = FastAPI(
    title="Multi-Agent Content Creation API",
    version="1.0.0",
    description="A multi-agent system for content creation using LangGraph",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}


@app.post("/api/workflow", response_model=WorkflowResponse)
async def start_workflow(request: WorkflowRequest):
    workflow_id = str(uuid.uuid4())

    initial_state = {
        "topic": request.topic,
        "researcher_output": "",
        "writer_output": "",
        "editor_output": "",
        "error": None,
    }

    try:
        result = await content_graph.ainvoke(initial_state)

        response = WorkflowResponse(
            id=workflow_id,
            topic=request.topic,
            status=WorkflowStatus.COMPLETED if not result.get("error") else WorkflowStatus.ERROR,
            researcher_output=result.get("researcher_output"),
            writer_output=result.get("writer_output"),
            editor_output=result.get("editor_output"),
            error=result.get("error"),
        )

        active_workflows[workflow_id] = response
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Workflow failed: {str(e)}")


@app.get("/api/workflow/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(workflow_id: str):
    if workflow_id not in active_workflows:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return active_workflows[workflow_id]


@app.get("/api/workflows", response_model=list[WorkflowResponse])
async def list_workflows():
    return list(active_workflows.values())
