// src/index.ts
import { createApp } from "./app";
import { AppDataSource } from "./data-source";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("📦 Data Source initialized");

    const app = await createApp();
    app.listen(4000, () => {
      console.log("🚀 GraphQL server running at http://localhost:4000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
}

main();