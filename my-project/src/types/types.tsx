// src/types.ts

export interface Task {
  _id: string;
  title: string;
  status: string;
  projectId?: string;
}

export interface Project {
  _id: string;
  title: string;
  tasks?: Task[];
}

export interface ProjectListProps {
  projects: Project[];
  onAddProject: (projectName: string) => void;
  onSelect: (projectId: string) => void;
  deleteProject: (projectId: string) => Promise<string | null>;
}

export interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  fetchProjects: () => Promise<void>;
  fetchTasksForProject: (projectId: string) => Promise<void>;
  addProject: (title: string) => Promise<void>;
  addTask: (projectId: string, title: string) => Promise<void>;
  updateTaskStatus: (
    projectId: string,
    taskId: string,
    status: string
  ) => Promise<void>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  deleteTask: (taskId: string) => Promise<void>;

  loading: boolean;
}
