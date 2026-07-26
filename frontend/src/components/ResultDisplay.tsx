import type { WorkflowResponse } from '../types'
import { WorkflowStatusBadge } from './WorkflowStatus'

interface ResultDisplayProps {
  result: WorkflowResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const sections = [
    { title: 'Research', content: result.researcher_output, icon: '🔍' },
    { title: 'Draft', content: result.writer_output, icon: '✍️' },
    { title: 'Final', content: result.editor_output, icon: '✨' },
  ].filter((s) => s.content)

  return (
    <div className="w-full max-w-4xl mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Results for: {result.topic}</h2>
        <WorkflowStatusBadge status={result.status} />
      </div>

      {result.error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{result.error}</p>
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                {section.icon} {section.title}
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
