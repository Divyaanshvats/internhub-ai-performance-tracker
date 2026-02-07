
export interface Intern {
  id: string;
  name: string;
  duration: string;
  comment: string;
  department: string;
  reportingManager: string;
  projectsCompleted: number;
  rating: number;
  aiSummary?: string;
  createdAt: number;
}

export type ViewType = 'dashboard' | 'directory' | 'add';
