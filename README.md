# Campus Dashboard — Major Project

A full-stack placement preparation platform for students.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + DaisyUI + Swiper
- **Backend**: Node.js + Express + MongoDB Atlas

---

## Project Structure

```
campus-dashboard/
├── backend/
│   ├── index.js          ← Express server (all API routes)
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx              ← App entry point
        ├── App.jsx               ← All routes defined here
        ├── index.css             ← Tailwind directives
        ├── api.js                ← Backend base URL (change this for deployment)
        ├── assets/
        │   ├── pic.jpeg
        │   ├── hero.png
        │   └── ResourceList.json
        └── components/
            ├── Navbar.jsx
            ├── Banner.jsx
            ├── Footer.jsx
            ├── Card.jsx
            ├── Resources.jsx
            ├── auth/
            │   ├── Login.jsx
            │   ├── Register.jsx
            │   └── ErrorLogin.jsx
            ├── home/
            │   └── Home.jsx
            ├── study/
            │   └── StudySection.jsx   ← NEW — study material for all topics
            ├── exam/
            │   ├── CourseTemplate.jsx
            │   └── ExamPage.jsx       ← MCQ/MSQ/NAT with timer and scoring
            ├── schedule Exam/
            │   └── ScheduleExam.jsx   ← Create exams (admin)
            └── partcipant/
                └── Participants.jsx   ← Real leaderboard from DB
```

---

## Setup Instructions

### Step 1 — Backend

```bash
cd campus-dashboard/backend
npm install
```

Open `index.js` and update the MongoDB connection string with YOUR Atlas URL:
```js
const MONGO_URL = "your_mongodb_atlas_url_here";
```

Start the server:
```bash
npm start
# Server runs on http://localhost:4000
```

### Step 2 — Frontend

```bash
cd campus-dashboard/frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

> If you change the backend port or deploy the backend, update `src/api.js`:
> ```js
> const API_BASE = "http://localhost:4000"; // change to your deployed URL
> ```

---

## Features

### For Students
- ✅ Register and Login (cookies-based session)
- ✅ Study Section — topic-wise notes for Aptitude, Reasoning, English, Programming, CS, Interview
- ✅ Practice questions with reveal-answer feature
- ✅ Take real exams (MCQ, MSQ, NAT question types)
- ✅ Timer during exam
- ✅ See score after submission
- ✅ Real leaderboard showing all students ranked by points

### For Admin / Teacher
- ✅ Create exams with custom questions (MCQ/MSQ/NAT)
- ✅ Questions saved to MongoDB

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/user` | Register new user |
| POST | `/login` | Login user |
| GET | `/users` | Get all users sorted by points (leaderboard) |
| POST | `/update-points` | Add score to user after exam |
| GET | `/tests` | Get all exam cards (no questions) |
| GET | `/tests/:id` | Get full exam with questions |
| POST | `/questionform` | Create new exam |

---

## Deployment

### Backend — Deploy to Render
1. Push `backend/` folder to GitHub
2. Create new Web Service on render.com
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add environment variable: `MONGO_URL=your_atlas_url`

### Frontend — Deploy to Netlify or Vercel
1. Push `frontend/` folder to GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Update `src/api.js` with your Render backend URL before building

---

## Notes
- MongoDB Atlas is used (cloud database — works from anywhere)
- All user passwords are stored as-is (for production, add bcrypt hashing)
- The `username` is stored in a cookie for session management
