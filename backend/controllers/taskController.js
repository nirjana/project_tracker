import Task from "../models/task.js";
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
};

export const createTask = async (req, res, next) => {
  const { title, status, projectId } = req.body;

  if (!title || !projectId) {
    const err = new Error("Title and projectId required");
    err.statusCode = 400;
    return next(err);
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    const err = new Error("Invalid projectId format");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const task = new Task({ title, status, projectId });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;
  const allowed = ["todo", "in-progress", "done"];

  if (!allowed.includes(status)) {
    const err = new Error("Invalid status");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      const err = new Error("Task not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};
