import * as React from "react";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";
import { ProjectProvider } from "./contexts/ProjectContext";
import useProjects from "./hooks/useProjects";

const AppContent: React.FC = () => {
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

const App: React.FC = () => (
  // <ErrorBoundary>
  <ProjectProvider>
    <AppContent />
  </ProjectProvider>
);

export default App;
