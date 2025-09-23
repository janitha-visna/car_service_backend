import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Service } from "../entities";
import { ServiceService } from "../services/RevenueService";
import { ServiceInput } from "./ServiceInputs";

@Resolver(() => Service)
export class ServiceResolver {
  private service = new ServiceService();

  @Query(() => String)
  hello(): string {
    return "Hello GraphQL!";
  }
  
  @Mutation(() => Service)
  async createService(@Arg("input") input: ServiceInput): Promise<Service> {
    const data = {
      ...input,
      service_datetime: new Date(input.service_datetime),
    };
    return this.service.createService(data);
  }

  @Mutation(() => Boolean)
  async deleteService(@Arg("id", () => Int) id: number): Promise<boolean> {
    await this.service.deleteService(id);
    return true;
  }
}
