import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import type { ProjectContextType } from "../contexts/ProjectContext";

const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }

  return context;
};

export default useProjects;
