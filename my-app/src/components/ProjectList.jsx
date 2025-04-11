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
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="mb-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex justify-between items-center mb-2"
          >
            <span>{project.name}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => onSelect(project.id)}
            >
              View Tasks
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border px-2 py-1 flex-grow"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="New project name"
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ProjectList;
