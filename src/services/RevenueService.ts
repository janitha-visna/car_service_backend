import { Service } from "../entities";
import { ServiceRepository } from "../repositories/ServiceRepository";

export class ServiceService {
  constructor(private repo: ServiceRepository = new ServiceRepository()) {}

  async createService(data: Partial<Service>): Promise<Service> {
    return this.repo.create(data);
  }
}
