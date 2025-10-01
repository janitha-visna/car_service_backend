import { Resolver, Query, Arg, Int, Mutation, Float } from "type-graphql";
import { Revenue } from "../entities/Revenue"; 
import { RevenueService } from "../services/Revenue"; 

@Resolver()
export class RevenueResolver {
  private service = new RevenueService();

  @Query(() => [Revenue])
  async monthlyRevenues(
    @Arg("year", () => Int, { nullable: true }) year?: number,
    @Arg("month", () => Int, { nullable: true }) month?: number
  ): Promise<Revenue[]> {
    return this.service.getRevenue(year, month);
  }

  @Mutation(() => Revenue)
  async upsertRevenue(
    @Arg("year", () => Int) year: number,
    @Arg("month", () => Int) month: number,
    @Arg("revenue", () => Float) revenue: number
  ): Promise<Revenue> {
    return this.service.addOrUpdateRevenue(year, month, revenue);
  }
}
