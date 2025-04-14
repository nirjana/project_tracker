import Project from "../models/project.js";
import Task from "../models/task.js";
import mongoose from "mongoose";
import createError from "../utils/createError.js";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    return next(createError(400, "Project title is required"));
  }

  try {
    const newProject = new Project({ title, description });
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid projectId format"));
  }

  try {
    const tasks = await Task.find({ projectId });
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return next(createError(404, "Project not found"));
    }

    if (tasks.length > 0) {
      await Task.deleteMany({ projectId });
      res.status(200).json({
        success: true,
        message: "Project and associated tasks deleted successfully",
        data: deletedProject,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No tasks found, deleting project only",
        data: deletedProject,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(createError(400, "Invalid projectId format"));
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return next(createError(404, "Project not found"));
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    next(error);
  }
};
