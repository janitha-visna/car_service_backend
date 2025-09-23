import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@ObjectType()
@Entity()
export class Service {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  vehicle_id: number;

  @Field()
  @Column()
  service_type_id: number;

  @Field()
  @Column("datetime")
  service_datetime: Date;

  @Field(() => Float)
  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;
}
