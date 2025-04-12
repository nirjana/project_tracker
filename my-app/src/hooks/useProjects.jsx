import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

const useProjects = () => {
  return useContext(ProjectContext);
};

export default useProjects;
