import "reflect-metadata";
import { DataSource } from "typeorm";
import { Service } from "./entities/Services";
import { RevenueSummaryMonthly } from "./entities/RevenueSummaryMonthly";
import { ServiceSubscriber } from "./subscribers/ServiceSubscriber";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "car_service",
  synchronize: true, // Disable in production
  logging: false,
  entities: [Service, RevenueSummaryMonthly],
  subscribers: [ServiceSubscriber],
});
