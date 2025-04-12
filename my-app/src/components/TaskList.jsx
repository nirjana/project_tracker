import React from "react";
import AddTaskForm from "./AddTaskForm";

const TaskList = ({ project, onBack, onAddTask, onUpdateStatus }) => {
  return (
    <div>
      <button onClick={onBack} className="text-blue-600 underline mb-4">
        &larr; Back to Projects
      </button>
      <h2 className="text-xl font-bold mb-2">{project.name} - Tasks</h2>

      <ul className="space-y-2 mb-4">
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{task.title}</span>
              <select
                className="border px-2 py-1"
                value={task.status}
                onChange={(e) =>
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
          <p>No tasks available.</p>
        )}
      </ul>
      <AddTaskForm onAdd={onAddTask} projectId={project._id} />
    </div>
  );
};

export default TaskList;
