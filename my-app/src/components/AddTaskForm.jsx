import React, { useState } from "react";

const AddTaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd(taskName.trim());
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border px-2 py-1 flex-grow"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="New task name"
      />
      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
