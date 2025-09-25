import { AppDataSource } from "../data-source";
import { Service } from "../entities/Services";
import { AppError, NotFoundError } from "../errors/app-errors";

export class ServiceRepository {
  private repo = AppDataSource.getRepository(Service);

  async create(data: Partial<Service>): Promise<Service> {
    const newService = this.repo.create(data);
    return this.repo.save(newService);
  }

  async  deleteById(id: number): Promise<void> {
    const service = await this.repo.findOneBy({id});
    if (!service) throw new NotFoundError;

    // ✅ Use .remove() to trigger the afterRemove subscriber
    await this.repo.remove(service);
  }
}

