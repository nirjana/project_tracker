import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { ProjectListProps } from "../types/types";

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onAddProject,
  onSelect,
  deleteProject,
}) => {
  const [projectName, setProjectName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.trim()) {
      onAddProject(projectName.trim());
      setProjectName("");
    }
  };

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleDelete = async (projectId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    const message = await deleteProject(projectId);
    if (message) {
      alert(message);
    }
  };

  const handleSelect = (projectId: string) => {
    onSelect(projectId);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center">
        📁 Your Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-[1.03] overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-t-2xl">
              <h2 className="text-2xl font-semibold text-white truncate">
                {project.title}
              </h2>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-xl shadow hover:bg-blue-600 transition"
                onClick={() => handleSelect(project._id)}
              >
                📋 View Tasks
              </button>

              <button
                className="w-full bg-red-500 text-white py-3 rounded-xl shadow hover:bg-red-600 transition"
                onClick={() => handleDelete(project._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mt-16 w-full max-w-2xl"
      >
        <input
          className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 rounded-xl px-5 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition"
          value={projectName}
          onChange={handleProjectNameChange}
          placeholder="✨ New project name"
        />
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
          type="submit"
        >
          ➕ Add
        </button>
      </form>
    </div>
  );
};

export default ProjectList;
