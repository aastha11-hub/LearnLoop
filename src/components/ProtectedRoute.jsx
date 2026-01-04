import { Navigate } from 'react-router-dom'
import { isAuthenticated, hasRole } from '../utils/auth'

function ProtectedRoute({ children, requiredRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to appropriate dashboard based on user's role
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role === 'Student') {
      return <Navigate to="/student" replace />
    } else if (user.role === 'Admin') {
      return <Navigate to="/admin" replace />
    }
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

