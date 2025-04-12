import React, { useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";

import {
  getProjects,
  addProject as addProjectAPI,
  addTaskToProject,
  getTasksByProject,
  updateTaskStatus as updateTaskStatusAPI,
} from "./api/projectApi";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const fetchTasksForProject = async (projectId) => {
    try {
      const project = projects.find((p) => p._id === projectId);
      const tasks = await getTasksByProject(projectId);

      setSelectedProject({ ...project, tasks });
    } catch (err) {
      console.error("Error loading project tasks:", err);
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
    <ErrorBoundary>
      <div className="p-4 max-w-2xl mx-auto font-sans">
        {!selectedProject ? (
          <ProjectList
            projects={projects}
            onAddProject={addProject}
            onSelect={(projectId) => {
              setSelectedProjectId(projectId);
              fetchTasksForProject(projectId);
            }}
          />
        ) : (
          <TaskList
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            onAddTask={addTask}
            onUpdateStatus={updateTaskStatus}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
