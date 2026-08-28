import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend working");
});
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});