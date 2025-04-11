import React, { useState } from "react";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const addProject = (name) => {
    const newProject = {
      id: Date.now(),
      name,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const addTask = (projectId, taskName) => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            tasks: [
              ...p.tasks,
              { id: Date.now(), name: taskName, status: "todo" },
            ],
          }
        : p
    );
    setProjects(updated);
  };

  const updateTaskStatus = (projectId, taskId, status) => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
          }
        : p
    );
    setProjects(updated);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      {!selectedProject ? (
        <ProjectList
          projects={projects}
          onAddProject={addProject}
          onSelect={setSelectedProjectId}
        />
      ) : (
        <TaskList
          project={selectedProject}
          onBack={() => setSelectedProjectId(null)}
          onAddTask={addTask}
          onUpdateStatus={updateTaskStatus}
        />
      )}
    </div>
  );
};

export default App;
