import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React and build your first interactive components.',
      duration: '2h 30m',
      level: 'Beginner',
      progress: 0
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts including closures, promises, and async/await.',
      duration: '4h 15m',
      level: 'Intermediate',
      progress: 0
    },
    {
      id: 3,
      title: 'Full Stack Development',
      description: 'Build complete web applications with React, Node.js, and databases.',
      duration: '8h 45m',
      level: 'Advanced',
      progress: 0
    }
  ]

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">
          Transform Video Learning into an
          <span className="gradient-text"> Interactive Loop</span>
        </h1>
        <p className="hero-description">
          Watch → Understand → Verify → Level Up
        </p>
        <p className="hero-subtitle">
          LearnLoop is a focused, validation-first learning platform that ensures
          you truly understand before moving forward.
        </p>
      </div>

      <div className="courses-section">
        <h2 className="section-title">Featured Courses</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="course-card"
            >
              <div className="course-header">
                <div className="course-icon">📚</div>
                <div className="course-badge">{course.level}</div>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-footer">
                <span className="course-duration">⏱️ {course.duration}</span>
                {course.progress > 0 ? (
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                ) : (
                  <span className="course-start">Start Learning →</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

