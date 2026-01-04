import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Topic() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentVideo, setCurrentVideo] = useState('story') // 'story' or 'concept'
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  useEffect(() => {
    fetchTopic()
  }, [id])

  const fetchTopic = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/topics`)
      const data = await response.json()
      const foundTopic = data.find(t => t.id === parseInt(id))
      if (foundTopic) {
        setTopic(foundTopic)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching topic:', error)
      setLoading(false)
    }
  }

  const convertGoogleDriveUrl = (url) => {
    // Convert Google Drive share link to embeddable iframe URL
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return url
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
  }

  const handleBackToDashboard = () => {
    navigate('/student')
  }

  // Mock quiz questions - in real app, this would come from backend
  const quizQuestions = [
    {
      question: 'What is the time complexity of accessing an element in an array by index?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0
    },
    {
      question: 'Which data structure follows FIFO (First In First Out) principle?',
      options: ['Stack', 'Queue', 'Array', 'Linked List'],
      correctAnswer: 1
    }
  ]

  const currentQuiz = quizQuestions[0] // Using first question for MVP

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading topic...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Topic not found</p>
            <button
              onClick={handleBackToDashboard}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isCorrect = selectedAnswer === currentQuiz.correctAnswer

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBackToDashboard}
          className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.name}</h1>
          <p className="text-gray-600">Watch the videos and test your understanding</p>
        </div>

        {!showQuiz ? (
          <>
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setCurrentVideo('story')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  currentVideo === 'story'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Story Mode
              </button>
              <button
                onClick={() => setCurrentVideo('concept')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  currentVideo === 'concept'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Concept Mode
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentVideo === 'story' ? 'Story Mode Video' : 'Concept Mode Video'}
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={convertGoogleDriveUrl(
                    currentVideo === 'story' ? topic.storyVideoUrl : topic.conceptVideoUrl
                  )}
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Take Quiz →
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Quiz: Test Your Understanding</h2>
            
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-900 mb-4">
                {currentQuiz.question}
              </p>
              <div className="space-y-3">
                {currentQuiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !quizSubmitted && setSelectedAnswer(index)}
                    disabled={quizSubmitted}
                    className={`w-full text-left px-4 py-3 rounded-md border-2 transition-colors ${
                      selectedAnswer === index
                        ? quizSubmitted
                          ? isCorrect && index === currentQuiz.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : !isCorrect && index === currentQuiz.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : selectedAnswer === index && !isCorrect
                            ? 'border-red-500 bg-red-50'
                            : 'border-indigo-500 bg-indigo-50'
                          : 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {quizSubmitted ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-md ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. The correct answer is highlighted in green.'}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowQuiz(false)
                      setSelectedAnswer(null)
                      setQuizSubmitted(false)
                    }}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Watch Videos Again
                  </button>
                  <button
                    onClick={handleBackToDashboard}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Submit Answer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Topic

