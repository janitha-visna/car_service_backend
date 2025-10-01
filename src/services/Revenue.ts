import { Revenue } from "../entities/Revenue";
import { RevenueRepository } from "../repositories/RevenueRepoitory";

export class RevenueService {
  private revenueRepo = new RevenueRepository();

  async getRevenue(year?: number, month?: number): Promise<Revenue[]> {
    return this.revenueRepo.findAll(year, month);
  }

  async addOrUpdateRevenue(
    year: number,
    month: number,
    revenue: number
  ): Promise<Revenue> {
    const existing = await this.revenueRepo.findOne(year, month);

    if (existing) {
      existing.revenue = revenue;
      return this.revenueRepo.save(existing);
    }

    const newRevenue = await this.revenueRepo.create({ year, month, revenue });
    return this.revenueRepo.save(newRevenue);
  }
}