import React from 'react'

interface TopicInputProps {
  onSubmit: (topic: string) => void
  isLoading: boolean
}

export function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onSubmit(topic.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., 'The future of renewable energy')"
          disabled={isLoading}
          className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200"
        >
          {isLoading ? 'Processing...' : 'Generate'}
        </button>
      </div>
    </form>
  )
}
