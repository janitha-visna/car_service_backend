// src/index.ts
import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source initialized");

    app.listen(3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize data source:", err);
  });
