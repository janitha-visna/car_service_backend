import { InputType, Field, Float, Int } from "type-graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class ServiceInput {
  @Field(() => Int)
  @IsNumber()
  vehicle_id: number;

  @Field(() => Int)
  @IsNumber()
  service_type_id: number;

  @Field()
  @IsNotEmpty()
  service_datetime: string;

  @Field(() => Float)
  @IsNumber()
  amount: number;
}
