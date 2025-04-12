import express from "express";
const router = express.Router();

import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:projectId", deleteProject);

export default router;
