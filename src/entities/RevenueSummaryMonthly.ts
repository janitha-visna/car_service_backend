import { Entity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, Float, Int } from "type-graphql";

@ObjectType()
@Entity()
export class RevenueSummaryMonthly {
  @Field(() => Int)
  @PrimaryColumn("int")
  year: number;

  @Field(() => Int)
  @PrimaryColumn("int")
  month: number;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  revenue: number;

  private constructor(year: number, month: number, revenue: number = 0) {
    this.year = year;
    this.month = month;
    this.revenue = revenue;
  }
}
