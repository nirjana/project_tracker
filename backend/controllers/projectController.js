import Project from "../models/project.js";
import Task from "../models/task.js";

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = new Project({ title, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId });

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (tasks.length > 0) {
      await Task.deleteMany({ projectId });
      res
        .status(200)
        .json({ message: "Project and associated tasks deleted successfully" });
    } else {
      res
        .status(200)
        .json({ message: "No tasks found, deleting project only" });
    }
  } catch (error) {
    next(error);
  }
};

export { getProjects, createProject, deleteProject };
