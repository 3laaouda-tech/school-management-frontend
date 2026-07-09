# School Management Frontend

React + Vite + Tailwind CSS + DaisyUI. Talks to the backend API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the backend is running at `http://localhost:5000`
   (the API base URL is set in `src/api.js` — change it there if your
   backend runs somewhere else).

3. Run the dev server:
   ```
   npm run dev
   ```
   Open the URL Vite prints (usually `http://localhost:5173`).

4. Log in with the admin account created by the backend's `seed.js`:
   - Email: `admin@school.com`
   - Password: `admin123`

## What each role sees

- **Admin**: add/remove teachers and students, create classes.
- **Teacher**: pick one of their classes, add grades and attendance for
  the students in it.
- **Student**: read-only view of their own grades and attendance.

## Structure

```
src/
├── api.js                  → fetch wrapper (base URL + auth token)
├── context/AuthContext.jsx → stores logged-in user + token
├── components/PrivateRoute.jsx → redirects to /login if not authenticated
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx       → picks which panel to show based on role
│   ├── AdminPanel.jsx
│   ├── TeacherPanel.jsx
│   └── StudentPanel.jsx
└── App.jsx                 → routes
```
