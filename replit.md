# replit.md

## Overview

This is a full-stack web application built with Express.js and React, featuring a modern web development agency landing page called "header.studio". The application includes a contact form system with database integration and a comprehensive UI component library.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Styling**: CSS-in-JS with Tailwind utility classes
- **Build Tool**: Vite for fast development and optimized builds
- **Animation**: Framer Motion for smooth animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (via Neon Database serverless)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **API Architecture**: RESTful API endpoints under `/api` prefix
- **Development**: Hot reloading with Vite middleware integration

## Key Components

### Frontend Components
- **Landing Page Sections**: Hero, Services, Portfolio, About, Testimonials, Pricing, Contact, Footer
- **UI Components**: Comprehensive shadcn/ui component library including forms, buttons, cards, dialogs, and more
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Components
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Contact Form API**: Handles form submissions with validation
- **Database Schema**: Users and contact submissions tables with proper relationships
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form data is validated using Zod schema
   - API request sent to `/api/contact` endpoint
   - Backend validates data and stores in database
   - Success/error response sent back to frontend
   - Toast notification shown to user

2. **Contact Data Retrieval**:
   - Admin can access `/api/contact` GET endpoint
   - Returns all contact submissions from database
   - Data formatted and returned as JSON

## External Dependencies

### Frontend Dependencies
- **UI Library**: @radix-ui components for accessible UI primitives
- **Form Management**: @hookform/resolvers for form validation
- **HTTP Client**: Native fetch API with TanStack Query wrapper
- **Animations**: Framer Motion for smooth transitions
- **Date Handling**: date-fns for date formatting
- **Styling**: Tailwind CSS with class-variance-authority for component variants

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-zod for schema validation
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type validation
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized production bundle to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `drizzle-kit push`

### Environment Configuration
- **Development**: Uses NODE_ENV=development with hot reloading
- **Production**: Uses NODE_ENV=production with optimized builds
- **Database**: Requires DATABASE_URL environment variable

### Deployment Steps
1. Run `npm run build` to create production builds
2. Ensure DATABASE_URL is configured
3. Run database migrations with `npm run db:push`
4. Start production server with `npm start`

## Changelog

Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Removed mobile app development services and updated project count to 20+ projects
- July 08, 2025. Replaced portfolio section with "Our Capabilities" and "How We Work" sections due to lack of portfolio projects

## User Preferences

Preferred communication style: Simple, everyday language.
Technical preferences: 
- Remove mobile app development services as company doesn't offer this service
- Remove specific platform references (Shopify & WooCommerce) - prefer generic descriptions of custom solutions