import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";

interface AddTaskFormProps {
  onAdd: (projectId: string, taskTitle: string) => void;
  projectId: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, projectId }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = taskTitle.trim();
    const titleRegex = /^[a-zA-Z0-9\s.,!?'-]{3,50}$/;

    if (!trimmedTitle) {
      setError("Task title cannot be empty.");
      return;
    }

    if (!titleRegex.test(trimmedTitle)) {
      setError(
        "Task title must be 3-50 characters and contain only letters, numbers, spaces, or basic punctuation."
      );
      return;
    }

    onAdd(projectId, trimmedTitle);
    setTaskTitle("");
    setError(null);
  };

  const handleTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
    if (error) setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <div className="flex flex-col flex-grow">
          <input
            className="border px-2 py-1"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            placeholder="New task title"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>{" "}
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
