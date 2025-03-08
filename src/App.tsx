import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Filter, Priority, SortBy, Task } from './types';
import TaskList from './components/TaskList';
import Button from './components/ui/Button';
import { Plus, Moon, Sun, ListTodo } from 'lucide-react';
import { AddTaskModal } from './components/AddTaskModal';

const supabaseUrl = 'https://iimidfnxdbqvslfsfndu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbWlkZm54ZGJxdnNsZnNmbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjUwMzIsImV4cCI6MjA1Njk0MTAzMn0.5b7U4mrmMpQ-TzLIbD5G50ptkZ_E5sm5_uZdNlcJz5Q';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priority: { [key in Priority]: number } = {
          low: 0,
          medium: 1,
          high: 2,
        };
        return priority[b.priority] - priority[a.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const handleAddTask = async (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: task.dueDate,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    const newTask = data[0];
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 transition-colors dark:from-gray-900 dark:to-gray-800`}>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Tasks
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full p-2"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-5 w-5" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as Filter[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="createdAt">Sort by Date Created</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
          </select>
        </div>

        <div className="rounded-xl bg-white/50 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/50">
          <TaskList
            tasks={filteredTasks}
            onTaskComplete={(id) =>
              setTasks(
                tasks.map((t) =>
                  t.id === id ? { ...t, completed: !t.completed } : t
                )
              )
            }
            onTaskDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
            onTaskEdit={(task) =>
              setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
            }
            onTaskReorder={setTasks}
            onEditClick={(task) => {
              setTaskToEdit(task);
              setIsModalOpen(true);
            }}
          />
          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <ListTodo className="mb-4 h-12 w-12" />
              <p className="text-lg font-medium">No tasks yet</p>
              <p className="text-sm">Add a new task to get started</p>
            </div>
          )}
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
        taskToEdit={taskToEdit}
        onEdit={(updatedTask: Task) => {
          setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
      />
    </div>
  );
}

export default App;
