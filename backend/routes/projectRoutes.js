import express from "express";
const router = express.Router();

import {
  getProjects,
  createProject,
} from "../controllers/projectController.js";

router.get("/", getProjects);
router.post("/", createProject);

export default router;
