import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error loading projects:", error);
    throw error;
  }
};

export const addProject = async (title) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, { title });
    return response.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (id, updatedData) => {
  const res = await axios.patch(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const addTaskToProject = async (projectId, title) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, {
      projectId,
      title,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getTasksByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks for project:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
