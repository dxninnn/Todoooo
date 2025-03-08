# System Patterns

This document describes the system architecture, key technical decisions, design patterns in use, and component relationships.

## System Architecture
- The project is a web application built with React, TypeScript, Tailwind CSS, and Vite.

## Key Technical Decisions
- Using React for the UI.
- Using TypeScript for type safety.
- Using Tailwind CSS for styling.
- Using Vite for fast development builds.

## Design Patterns in Use
- Component-based architecture.

## Component Relationships
- The `App` component is the root component of the application. It manages the state of the tasks, the filter, the sort order, the theme, and the modal. It renders the `TaskList` component and the `AddTaskModal` component. It also includes buttons for toggling the theme, adding a new task, and filtering the tasks. The `App` component uses the `useState` hook to manage the state of the tasks, the filter, the sort order, the theme, and the modal. It also defines the `handleAddTask` function, which adds a new task to the tasks array.
- The `TaskList` component displays a list of tasks and allows the user to reorder them using drag and drop. It uses the `@dnd-kit/core` and `@dnd-kit/sortable` libraries to implement the drag and drop functionality. It receives `tasks`, `onTaskComplete`, `onTaskDelete`, `onTaskEdit`, and `onTaskReorder` props. It maps over the `tasks` array and renders a `SortableTaskCard` component for each task.
- The `SortableTaskCard` component is a card that displays a single task and allows the user to mark it as complete, edit it, or delete it. It uses the `@dnd-kit/sortable` library to make the card sortable. It receives `task`, `onComplete`, `onDelete`, and `onEdit` props. It also uses the `cn` function from `src/utils/cn.ts` to conditionally apply CSS classes. The component displays the task title, description, priority, and due date (if available). It also includes buttons for marking the task as complete, editing the task, and deleting the task.
- The `AddTaskModal` component is a modal that allows the user to add a new task. It contains input fields for the task title, description, priority, and due date. It uses the `useState` hook to manage the state of these input fields. It also uses the `Button` component from the `src/components/ui` directory. The component receives `isOpen`, `onClose`, and `onAdd` props.
- The `TaskCard` component is a card that displays a single task and allows the user to mark it as complete, edit it, or delete it. It receives `task`, `onComplete`, `onDelete`, and `onEdit` props. It also uses the `cn` function from `src/utils/cn.ts` to conditionally apply CSS classes. The component displays the task title, description, priority, and due date (if available). It also includes buttons for marking the task as complete, editing the task, and deleting the task. This component is very similar to `SortableTaskCard`, but it doesn't include the drag and drop functionality.
