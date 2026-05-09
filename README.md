# Brilliant Pro — Frontend

A React + Vite learning platform frontend inspired by Brilliant.org. Built with React 19, React Router 7, and custom CSS variables for full light/dark theme support.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| React Router | 7 | Client-side routing |
| Lucide React | 0.562 | Icons |
| React Confetti | 6.4 | Lesson completion celebration |

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── assets/
│   │   ├── hero-illustration.svg
│   │   └── styles/
│   │       └── global.css
│   │
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Footer.jsx / Footer.css
│   │   ├── XPBar.jsx / XPBar.css
│   │   ├── CourseCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ProblemCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── home/
│   │       ├── ProgressStats.jsx
│   │       ├── LearningPaths.jsx
│   │       └── ContinueLearningCard.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx      ← login, signup, logout + JWT storage
│   │   ├── XPContext.jsx        ← total XP, level, xpToNextLevel
│   │   ├── StreakContext.jsx     ← currentStreak, longestStreak, markActivity()
│   │   ├── ProgressContext.jsx  ← completedLessons, getCourseProgress()
│   │   └── ThemeContext.jsx     ← light / dark toggle
│   │
│   ├── data/
│   │   ├── courses.js           ← course + unit + lesson definitions
│   │   ├── lessons.js
│   │   └── questions.js         ← question bank keyed by lessonId
│   │
│   ├── layout/
│   │   └── Layout.jsx           ← Navbar + <Outlet /> + Footer
│   │
│   ├── pages/
│   │   ├── Home.jsx / home.css
│   │   ├── Login.jsx / auth.css
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx / dashboard.css
│   │   ├── Courses.jsx / courses.css
│   │   ├── Course.jsx / courseMap.css
│   │   ├── LessonPage.jsx / lesson.css
│   │   ├── LessonPlay.jsx
│   │   ├── Lessons.jsx
│   │   ├── Pricing.jsx / Pricing.css
│   │   ├── ForTeams.jsx / ForTeams.css
│   │   ├── About.jsx / About.css
│   │   ├── Blog.jsx / Blog.css
│   │   ├── Careers.jsx / Careers.css
│   │   └── Legal.jsx / Legal.css
│   │
│   ├── services/
│   │   └── api.js               ← JWT-aware fetch wrapper for backend calls
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── App.jsx                  ← All routes defined here
│   ├── main.jsx                 ← Root render + all providers
│   └── index.css                ← CSS variables, resets, global tokens
│
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Other Scripts

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # ESLint check
```

---

## Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/pricing` | Pricing | No |
| `/for-teams` | For Teams | No |
| `/about` | About | No |
| `/blog` | Blog | No |
| `/careers` | Careers | No |
| `/privacy` | Legal | No |
| `/terms` | Legal | No |
| `/dashboard` | Dashboard | ✅ Yes |
| `/courses` | Course list | ✅ Yes |
| `/courses/:courseId` | Course map | ✅ Yes |
| `/lesson/:courseId/:lessonId` | Lesson + quiz | ✅ Yes |

Protected routes are wrapped in `<ProtectedRoute>` — unauthenticated users are redirected to `/login`.

---

## State Management

All global state lives in React Context. No Redux or Zustand needed.

### AuthContext
Handles login, signup, logout. Stores JWT in `localStorage` and verifies it against the backend on mount.

```jsx
const { user, login, signup, logout, loading } = useAuth();
```

### XPContext
Fetches XP from the API on login, exposes `addXp()` which does an optimistic update and syncs to the server.

```jsx
const { xp, level, xpToNextLevel, addXp } = useXP();
```

### StreakContext
Fetches streak from the API on login. `markActivity()` is called after each completed lesson.

```jsx
const { streak, longestStreak, activeDates, markActivity } = useStreak();
```

### ProgressContext
Fetches completed lessons on login. `completeLesson(lessonId)` uses `$addToSet` semantics — idempotent.

```jsx
const { completedLessons, completeLesson, getCourseProgress } = useProgress();
```

### ThemeContext
Toggles `html.dark` class. Persisted to `localStorage`.

```jsx
const { theme, toggleTheme } = useTheme();
```

---

## Connecting to the Backend

The app is designed to talk to a MERN backend. In development, Vite proxies all `/api` requests to `http://localhost:5000`:

```js
// vite.config.js
server: {
  proxy: {
    "/api": { target: "http://localhost:5000", changeOrigin: true }
  }
}
```

For production, set the environment variable:

```env
# client/.env
VITE_API_URL=https://your-api-server.com/api
```

The `src/services/api.js` utility reads `VITE_API_URL` and automatically attaches the JWT `Authorization` header to every request.

---

## Theming

All colors, spacing, and typography are defined as CSS variables in `src/index.css`. Switching themes is a single class toggle on `<html>`:

```css
/* Light (default) */
:root {
  --surface: #ffffff;
  --text: #0f172a;
  --accent: #4f46e5;
  …
}

/* Dark */
html.dark {
  --surface: #0f172a;
  --text: #f1f5f9;
  …
}
```

---

## Demo Credentials

If running without the backend (localStorage-only mode is not included in v6+), you need the backend running. With the backend:

Register any account on `/signup`, or use seeded data if you added it to the server.

---

## Dependencies

```json
"dependencies": {
  "lucide-react": "^0.562.0",
  "react": "^19.2.0",
  "react-confetti": "^6.4.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.12.0"
}
```