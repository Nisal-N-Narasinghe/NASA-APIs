# NASA APIs

NASA APIs is a full-stack web application that combines multiple NASA data sources with an animated React UI and a Node.js authentication backend.

The frontend displays:

- EPIC Earth imagery and an embedded NASA-themed YouTube video.
- Astronomy Picture of the Day (APOD) content.
- A custom APOD image slider.
- Mars Rover image search by rover, camera, and Earth date.

The backend provides:

- User authentication with JWT.
- Protected user profile and account management endpoints.
- Security middleware (rate limit, sanitization, helmet, hpp, xss protection).

## Project Structure

```text
.
├── frontend/   # React + Vite + Tailwind client
├── server/     # Express + MongoDB API
└── package.json # Root script to run both services concurrently
```

## Features

### Frontend

- NASA content sections on a single scrolling landing page.
- Animated star background and spaceship visuals.
- Login and signup pages.
- Side navigation with smooth scrolling to sections.
- Toast notifications for API and auth actions.

### Backend

- Signup, login, logout, forgot password, reset password.
- JWT-based route protection and role-based restriction middleware.
- User profile operations: get me, update profile, update password, soft delete.
- Centralized operational error handling for dev/prod modes.

## Tech Stack

### Client

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify
- Material Tailwind (carousel)
- React YouTube

### Server

- Node.js + Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- Nodemailer
- Security middlewares: helmet, express-rate-limit, express-mongo-sanitize, xss-clean, hpp

## API Endpoints

Base path: `/api/v1`

### Auth Routes

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/logout`
- `POST /auth/forgotpassword`
- `PATCH /auth/resetpassword/:resetPassToken`
- `GET /auth/checkloginstatus` (protected)

### User Routes

- `GET /user/getAllUsers` (admin only)
- `GET /user/getme` (protected)
- `PATCH /user/updatepassword` (protected)
- `PATCH /user/updateprofile` (protected)
- `DELETE /user/deleteprofile` (protected)

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
NODE_ENV=development
PORT=5000
DB_CONNECTION=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USERNAME=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
```

Create a `.env` file inside the `frontend` directory.

```env
VITE_NASA_API_KEY=your_nasa_api_key
```

Get a NASA API key from: https://api.nasa.gov/

## Installation

Install dependencies for root, frontend, and server:

```bash
npm install
cd frontend && npm install
cd ../server && npm install
```

## Running the Project

From the repository root:

```bash
npm run dev
```

This starts:

- Vite frontend dev server.
- Express backend via nodemon.

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:5000`

## Available Scripts

### Root

- `npm run dev` - Run frontend and backend concurrently.

### Frontend (`frontend/package.json`)

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Server (`server/package.json`)

- `npm run dev`
- `npm run start_prod`
- `npm run test`

## Notes and Implementation Details

- Authentication token is stored in cookies on the client (`jwt`).
- Some frontend auth calls target different hosts in code (localhost and deployed backend). For consistent local development, ensure auth requests point to your local backend.
- The backend includes Vercel configuration in `server/vercel.json`.
- Logging middleware writes critical errors to `server/Logs/log.log`.

## Deployment

The backend is configured for Vercel serverless deployment through `server/vercel.json`.

For production readiness, consider:

- Standardizing frontend API base URLs with environment variables.
- Enforcing secure cookies and proper CORS origin restrictions.
- Removing debug console logs.

## License

ISC
