import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class RevenueSummaryMonthly {
  @PrimaryColumn("int")
  year: number;

  @PrimaryColumn("int")
  month: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  revenue: number;

  private constructor(year: number, month: number, revenue: number = 0) {
    this.year = year;
    this.month = month;
    this.revenue = revenue;
  }
}
