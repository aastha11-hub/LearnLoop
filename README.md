# LearnLoop

LearnLoop is a focused, validation-first learning platform that transforms video-based education into an interactive loop: watch → understand → verify → level up.

## Tech Stack

- **Frontend**: React + Vite (JavaScript)
- **Styling**: Tailwind CSS
- **Routing**: react-router-dom
- **Backend**: Node.js + Express
- **Database**: In-memory data (no real DB for MVP)
- **Auth**: Mock authentication using localStorage
- **Video hosting**: Google Drive embedded links

## Features

### Authentication
- Login page with Email, Password, and Role selector (Student/Admin)
- Mock authentication using localStorage
- Role-based routing and access control

### Student Dashboard
- View available DSA topics
- Watch Story Mode and Concept Mode videos (embedded from Google Drive)
- Take MCQ quizzes to verify understanding

### Admin Dashboard
- Add new topics with Google Drive video links
- Enable/disable topics
- Manage all course content

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server (runs both frontend and backend):
```bash
npm start
```

Or run them separately:

```bash
# Terminal 1 - Frontend (Vite)
npm run dev

# Terminal 2 - Backend (Express)
npm run server
```

3. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Usage

### Login
- Use any email and password (MVP demo mode)
- Select your role: Student or Admin
- You'll be redirected to the appropriate dashboard

### As a Student
1. View available topics on the dashboard
2. Click on a topic to start learning
3. Watch Story Mode and Concept Mode videos
4. Take the quiz to verify your understanding

### As an Admin
1. Click "+ Add Topic" to create a new topic
2. Enter topic name and Google Drive links for both videos
3. Enable/disable topics as needed
4. All changes are saved in backend memory

## API Endpoints

- `GET /api/topics` - Fetch all topics
- `POST /api/topics` - Add new topic
- `PUT /api/topics/:id` - Enable/disable topic

## Project Structure

```
learnloop/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Topic.jsx
│   ├── utils/
│   │   └── auth.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   └── index.js
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Notes

- This is an MVP demo version
- No real database - all data is stored in memory
- No real authentication - any credentials work
- Google Drive links should be in the format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- The app automatically converts Google Drive links to embeddable format

## License

MIT License - Copyright (c) 2026 ZEEL
