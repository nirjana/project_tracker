import express from "express";
const router = express.Router();
import {
  getTasksByProject,
  createTask,
  updateTaskStatus,
  getTasks,
  deleteTask,
} from "../controllers/taskController.js";

router.get("/", getTasks);
router.get("/project/:projectId", getTasksByProject);
router.post("/", createTask);
router.patch("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
