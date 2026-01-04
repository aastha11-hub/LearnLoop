import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function StudentDashboard() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/topics')
      const data = await response.json()
      // Only show enabled topics
      setTopics(data.filter(topic => topic.enabled))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching topics:', error)
      setLoading(false)
    }
  }

  const handleTopicClick = (topicId) => {
    navigate(`/topic/${topicId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to LearnLoop!</h1>
          <p className="text-gray-600">Select a DSA topic to start learning</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading topics...</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">No topics available. Please contact an admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => handleTopicClick(topic.id)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{topic.name}</h3>
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Click to view Story Mode and Concept Mode videos
                </p>
                <div className="flex items-center text-indigo-600 font-medium">
                  Start Learning →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard

