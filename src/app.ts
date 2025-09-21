import express from "express";
import { AppDataSource } from "./data-source";
import { Service } from "./entities/Services";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
  });

app.post("/services", async (req, res) => {
  try {
    const { vehicle_id, service_type_id, service_datetime, amount } = req.body;

    const serviceRepo = AppDataSource.getRepository(Service);
    const newService = serviceRepo.create({
      vehicle_id,
      service_type_id,
      service_datetime: new Date(service_datetime),
      amount,
    });

    const saved = await serviceRepo.save(newService);
    res.status(201).json({ message: "Service created", service: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
