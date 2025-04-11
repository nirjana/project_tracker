import express from "express";
const router = express.Router();

import {
  getProjects,
  createProject,
} from "../controllers/projectController.js";

router.get("/", getProjects);
router.get("/test", (req, res) => {
  res.send("Project test route works!");
});

router.post("/", createProject);

export default router;
