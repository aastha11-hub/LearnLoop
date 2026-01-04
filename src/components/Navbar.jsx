import { Link, useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../utils/auth'

function Navbar() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to={user.role === 'Student' ? '/student' : '/admin'} className="text-2xl font-bold text-indigo-600">
              LearnLoop
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
