import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { Project, ProjectListProps } from "../types/types";
import { updateProject } from "../services/projectService";
import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import { Plus, Trash2, Edit, ClipboardList } from "lucide-react";

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
  if (!projectContext)
    throw new Error("ProjectContext must be used within a ProjectProvider");
  const { fetchProjects } = projectContext;

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Project name is required.");
      return false;
    } else if (value.trim().length < 3) {
      setNameError("At least 3 characters.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateDescription = (value: string) => {
    if (value.length > 0 && value.trim().length < 5) {
      setDescError("Min 5 characters or leave empty.");
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
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Delete this project?")) {
      const message = await deleteProject(projectId);
      if (message) alert(message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
        📁 Projects
      </h1>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow hover:bg-green-700 transition mb-12"
      >
        <Plus size={20} /> Add Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="p-5 bg-gradient-to-t from-indigo-500 to-cyan-500 text-white flex items-center justify-between">
              <h2 className="text-lg font-semibold truncate">
                {project.title}
              </h2>
              <button
                onClick={() => {
                  setEditingProject(project);
                  setProjectName(project.title);
                  setProjectDescription(project.description || "");
                  setShowModal(true);
                }}
                className="text-white p-2 rounded-full bg-yellow-600 hover:text-black transition"
              >
                <Edit size={20} /> Edit
              </button>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-gray-700 text-sm">{project.description}</p>

              <button
                onClick={() => onSelect(project._id)}
                className="flex items-center gap-2 w-full bg-blue-500 text-white py-2 rounded-full shadow hover:bg-blue-600 transition"
              >
                <ClipboardList size={18} /> View Tasks
              </button>

              <button
                onClick={() => handleDelete(project._id)}
                className="flex items-center gap-2 w-full bg-red-500 text-white py-2 rounded-full shadow hover:bg-red-600 transition"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {editingProject ? "✏️ Edit Project" : "➕ New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className={`border ${
                  nameError ? "border-red-500" : "border-gray-300"
                } rounded-xl px-4 py-3 w-full focus:ring-2 ${
                  nameError ? "focus:ring-red-400" : "focus:ring-blue-400"
                } transition`}
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  validateName(e.target.value);
                }}
                placeholder="✨ Project name"
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

              <input
                className={`border ${
                  descError ? "border-red-500" : "border-gray-300"
                } rounded-xl px-4 py-3 w-full focus:ring-2 ${
                  descError ? "focus:ring-red-400" : "focus:ring-blue-400"
                } transition`}
                value={projectDescription}
                onChange={(e) => {
                  setProjectDescription(e.target.value);
                  validateDescription(e.target.value);
                }}
                placeholder="📝 Description (optional)"
              />
              {descError && <p className="text-red-500 text-sm">{descError}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white w-full py-2 rounded-xl hover:bg-green-700 transition"
                  disabled={!!nameError || !!descError}
                >
                  {editingProject ? "💾 Save" : "➕ Add"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 w-full py-2 rounded-xl hover:bg-gray-300 transition"
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
