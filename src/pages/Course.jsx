import { useParams } from 'react-router-dom'
import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import Quiz from '../components/Quiz'
import './Course.css'

function Course() {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState('watch') // watch, verify, complete
  const [progress, setProgress] = useState(0)

  // Mock course data
  const course = {
    id: parseInt(id),
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React and build your first interactive components.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    quiz: {
      question: 'What is React primarily used for?',
      options: [
        'Building user interfaces',
        'Database management',
        'Server configuration',
        'File system operations'
      ],
      correctAnswer: 0
    }
  }

  const handleQuizComplete = (isCorrect) => {
    if (isCorrect) {
      setProgress(100)
      setCurrentStep('complete')
    }
  }

  const handleNext = () => {
    if (currentStep === 'watch') {
      setCurrentStep('verify')
    }
  }

  return (
    <div className="course-page">
      <div className="course-header">
        <h1 className="course-page-title">{course.title}</h1>
        <p className="course-page-description">{course.description}</p>
        {progress > 0 && (
          <div className="course-progress-container">
            <div className="course-progress-bar">
              <div
                className="course-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="course-progress-text">{progress}% Complete</span>
          </div>
        )}
      </div>

      <div className="learning-loop">
        <div className="loop-steps">
          <div className={`loop-step ${currentStep === 'watch' ? 'active' : currentStep === 'verify' || currentStep === 'complete' ? 'completed' : ''}`}>
            <div className="step-icon">👁️</div>
            <div className="step-label">Watch</div>
          </div>
          <div className={`loop-step ${currentStep === 'verify' ? 'active' : currentStep === 'complete' ? 'completed' : ''}`}>
            <div className="step-icon">✓</div>
            <div className="step-label">Verify</div>
          </div>
          <div className={`loop-step ${currentStep === 'complete' ? 'active' : ''}`}>
            <div className="step-icon">⬆️</div>
            <div className="step-label">Level Up</div>
          </div>
        </div>
      </div>

      <div className="course-content">
        {currentStep === 'watch' && (
          <div className="watch-section">
            <VideoPlayer videoUrl={course.videoUrl} />
            <button className="primary-button" onClick={handleNext}>
              I've Watched the Video →
            </button>
          </div>
        )}

        {currentStep === 'verify' && (
          <div className="verify-section">
            <h2 className="section-heading">Verify Your Understanding</h2>
            <p className="section-description">
              Answer this question to verify you understood the content:
            </p>
            <Quiz
              question={course.quiz.question}
              options={course.quiz.options}
              correctAnswer={course.quiz.correctAnswer}
              onComplete={handleQuizComplete}
            />
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="complete-section">
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h2>Congratulations!</h2>
              <p>You've successfully completed this lesson.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setCurrentStep('watch')
                  setProgress(0)
                }}
              >
                Review Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Course

