import React from "react";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";
import { ProjectProvider } from "./contexts/ProjectContext";
import useProjects from "./hooks/useProjects";
import ErrorBoundary from "./ErrorBoundary";

const AppContent = () => {
  const {
    projects,
    selectedProject,
    fetchTasksForProject,
    addProject,
    addTask,
    updateTaskStatus,
    setSelectedProject,
  } = useProjects();

  console.log(projects, "ok");

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      {!selectedProject ? (
        <ProjectList
          projects={projects}
          onAddProject={addProject}
          onSelect={fetchTasksForProject}
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
  );
};

const App = () => (
  <ErrorBoundary>
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  </ErrorBoundary>
);

export default App;
