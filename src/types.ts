export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
}

export type Filter = 'all' | 'active' | 'completed';
export type SortBy = 'priority' | 'dueDate' | 'createdAt';
