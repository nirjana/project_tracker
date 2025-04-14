import Task from "../models/task.js";
import mongoose from "mongoose";
import createError from "../utils/createError.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTasksByProject = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      return next(createError(400, "Invalid projectId format"));
    }

    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  const { title, status, projectId } = req.body;

  if (!title || !projectId) {
    return next(createError(400, "Title and projectId are required"));
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid projectId format"));
  }

  try {
    const task = new Task({ title, status, projectId });
    const savedTask = await task.save();
    res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ["todo", "in-progress", "done"];

  if (!allowedStatuses.includes(status)) {
    return next(createError(400, "Invalid status value"));
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return next(createError(404, "Task not found"));
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return next(createError(404, "Task not found"));
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};
