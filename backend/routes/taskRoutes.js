import express from "express";
const router = express.Router();
import {
  getTasksByProject,
  createTask,
  updateTaskStatus,
  getTasks,
} from "../controllers/taskController.js";

router.get("/", getTasks);
router.get("/project/:projectId", getTasksByProject);
router.post("/", createTask);
router.patch("/:id", updateTaskStatus);

export default router;
