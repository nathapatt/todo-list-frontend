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

### Local Development
- Node.js (version 18 or higher)
- npm or yarn

### Docker Setup
- Docker
- Docker Compose

## Installation

### Option 1: Local Development

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

### Option 2: Docker Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todolist-antd
   ```

2. **Set up environment variables**
   Create a `.env` file with the following variables:
   ```bash
   NGINX_PORT=80
   NGINX_PROXY=http://your-backend-api-url
   ```

3. **Create Docker network**
   ```bash
   docker network create todolist-project_todo-network
   ```

4. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

The application will be available at the port specified in your `NGINX_PORT` environment variable.

## Development

### Local Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Docker Development
For development with Docker:
```bash
docker-compose up --build
```

## Build for Production

### Local Build
Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Docker Production Build
The Docker setup automatically builds the application for production using a multi-stage build process:
1. Uses Node.js to build the React application
2. Serves the built files using Nginx with custom configuration

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

## Docker Configuration

The project includes the following Docker configuration files:

- **Dockerfile**: Multi-stage build configuration
  - Stage 1: Builds the React application using Node.js 22 Alpine
  - Stage 2: Serves the built application using Nginx 1.28.0 Alpine
  
- **docker-compose.yml**: Orchestrates the frontend container
  - Configurable port mapping via `NGINX_PORT` environment variable
  - API proxy configuration via `NGINX_PROXY` environment variable
  - Uses external network `todolist-project_todo-network`
  
- **nginx.conf.template**: Nginx configuration template
  - Serves static React build files
  - Proxies `/api` requests to backend service
  - Supports environment variable substitution

## Features

- User authentication (login/register)
- Todo management (create, read, update, delete)
- Responsive design with Ant Design
- Type-safe development with TypeScript
- Modern build tooling with Vite
- Docker containerization with Nginx
- API proxy configuration
