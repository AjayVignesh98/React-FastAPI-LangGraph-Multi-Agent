export type WorkflowStatus = 'idle' | 'researching' | 'writing' | 'editing' | 'completed' | 'error'

export interface WorkflowResponse {
  id: string
  topic: string
  status: WorkflowStatus
  researcher_output: string | null
  writer_output: string | null
  editor_output: string | null
  error: string | null
}

export interface WorkflowRequest {
  topic: string
}
