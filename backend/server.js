import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
