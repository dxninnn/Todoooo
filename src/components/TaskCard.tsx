import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Grip } from 'lucide-react';
import { Task } from '../types';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const TaskCard = ({ task, onComplete, onDelete, onEdit }: TaskCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
    >
      <button
        onClick={() => onComplete(task.id)}
        className="flex-shrink-0 text-gray-400 transition-colors hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400"
      >
        {task.completed ? (
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        ) : (
          <Circle className="h-6 w-6" />
        )}
      </button>

      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h3
            className={cn('font-medium', {
              'text-gray-500 line-through': task.completed,
            })}
          >
            {task.title}
          </h3>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              priorityColors[task.priority]
            )}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{format(task.dueDate, 'PPP')}</span>
          </div>
        )}
      </div>

      <Grip className="h-5 w-5 cursor-grab text-gray-400" />

      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;