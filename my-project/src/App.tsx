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
    deleteTask,
    deleteProjectById,
  } = useProjects();

  return (
    <div className="p-4  mx-auto font-sans">
      {!selectedProject ? (
        <ProjectList
          projects={projects}
          onAddProject={addProject}
          onSelect={fetchTasksForProject}
          deleteProject={deleteProjectById}
        />
      ) : (
        <TaskList
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onAddTask={addTask}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ProjectProvider>
    <AppContent />
  </ProjectProvider>
);

export default App;
