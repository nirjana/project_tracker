import * as React from "react";
import { useState, ChangeEvent } from "react";
import AddTaskForm from "./AddTaskForm";
import { Project, Task } from "../types/types";

interface TaskListProps {
  project: Project;
  onBack: () => void;
  onAddTask: (projectId: string, taskTitle: string) => void;
  onUpdateStatus: (projectId: string, taskId: string, status: string) => void;
  onDeleteTask: (taskId: string) => Promise<string | null>;
}

const TaskList: React.FC<TaskListProps> = ({
  project,
  onBack,
  onAddTask,
  onUpdateStatus,
  onDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTitleClick = () => {
    setModalTitle(project.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };

  const handleStatusChange = (
    e: ChangeEvent<HTMLSelectElement>,
    taskId: string
  ) => {
    onUpdateStatus(project._id, taskId, e.target.value);
  };

  const handleDeleteTask = async (taskId: string) => {
    const deleteMessage = await onDeleteTask(taskId);

    if (deleteMessage) {
      setSuccessMessage(deleteMessage);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const taskGroups: Record<string, Task[]> = {
    todo: project.tasks?.filter((t) => t.status === "todo") || [],
    "in-progress":
      project.tasks?.filter((t) => t.status === "in-progress") || [],
    done: project.tasks?.filter((t) => t.status === "done") || [],
  };

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg mb-6 hover:bg-blue-600 hover:text-white transition font-medium shadow-sm"
      >
        ← Back
      </button>

      <h2
        className="text-4xl font-extrabold mb-8 cursor-pointer hover:text-blue-600 transition"
        onClick={handleTitleClick}
      >
        {project.title}
      </h2>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Project Title</h3>
            <p className="text-gray-700">{modalTitle}</p>
            <button
              onClick={closeModal}
              className="mt-6 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-5 shadow animate-fade-in">
          {successMessage}
        </div>
      )}

      <AddTaskForm onAdd={onAddTask} projectId={project._id} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {Object.keys(taskGroups).map((status) => (
          <div
            key={status}
            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-semibold mb-5 capitalize text-center text-gray-800 border-b pb-3">
              {status.replace("-", " ")}
            </h3>

            {taskGroups[status].length > 0 ? (
              <div className="flex flex-col gap-4">
                {taskGroups[status].map((task) => (
                  <div
                    key={task._id}
                    className="bg-gray-100 p-3 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-gray-800 font-medium">
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        className="border border-gray-300 px-2 py-1 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={task.status}
                        onChange={(e) => handleStatusChange(e, task._id)}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                        title="Delete Task"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">No tasks.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
