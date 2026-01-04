import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// In-memory data store
let topics = [
  {
    id: 1,
    name: 'Array',
    storyVideoUrl: 'https://drive.google.com/file/d/1jZ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1/view?usp=sharing',
    conceptVideoUrl: 'https://drive.google.com/file/d/1jZ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1/view?usp=sharing',
    enabled: true
  },
  {
    id: 2,
    name: 'Queue',
    storyVideoUrl: 'https://drive.google.com/file/d/2jZ2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2/view?usp=sharing',
    conceptVideoUrl: 'https://drive.google.com/file/d/2jZ2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2/view?usp=sharing',
    enabled: true
  }
]

let nextId = 3

// GET /api/topics - Fetch all topics
app.get('/api/topics', (req, res) => {
  res.json(topics)
})

// POST /api/topics - Add new topic
app.post('/api/topics', (req, res) => {
  const { name, storyVideoUrl, conceptVideoUrl } = req.body

  if (!name || !storyVideoUrl || !conceptVideoUrl) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newTopic = {
    id: nextId++,
    name,
    storyVideoUrl,
    conceptVideoUrl,
    enabled: true
  }

  topics.push(newTopic)
  res.status(201).json(newTopic)
})

// PUT /api/topics/:id - Update topic (enable/disable)
app.put('/api/topics/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { enabled } = req.body

  const topic = topics.find(t => t.id === id)
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' })
  }

  topic.enabled = enabled !== undefined ? enabled : topic.enabled
  res.json(topic)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

