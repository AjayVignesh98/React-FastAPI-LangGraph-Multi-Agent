import { TopicInput } from './components/TopicInput'
import { ResultDisplay } from './components/ResultDisplay'
import { useWorkflow } from './hooks/useWorkflow'

function App() {
  const { execute, reset, status, result, error } = useWorkflow()
  const isLoading = status === 'researching' || status === 'writing' || status === 'editing'

  const handleSubmit = async (topic: string) => {
    try {
      await execute({ topic })
    } catch {
      // Error is handled in the hook
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Agent Content Creation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powered by LangGraph - Three AI agents collaborate to research, write, and edit content on any topic
          </p>
        </header>

        <main className="flex flex-col items-center">
          <TopicInput onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl w-full">
              <p className="text-red-700 text-center">{error}</p>
              <button
                onClick={reset}
                className="mt-2 text-sm text-red-600 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {result && <ResultDisplay result={result} />}

          {status === 'completed' && (
            <button
              onClick={reset}
              className="mt-6 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transition-colors duration-200"
            >
              Create Another
            </button>
          )}
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Built with React, FastAPI, LangGraph & Ollama</p>
        </footer>
      </div>
    </div>
  )
}

export default App
