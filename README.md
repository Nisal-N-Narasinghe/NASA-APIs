# NASA APIs

NASA APIs is a full-stack web application that combines multiple NASA data sources with an animated React UI and a Node.js backend.

The frontend displays:

- EPIC Earth imagery and an embedded NASA-themed YouTube video.
- Astronomy Picture of the Day (APOD) content.
- A custom APOD image slider.
- Mars Rover image search by rover, camera, and Earth date.

The backend provides:

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
- Side navigation with smooth scrolling to sections.
- Toast notifications for API actions.

### Backend

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
- bcryptjs
- Nodemailer
- Security middlewares: helmet, express-rate-limit, express-mongo-sanitize, xss-clean, hpp

## API Endpoints

Base path: `/api/v1`

### User Routes

- `GET /user/getAllUsers`
- `GET /user/getme`
- `PATCH /user/updatepassword`
- `PATCH /user/updateprofile`
- `DELETE /user/deleteprofile`

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
NODE_ENV=development
PORT=5000
DB_CONNECTION=your_mongodb_connection_string
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
