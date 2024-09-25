export type Status = 'pending' | 'in_progress' | 'completed' | 'deleted';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  created_at: Date;
};
