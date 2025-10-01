import { AppDataSource } from "../data-source";
import { Revenue } from "../entities/Revenue";


export class RevenueRepository {
  private repo = AppDataSource.getRepository(Revenue);

  async findAll(year?: number, month?: number): Promise<Revenue[]> {
    const query = this.repo.createQueryBuilder("revenue");

    if (year) query.andWhere("revenue.year = :year", { year });
    if (month) query.andWhere("revenue.month = :month", { month });

    return query.getMany();
  }

  async findOne(year: number, month: number): Promise<Revenue | null> {
    return this.repo.findOneBy({ year, month });
  }

  async save(data: Revenue): Promise<Revenue> {
    return this.repo.save(data);
  }

  async create(data: Partial<Revenue>): Promise<Revenue> {
    return this.repo.create(data);
  }
}
