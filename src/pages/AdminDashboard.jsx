import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function AdminDashboard() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    storyVideoUrl: '',
    conceptVideoUrl: ''
  })

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/topics')
      const data = await response.json()
      setTopics(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching topics:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormData({ name: '', storyVideoUrl: '', conceptVideoUrl: '' })
        setShowAddForm(false)
        fetchTopics()
      }
    } catch (error) {
      console.error('Error adding topic:', error)
    }
  }

  const handleToggleEnabled = async (topicId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/topics/${topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled: !currentStatus })
      })
      
      if (response.ok) {
        fetchTopics()
      }
    } catch (error) {
      console.error('Error updating topic:', error)
    }
  }

  const convertGoogleDriveUrl = (url) => {
    // Convert Google Drive share link to embeddable iframe URL
    // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // To: https://drive.google.com/file/d/FILE_ID/preview
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage DSA topics and videos</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            {showAddForm ? 'Cancel' : '+ Add Topic'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Topic</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Array, Queue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Mode Video (Google Drive Link)
                </label>
                <input
                  type="url"
                  value={formData.storyVideoUrl}
                  onChange={(e) => setFormData({ ...formData, storyVideoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://drive.google.com/file/d/..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Concept Mode Video (Google Drive Link)
                </label>
                <input
                  type="url"
                  value={formData.conceptVideoUrl}
                  onChange={(e) => setFormData({ ...formData, conceptVideoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://drive.google.com/file/d/..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Add Topic
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading topics...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Story Video
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concept Video
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topics.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No topics yet. Add your first topic above.
                    </td>
                  </tr>
                ) : (
                  topics.map((topic) => (
                    <tr key={topic.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{topic.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={topic.storyVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          View Link
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={topic.conceptVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          View Link
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            topic.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {topic.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleToggleEnabled(topic.id, topic.enabled)}
                          className={`${
                            topic.enabled
                              ? 'text-red-600 hover:text-red-900'
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {topic.enabled ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

