import { AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../types';
import SortableTaskCard from './SortableTaskCard';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (id: string) => void;
  onTaskDelete: (id: string) => void;
  onTaskEdit: (task: Task) => void;
  onTaskReorder: (tasks: Task[]) => void;
  onEditClick: (task: Task) => void;
}

const TaskList = ({
  tasks,
  onTaskComplete,
  onTaskDelete,
  onTaskEdit,
  onTaskReorder,
  onEditClick,
}: TaskListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      onTaskReorder(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                onComplete={onTaskComplete}
                onDelete={onTaskDelete}
                onEdit={onTaskEdit}
                onEditClick={onEditClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
