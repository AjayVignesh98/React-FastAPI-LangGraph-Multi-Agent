import type { WorkflowStatus } from '../types'

interface WorkflowStatusProps {
  status: WorkflowStatus
}

const statusConfig: Record<WorkflowStatus, { label: string; color: string; bgColor: string }> = {
  idle: { label: 'Ready', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  researching: { label: 'Researching...', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  writing: { label: 'Writing...', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  editing: { label: 'Editing...', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  completed: { label: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100' },
  error: { label: 'Error', color: 'text-red-600', bgColor: 'bg-red-100' },
}

export function WorkflowStatusBadge({ status }: WorkflowStatusProps) {
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bgColor}`}>
      {status === 'researching' || status === 'writing' || status === 'editing' ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {config.label}
    </span>
  )
}
