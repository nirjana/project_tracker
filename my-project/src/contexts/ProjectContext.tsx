import { createContext, useState, useEffect, ReactNode } from "react";
import {
  getProjects,
  addProject as addProjectAPI,
  getTasksByProject,
  addTaskToProject,
  updateTaskStatus as updateTaskStatusAPI,
} from "../services/projectService";
import * as React from "react";
// -----------------
// Type Definitions
// -----------------

export interface Task {
  _id: string;
  title: string;
  status: string;
}

export interface Project {
  _id: string;
  title: string;
  tasks?: Task[];
}

interface ProjectContextType {
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
  loading: boolean;
}

export type { ProjectContextType };
export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading projects:", err);
      setLoading(false);
    }
  };

  const fetchTasksForProject = async (projectId: string) => {
    try {
      const project = projects.find((p) => p._id === projectId);
      if (!project) return;

      const tasks = await getTasksByProject(projectId);
      setSelectedProject({ ...project, tasks });
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const addProject = async (title: string) => {
    try {
      const newProject = await addProjectAPI(title);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const addTask = async (projectId: string, title: string) => {
    try {
      const newTask = await addTaskToProject(projectId, title);
      setSelectedProject((prev) =>
        prev ? { ...prev, tasks: [...(prev.tasks || []), newTask] } : prev
      );
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTaskStatus = async (
    projectId: string,
    taskId: string,
    status: string
  ) => {
    try {
      const updatedTask = await updateTaskStatusAPI(taskId, status);
      setSelectedProject((prev) =>
        prev
          ? {
              ...prev,
              tasks:
                prev.tasks?.map((t) => (t._id === taskId ? updatedTask : t)) ||
                [],
            }
          : prev
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        fetchProjects,
        fetchTasksForProject,
        addProject,
        addTask,
        updateTaskStatus,
        setSelectedProject,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
