import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";

import { ProjectListProps } from "../types/types";

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onAddProject,
  onSelect,
}) => {
  const [projectName, setProjectName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.trim()) {
      onAddProject(projectName.trim());
      setProjectName("");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          📁 Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 justify-center">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105 transform "
            >
              <div className="p-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-t-xl ">
                <h2 className="text-xl font-semibold text-white truncate">
                  {project.title}
                </h2>
              </div>
              <div className="p-4 flex justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-xl transition transform hover:scale-105"
                  onClick={() => onSelect(project._id)}
                >
                  View Tasks
                </button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4 mt-8">
          <input
            className="border border-gray-300 rounded-lg px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProjectName(e.target.value)
            }
            placeholder="Enter new project name"
          />
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            type="submit"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectList;
