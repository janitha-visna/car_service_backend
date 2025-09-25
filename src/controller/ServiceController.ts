import { Request, Response, NextFunction } from "express";
import { ServiceService } from "../services/RevenueService";
import { AppError, NotFoundError } from "../errors/app-errors";

export class ServiceController {
  constructor(private service = new ServiceService()) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
      console.log(saved);
      res.status(201).json({ message: "Service created", service: saved });
    } catch (err) {
      throw new AppError("UserNotFoundError mara vede", 404, "User not found", true);
      
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid service ID" });
        return;
      }

      await this.service.deleteService(id);
      res.status(200).json({ message: `Service with ID ${id} deleted` });
    } catch (err) {
      next(err);
    }
  };
}
