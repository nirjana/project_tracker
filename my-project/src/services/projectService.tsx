import axios from "axios";
import { Project, Task } from "../types/types";

const API_URL = "http://localhost:4000/api";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(`${API_URL}/projects`);
    return response.data;
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
    const response = await axios.post<Project>(`${API_URL}/projects`, {
      title,
      description,
    });
    return response.data;
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
    const response = await axios.put<Project>(
      `${API_URL}/projects/${projectId}`,
      {
        title,
        description,
      }
    );
    return response.data;
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
    const response = await axios.post<Task>(`${API_URL}/tasks`, {
      projectId,
      title,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(
      `${API_URL}/tasks/project/${projectId}`
    );
    return response.data;
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
    const response = await axios.patch<Task>(`${API_URL}/tasks/${taskId}`, {
      status,
    });
    return response.data;
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
      `${API_URL}/tasks/${taskId}`
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
      `${API_URL}/projects/${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
