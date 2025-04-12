import express from "express";
const router = express.Router();

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:projectId", deleteProject);
router.put("/:projectId", updateProject);

export default router;
