import { useState, useCallback } from 'react'
import type { WorkflowRequest, WorkflowResponse, WorkflowStatus } from '../types'

const API_BASE = '/api'

export function useWorkflow() {
  const [status, setStatus] = useState<WorkflowStatus>('idle')
  const [result, setResult] = useState<WorkflowResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (request: WorkflowRequest) => {
    setStatus('researching')
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_BASE}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Workflow failed')
      }

      const data: WorkflowResponse = await response.json()
      setResult(data)
      setStatus(data.status)
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      setStatus('error')
      throw err
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  return { execute, reset, status, result, error }
}
