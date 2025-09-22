import { Request, Response } from "express";
import { ServiceService } from "../services/RevenueService";

export class ServiceController {
  constructor(private service = new ServiceService()) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vehicle_id, service_type_id, service_datetime, amount } =
        req.body;

      if (!vehicle_id || !service_type_id || !service_datetime || !amount) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const serviceData = {
        vehicle_id,
        service_type_id,
        service_datetime: new Date(service_datetime),
        amount,
      };

      const saved = await this.service.createService(serviceData);
      res.status(201).json({ message: "Service created", service: saved });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
