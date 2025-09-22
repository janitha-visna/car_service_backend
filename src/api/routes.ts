import { Router } from "express";
import { ServiceController } from "../controller/ServiceController";


// Create a router instance
const router = Router();
const controller = new ServiceController();




// Define the route that uses the handler
router.post("/services",controller.create);
router.delete("/services/:id", controller.delete);

export default router;