import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { Project, ProjectListProps } from "../types/types";
import { updateProject } from "../services/projectService";
import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onAddProject,
  onSelect,
  deleteProject,
}) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [nameError, setNameError] = useState<string>("");
  const [descError, setDescError] = useState<string>("");
  const projectContext = useContext(ProjectContext);

  if (!projectContext) {
    throw new Error("ProjectContext must be used within a ProjectProvider");
  }

  const { fetchProjects } = projectContext;

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Project name is required.");
      return false;
    } else if (value.trim().length < 3) {
      setNameError("Project name must be at least 3 characters.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateDescription = (value: string) => {
    if (value.length > 0 && value.trim().length < 5) {
      setDescError("Description must be at least 5 characters or left empty.");
      return false;
    }
    setDescError("");
    return true;
  };

  const resetForm = () => {
    setProjectName("");
    setProjectDescription("");
    setNameError("");
    setDescError("");
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNameValid = validateName(projectName);
    const isDescValid = validateDescription(projectDescription);

    if (isNameValid && isDescValid) {
      if (editingProject) {
        await updateProject(
          editingProject._id,
          projectName.trim(),
          projectDescription.trim()
        );
        await fetchProjects();
      } else {
        onAddProject(projectName.trim(), projectDescription.trim());
      }
      resetForm();
      setEditingProject(null);
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    const message = await deleteProject(projectId);
    if (message) alert(message);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center tracking-tight">
        📁 Your Projects
      </h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-12 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-green-600 transition duration-300"
      >
        ➕ Add Project
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition duration-300 ease-in-out hover:scale-[1.02] overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-3xl flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-white truncate">
                {project.title}
              </h2>
              <button
                className="bg-yellow-500 text-white py-2 rounded-xl shadow hover:bg-yellow-600 transition"
                onClick={() => {
                  setEditingProject(project);
                  setProjectName(project.title);
                  setProjectDescription(project.description || "");
                  setShowModal(true);
                }}
              >
                ✏️ Edit
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <p className="text-gray-700">{project.description}</p>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-xl shadow hover:bg-blue-600 transition"
                onClick={() => onSelect(project._id)}
              >
                📋 View Tasks
              </button>
              <button
                className="w-full bg-red-500 text-white py-2 rounded-xl shadow hover:bg-red-600 transition"
                onClick={() => handleDelete(project._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {editingProject ? "✏️ Edit Project" : "➕ Add New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className={`border ${
                    nameError ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-800 placeholder-gray-400 rounded-xl px-5 py-3 w-full focus:outline-none focus:ring-2 ${
                    nameError ? "focus:ring-red-400" : "focus:ring-blue-400"
                  } text-lg transition`}
                  value={projectName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setProjectName(e.target.value);
                    validateName(e.target.value);
                  }}
                  placeholder="✨ Project name"
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>

              <div>
                <input
                  className={`border ${
                    descError ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-800 placeholder-gray-400 rounded-xl px-5 py-3 w-full focus:outline-none focus:ring-2 ${
                    descError ? "focus:ring-red-400" : "focus:ring-blue-400"
                  } text-lg transition`}
                  value={projectDescription}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setProjectDescription(e.target.value);
                    validateDescription(e.target.value);
                  }}
                  placeholder="📝 Description (optional)"
                />
                {descError && (
                  <p className="text-red-500 text-sm mt-1">{descError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition w-full"
                  disabled={!!nameError || !!descError}
                >
                  {editingProject ? "💾 Save Changes" : "➕ Add Project"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow hover:bg-gray-300 transition w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
