import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getCurrentUser } from './utils/auth'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Topic from './pages/Topic'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute requiredRole="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topic/:id"
          element={
            <ProtectedRoute requiredRole="Student">
              <Topic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <Navigate
              to={
                getCurrentUser()
                  ? getCurrentUser().role === 'Student'
                    ? '/student'
                    : '/admin'
                  : '/login'
              }
              replace
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
