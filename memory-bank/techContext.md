# Tech Context

This document describes the technologies used, development setup, technical constraints, and dependencies.

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Vite
- ESLint
- PostCSS

## Development Setup
- The project can be run with `npm run dev`.

## Technical Constraints
- None known.

## Dependencies
- The project depends on the following packages:
  - react
  - react-dom
  - @types/react
  - @types/react-dom
  - vite
  - tailwindcss
  - postcss
  - autoprefixer
  - eslint
  - @supabase/supabase-js

## Supabase Configuration
- Supabase URL: https://iimidfnxdbqvslfsfndu.supabase.co
- Supabase API key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbWlkZm54ZGJxdnNsZnNmbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjUwMzIsImV4cCI6MjA1Njk0MTAzMn0.5b7U4mrmMpQ-TzLIbD5G50ptkZ_E5sm5_uZdNlcJlcJz5Q

## Data Structures
- `Priority`: A type that can be `'low'`, `'medium'`, or `'high'`.
- `Task`: An interface that defines the structure of a task object. It has the following properties:
  - `id`: A string that uniquely identifies the task.
  - `title`: A string that represents the title of the task.
  - `description`: An optional string that represents the description of the task.
  - `completed`: A boolean that indicates whether the task is completed.
  - `priority`: A `Priority` type that represents the priority of the task.
  - `dueDate`: An optional `Date` object that represents the due date of the task.
  - `createdAt`: A `Date` object that represents the date when the task was created.
- `Filter`: A type that can be `'all'`, `'active'`, or `'completed'`.
- `SortBy`: A type that can be `'priority'`, `'dueDate'`, or `'createdAt'`.
