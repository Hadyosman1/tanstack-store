# TanStack Query E-Commerce

A modern e-commerce platform built with Next.js 15 and TanStack Query, featuring a beautiful UI and robust state management.

## Features

- **Modern Stack**: Built with Next.js 15 and React 19
- **Powerful Data Fetching**: Utilizing TanStack Query (React Query) v5 for efficient data management
- **Beautiful UI Components**: 
  - Radix UI primitives for accessible components
  - Tailwind CSS for styling
  - Dark/Light theme support
  - Responsive design
- **Form Handling**: 
  - React Hook Form for form management
  - Zod for schema validation
- **State Management**:
  - Zustand for global state
  - TanStack Query for server state
- **Developer Experience**:
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - TanStack Query DevTools for debugging
  - Turbopack for fast development

## Tech Stack

### Core
- Next.js 15.2
- React 19
- TypeScript
- TanStack Query v5

### UI & Styling
- Tailwind CSS
- Radix UI Components
- Next Themes
- Class Variance Authority
- Lucide React Icons
- Embla Carousel
- Sonner (Toast notifications)

### State Management & Forms
- Zustand
- React Hook Form
- Zod

### Development Tools
- ESLint
- Prettier
- TypeScript
- TanStack Query DevTools

## Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Run the development server**
```bash
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/          # Utility functions and configurations
├── providers/    # React context providers
├── services/     # API and external service integrations
├── store/        # Zustand store configurations
└── types/        # TypeScript type definitions
```
