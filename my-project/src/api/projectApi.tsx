import axios from "axios";

const API_URL = "http://localhost:4000/api";

// -----------------
// Type Definitions
// -----------------

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

// -----------------
// API Functions
// -----------------

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
};

export const addProject = async (title: string): Promise<Project> => {
  try {
    const response = await axios.post<Project>(`${API_URL}/projects`, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (
  id: string,
  updatedData: Partial<Project>
): Promise<Project> => {
  const res = await axios.patch<Project>(
    `${API_URL}/projects/${id}`,
    updatedData
  );
  return res.data;
};

export const deleteProject = async (
  id: string
): Promise<{ message: string }> => {
  const res = await axios.delete<{ message: string }>(
    `${API_URL}/projects/${id}`
  );
  return res.data;
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
