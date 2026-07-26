from pydantic import BaseModel, Field
from enum import Enum


class AgentRole(str, Enum):
    RESEARCHER = "researcher"
    WRITER = "writer"
    EDITOR = "editor"


class WorkflowStatus(str, Enum):
    IDLE = "idle"
    RESEARCHING = "researching"
    WRITING = "writing"
    EDITING = "editing"
    COMPLETED = "completed"
    ERROR = "error"


class AgentResult(BaseModel):
    role: AgentRole
    content: str
    status: WorkflowStatus


class WorkflowRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=500, description="Topic to create content about")


class WorkflowResponse(BaseModel):
    id: str
    topic: str
    status: WorkflowStatus
    researcher_output: str | None = None
    writer_output: str | None = None
    editor_output: str | None = None
    error: str | None = None
