import * as React from "react";
import { useState, ChangeEvent } from "react";
import AddTaskForm from "./AddTaskForm";

interface Task {
  _id: string;
  title: string;
  status: string;
}

interface Project {
  _id: string;
  title: string;
  tasks?: Task[];
}

interface TaskListProps {
  project: Project;
  onBack: () => void;
  onAddTask: (projectId: string, taskTitle: string) => void;
  onUpdateStatus: (projectId: string, taskId: string, status: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  project,
  onBack,
  onAddTask,
  onUpdateStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleTitleClick = () => {
    setModalTitle(project.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 font-medium px-4 py-2 rounded-lg transition duration-200"
      >
        &larr; Back to Projects
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        <span
          className="block w-full truncate cursor-pointer"
          onClick={handleTitleClick}
        >
          {project.title}
        </span>
      </h2>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Project Title</h3>
            <p className="whitespace-pre-wrap break-words">{modalTitle}</p>
            <button
              onClick={closeModal}
              className="mt-4 inline-block text-sm text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-3 mb-6">
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-lg text-gray-700">{task.title}</span>
              <select
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={task.status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  onUpdateStatus(project._id, task._id, e.target.value)
                }
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available.</p>
        )}
      </ul>

      <AddTaskForm onAdd={onAddTask} projectId={project._id} />
    </div>
  );
};

export default TaskList;
