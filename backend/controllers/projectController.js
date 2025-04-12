import Project from "../models/project.js";

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

export { getProjects, createProject };
