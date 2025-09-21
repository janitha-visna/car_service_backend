import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle_id: number;

  @Column()
  service_type_id: number;

  @Column("datetime")
  service_datetime: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;
}
