import axios from "./api";
import {
  AddProjectResponse,
  AddTaskResponse,
  Project,
  ProjectResponse,
  Task,
  TaskResponse,
} from "../types/types";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<ProjectResponse>("/projects");
    return response.data?.data;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
};

export const addProject = async (
  title: string,
  description: string
): Promise<Project> => {
  try {
    const response = await axios.post<AddProjectResponse>("/projects", {
      title,
      description,
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: string,
  title: string,
  description: string
): Promise<Project> => {
  try {
    const response = await axios.put<AddProjectResponse>(
      `/projects/${projectId}`,
      {
        title,
        description,
      }
    );
    return response.data?.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const addTaskToProject = async (
  projectId: string,
  title: string
): Promise<Task> => {
  try {
    const response = await axios.post<AddTaskResponse>("/tasks", {
      projectId,
      title,
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  try {
    const response = await axios.get<TaskResponse>(
      `/tasks/project/${projectId}`
    );
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching tasks for project:", error);
    throw error;
  }
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<Task> => {
  try {
    const response = await axios.patch<AddTaskResponse>(`/tasks/${taskId}`, {
      status,
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (
  taskId: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `/tasks/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const deleteProject = async (
  projectId: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `/projects/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
