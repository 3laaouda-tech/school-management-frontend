# Bright Horizon School — Frontend

A school website and management portal built with React. It has two
halves: a public marketing site (Home / About / Contact) and a private
dashboard for admins, teachers, and students, all sharing one design
identity.

**Live site**: https://school-management-frontend-nu-woad.vercel.app

**Backend repo**: https://github.com/3laaouda-tech/school-management-backend

---

## Try it

The live site runs against a real deployed backend + database.

| Role    | Email                    | Password      |
|---------|---------------------------|---------------|
| Admin   | `admin@school.com`         | `admin123`    |
| Teacher | any `@demo.brighthorizon.edu.jo` teacher | `password123` |
| Student | any `@demo.brighthorizon.edu.jo` student | `password123` |

(Teacher/student demo accounts are listed in the admin dashboard's
Users tab after logging in as admin.)

> The backend is hosted on Render's free tier, so the very first
> request after a period of inactivity can take 30–50 seconds while
> it wakes up.

## Tech stack

| Layer        | Technology                  |
|---------------|------------------------------|
| Framework     | React 18 + Vite               |
| Routing       | React Router                  |
| Styling       | Tailwind CSS                  |
| Auth state    | React Context (`AuthContext`) |
| Hosting       | Vercel                        |

## Design

The site uses a school-themed visual identity built around report
cards and school folders rather than a generic template look:

- **Colors**: deep ink navy for text, a "manila folder" warm
  off-white for backgrounds, gold and brick-red as accents.
- **Type**: [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (serif) for headings, IBM Plex Sans for body text, IBM Plex Mono
  for schedules, labels, and tabular data.
- **Signature element**: a "Today's Schedule" ledger on the homepage,
  styled like a school bell schedule.

## Pages

**Public** (no login required):
- `/` — Home
- `/about` — About / school history
- `/contact` — Contact form
- `/how-it-works` — How the project itself is built (for evaluators)
- `/login` — Student & staff login

**Private** (requires login, redirects to `/login` otherwise):
- `/dashboard` — shows a different panel depending on role:
  - **Admin**: manage users and classes (search, filter by role/class,
    pagination, add/edit/delete)
  - **Teacher**: pick a class, add/edit grades and attendance
  - **Student**: read-only view of own grades and attendance
- `/profile` — view account info, change password

## Project structure

```
src/
├── api.js                      → fetch wrapper (base URL + auth token)
├── context/AuthContext.jsx     → stores logged-in user + token
├── components/
│   ├── PrivateRoute.jsx        → redirects to /login if not authenticated
│   ├── DashboardHeader.jsx     → shared header for Dashboard + Profile
│   ├── PublicNavbar.jsx        → shared nav for public pages
│   ├── PublicFooter.jsx        → shared footer for public pages
│   └── PublicLayout.jsx        → wraps a public page with nav + footer
├── pages/
│   ├── public/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── HowItWorks.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx           → picks AdminPanel/TeacherPanel/StudentPanel by role
│   ├── AdminPanel.jsx
│   ├── TeacherPanel.jsx
│   ├── StudentPanel.jsx
│   └── Profile.jsx
└── App.jsx                     → routes
```

## Local setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the backend is running (see the backend repo's README),
   or point at the live one — see **Environment variables** below.

3. Run the dev server:
   ```
   npm run dev
   ```
   Open the URL Vite prints (usually `http://localhost:5173`).

## Environment variables

The API base URL is configurable via a Vite env variable, so the same
code works locally and in production without edits:

```js
// src/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

- **Local development**: no `.env` needed — it falls back to
  `http://localhost:5000/api`.
- **Production build**: set in `.env.production` (committed) and also
  in Vercel's Environment Variables:
  ```
  VITE_API_URL=https://school-management-backend-f88r.onrender.com/api
  ```

## Deployment (Vercel)

Deployed on [Vercel](https://vercel.com), which auto-detects the Vite
setup:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variable**: `VITE_API_URL` (see above)

Pushing to the `main` branch on GitHub triggers an automatic redeploy.
