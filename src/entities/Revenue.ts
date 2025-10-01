import { Entity, Column, PrimaryColumn } from "typeorm";
import { ObjectType, Field, Float, Int } from "type-graphql";

@ObjectType()
@Entity({ name: "revenue" })
export class Revenue {
  @Field(() => Int)
  @PrimaryColumn()
  year: number;

  @Field(() => Int)
  @PrimaryColumn()
  month: number;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2 })
  revenue: number;
}
