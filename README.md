# Workout Tracker

## Project Overview

Workout Tracker is a modern, responsive web application designed to help users organize and track their fitness journey efficiently. Built with performance and user experience in mind, it offers a clean interface for logging workouts, viewing progress on a calendar, and managing fitness data.

Key features include:

- **Workout Logging**: Create, read, update, and delete (CRUD) workout entries.
- **Calendar View**: Visualize workouts across a monthly/weekly/daily calendar interface.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Authentication**: Secure login and registration functionality.

## Technology Stack Used

This project leverages a robust modern stack to ensure scalability and maintainability:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Calendar Component**: [React Big Calendar](https://github.com/jquense/react-big-calendar)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Setup and Installation Instructions

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd workout-tracker
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Configuration:**
    Create a `.env.local` file in the root directory and add your backend URL:

    ```env
    NEXT_PUBLIC_PROD_BACKEND_URL=your_backend_api_url_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints Documentation

The application communicates with a RESTful API. Key endpoints used include:

### Authentication

- `POST /auth/register/` - Register a new user
- `POST /auth/login/` - Authenticate an existing user

### Workouts

- `GET /workouts` - Retrieve a list of workouts (Supports pagination and filtering)
  - Query Params: `page`, `limit`
- `POST /workouts` - Log a new workout
- `PUT /workouts/:id` - Update an existing workout (type, duration, date, notes)
- `DELETE /workouts/:id` - Delete a workout

## Future Improvements

Here are some planned features and improvements for future iterations:

- **Analytics Dashboard**: Visualize progress with charts and graphs.
- **Exercise Library**: Pre-filled list of exercises to choose from.
- **Social Features**: Share workouts and compete with friends.
- **Dark Mode**: Add a system-wide dark/light mode toggle.
- **User Profile**: specific page for user to manage their profile and settings.
