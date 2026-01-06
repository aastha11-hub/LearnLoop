// Mock authentication utilities
export const login = (email, password, role) => {
  // Mock login - in real app, this would call an API
  const user = {
    email,
    role,
    isAuthenticated: true
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const isAuthenticated = () => {
  const user = getCurrentUser()
  return user && user.isAuthenticated
}

export const hasRole = (role) => {
  const user = getCurrentUser()
  return user && user.role === role
}

// Google login helper - stores user and assigns role based on email
export const loginWithGoogle = (email) => {
  // Assign role: admin if email contains "admin", student otherwise
  const role = email.toLowerCase().includes('admin') ? 'Admin' : 'Student'
  
  const user = {
    email,
    role,
    isAuthenticated: true
  }
  
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

