import React, { useState } from "react";

const AddTaskForm = ({ onAdd, projectId }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAdd(projectId, taskTitle.trim());
      setTaskTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border px-2 py-1 flex-grow"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New task title"
      />
      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        type="submit"
      >
        Add Task Title
      </button>
    </form>
  );
};

export default AddTaskForm;
