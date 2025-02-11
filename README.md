# Financial Card Component Project

## Project Overview

This project implements a financial card component as part of a Front-End Developer Assignment. The application demonstrates proficiency in modern web development technologies, focusing on creating a performant, user-friendly, and maintainable financial data visualization component.

## Project Objectives

The primary goals of this project were to:
- Create a responsive financial card component
- Handle data fetching from a mock API
- Implement premium user access controls
- Ensure a smooth user experience
- Demonstrate code quality and testing practices

## Technology Stack

  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Query
  - Vitest
  - React Testing Library

## Prerequisites

- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shcherbyakdev/sa-assesment.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```
API_BASE_URL=https://seekingalpha.free.beeceptor.com
```

### 4. Launch Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run lint` | Run code linter |
| `npm run test` | Execute test suite |
| `npm run preview` | Preview production build |

## Mock API Endpoints

The project uses the following mock API endpoints:

| Endpoint | Description |
|----------|-------------|
| `/user` | User information |
| `/ratings-summary` | Ratings summary |
| `/factor-grades/now` | Current factor grades |
| `/factor-grades/3m` | 3-month factor grades |
| `/factor-grades/6m` | 6-month factor grades |
| `/quant-ranking` | Quant ranking information |

