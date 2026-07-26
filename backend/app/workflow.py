from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from app.agents.researcher import run_researcher
from app.agents.writer import run_writer
from app.agents.editor import run_editor


class WorkflowState(TypedDict):
    topic: str
    researcher_output: Annotated[str, "Research results"]
    writer_output: Annotated[str, "Written content"]
    editor_output: Annotated[str, "Final polished content"]
    error: str | None


async def researcher_node(state: WorkflowState) -> dict:
    try:
        result = await run_researcher(state["topic"])
        return {"researcher_output": result}
    except Exception as e:
        return {"error": f"Research failed: {str(e)}"}


async def writer_node(state: WorkflowState) -> dict:
    try:
        if state.get("error"):
            return {}
        result = await run_writer(state["researcher_output"])
        return {"writer_output": result}
    except Exception as e:
        return {"error": f"Writing failed: {str(e)}"}


async def editor_node(state: WorkflowState) -> dict:
    try:
        if state.get("error"):
            return {}
        result = await run_editor(state["writer_output"])
        return {"editor_output": result}
    except Exception as e:
        return {"error": f"Editing failed: {str(e)}"}


def should_continue(state: WorkflowState) -> str:
    if state.get("error"):
        return "error"
    if not state.get("writer_output"):
        return "writer"
    if not state.get("editor_output"):
        return "editor"
    return "end"


def create_workflow() -> StateGraph:
    workflow = StateGraph(WorkflowState)

    workflow.add_node("researcher", researcher_node)
    workflow.add_node("writer", writer_node)
    workflow.add_node("editor", editor_node)

    workflow.set_entry_point("researcher")

    workflow.add_conditional_edges(
        "researcher",
        should_continue,
        {
            "writer": "writer",
            "error": END,
        },
    )

    workflow.add_conditional_edges(
        "writer",
        should_continue,
        {
            "editor": "editor",
            "error": END,
        },
    )

    workflow.add_conditional_edges(
        "editor",
        should_continue,
        {
            "end": END,
        },
    )

    return workflow.compile()


content_graph = create_workflow()
