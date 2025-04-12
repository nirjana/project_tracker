import React, { createContext, useState, useEffect } from "react";
import {
  getProjects,
  addProject as addProjectAPI,
  getTasksByProject,
  addTaskToProject,
  updateTaskStatus as updateTaskStatusAPI,
} from "../api/projectApi";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };

  const fetchTasksForProject = async (projectId) => {
    try {
      const project = projects.find((p) => p._id === projectId);
      const tasks = await getTasksByProject(projectId);
      setSelectedProject({ ...project, tasks });
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const addProject = async (title) => {
    try {
      const newProject = await addProjectAPI(title);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const addTask = async (projectId, title) => {
    try {
      const newTask = await addTaskToProject(projectId, title);
      setSelectedProject((prev) => ({
        ...prev,
        tasks: [...(prev.tasks || []), newTask],
      }));
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTaskStatus = async (projectId, taskId, status) => {
    try {
      const updatedTask = await updateTaskStatusAPI(taskId, status);
      setSelectedProject((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
      }));
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
