export interface Task {
  _id: string;
  title: string;
  status: string;
  projectId?: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  tasks?: Task[];
}

export interface AddTaskResponse {
  success: boolean;
  data: Task;
}

export interface TaskResponse {
  success: boolean;
  data: Task[];
}

export interface ProjectListProps {
  projects: Project[];
  onAddProject: (projectName: string, description: string) => void;
  onSelect: (projectId: string) => void;
  deleteProject: (projectId: string) => Promise<string | null>;
}

export interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  fetchProjects: () => Promise<void>;
  fetchTasksForProject: (projectId: string) => Promise<void>;
  addProject: (title: string, description: string) => Promise<void>;
  addTask: (projectId: string, title: string) => Promise<void>;
  updateTaskStatus: (
    projectId: string,
    taskId: string,
    status: string
  ) => Promise<void>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  loading: boolean;
  deleteTask: (taskId: string) => Promise<string | null>;
  deleteProjectById: (projectId: string) => Promise<string | null>;
  updateProject: (
    projectId: string,
    title: string,
    description: string
  ) => Promise<void>;
}
