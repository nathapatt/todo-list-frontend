# TodoList Application

A modern todolist application built with React, TypeScript, Vite, and Ant Design. Features user authentication, todo management, and a clean, responsive interface.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Date Handling**: Day.js

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todolist-antd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   - `VITE_API_BASE_URL`: Your backend API URL (default: http://localhost:3000)
   - `VITE_API_PROXY_PATH`: Proxy path for API calls (default: /api)

4. **Set up the backend API**
   - The application expects a backend API running on the URL specified in `.env`
   - API proxy is configured in `vite.config.ts`

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── api/           # API service functions
├── assets/        # Static assets
├── components/    # Reusable components
│   └── Auth/      # Authentication components
├── pages/         # Page components
├── utils/         # Utility functions
└── main.tsx       # Application entry point
```

## Features

- User authentication (login/register)
- Todo management (create, read, update, delete)
- Responsive design with Ant Design
- Type-safe development with TypeScript
- Modern build tooling with Vite
