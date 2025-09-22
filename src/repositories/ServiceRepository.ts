import { AppDataSource } from "../data-source";
import { Service } from "../entities/Services";

export class ServiceRepository {
  private repo = AppDataSource.getRepository(Service);

  async create(data: Partial<Service>): Promise<Service> {
    const newService = this.repo.create(data);
    return this.repo.save(newService);
  }
}