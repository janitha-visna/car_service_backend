// src/app.ts
import express from "express";
import serviceRoutes from "./api/routes";

const app = express();
app.use(express.json());

// Use your route file
app.use("/api", serviceRoutes); // URL will be /api/services

export default app;

