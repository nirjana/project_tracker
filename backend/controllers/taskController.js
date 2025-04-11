import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, status, projectId } = req.body;
  if (!title || !projectId)
    return res.status(400).json({ message: "Title and projectId required" });

  const task = new Task({ title, status, projectId });
  const saved = await task.save();
  res.status(201).json(saved);
};

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["todo", "in-progress", "done"];
  if (!allowed.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
};
