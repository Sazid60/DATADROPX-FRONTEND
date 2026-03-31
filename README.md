# DataDropX Frontend - Mini Employee Directory UI

This project is a clean Next.js + TypeScript frontend for managing employees.
It is designed to work with the DataDropX Backend API and provides a responsive UI for listing, searching, creating, updating, and deleting employees.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Sonner (toast notifications)
- Zod

## Project Features

- Employee table view with clean UI
- Debounced employee search
- Pagination support
- Add employee modal form
- Update employee modal form
- Delete confirmation dialog
- Client-side form validation and friendly error display
- Loading skeletons and request error states

## Backend Dependency

This frontend depends on the DataDropX Backend API.

Make sure backend is running first:

- Backend URL: http://localhost:5000
- API prefix: /api

Frontend uses this environment variable to connect:

- NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api

## Environment Variables

Create a `.env` file in the project root with:

- NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api

## Installation Steps

1. Clone the repository

- git clone <your-repository-url>

2. Go to the project folder

- cd DATADROPX-FRONTEND/datadropx-frontend

3. Check Node.js version (recommended Node 18+)

- node -v

4. Install dependencies

- npm install

5. Create `.env` file in the root directory

- Add NEXT_PUBLIC_BASE_API_URL value

6. Start the development server

- npm run dev

7. Build and run production mode (optional)

- npm run build
- npm start

## Run Locally

1. Install dependencies

- npm install

2. Make sure backend server is running on port 5000

- Backend env should include PORT=5000

3. Set frontend environment variable

- NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api

4. Run development server

- npm run dev

5. Open in browser

- http://localhost:3000

## Available Scripts

- npm run dev: Starts Next.js in development mode
- npm run build: Builds production bundle
- npm run start: Runs production server
- npm run lint: Runs ESLint checks

## API Integration Overview

Frontend consumes these backend endpoints:

- GET /api/employees
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id

Supported list query params used by frontend:

- searchTerm
- page
- limit

## Folder Structure (High Level)

- src/app: App Router pages and global layout
- src/components/forms: Employee add/update forms
- src/components/modules: Table, dialogs, filters, pagination
- src/hooks: Custom hooks (including debounce)
- src/services: API service layer
- src/lib: Fetch wrapper and utility helpers
- src/types: Shared TypeScript interfaces
- src/zod: Validation schemas

## Notes

- Start backend before frontend to avoid API connection errors.
- If you change backend host/port, update `NEXT_PUBLIC_BASE_API_URL` accordingly.
