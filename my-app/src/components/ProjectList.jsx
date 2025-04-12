import React, { useState } from "react";

const ProjectList = ({ projects, onAddProject, onSelect }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      onAddProject(projectName.trim());
      setProjectName("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📁 Projects
      </h1>

      <ul className="space-y-3 mb-6">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
          >
            <span
              className="text-lg font-medium text-gray-700 overflow-hidden whitespace-nowrap"
              style={{
                textOverflow: "ellipsis",
                maxWidth: "200px",
              }}
            >
              {project.title}
            </span>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              onClick={() => onSelect(project._id)}
            >
              View Tasks
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="New project name"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ProjectList;
