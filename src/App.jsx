import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Vite + Tailwind 4
        </h1>
        
        <p className="text-gray-600 text-lg">
          Successfully set up your React project with <span className="font-mono font-bold text-blue-500">Tailwind CSS 4.x</span>
        </p>

        <div className="flex justify-center py-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg hover:shadow-blue-200"
          >
            Count is {count}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 text-sm text-gray-400">
          Edit <code className="bg-gray-50 px-1 rounded text-pink-500">src/App.jsx</code> to get started
        </div>
      </div>
    </div>
  )
}

export default App
