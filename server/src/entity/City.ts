import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { MaxLength } from "class-validator";

@Entity()
@ObjectType()
class City {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ length: 2083, type: "varchar" })
  picture: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ length: 12, type: "varchar" })
  latitude: string;

  @Field()
  @Column({ length: 13, type: "varchar" })
  longitude: string;
}

@InputType()
export class CityInput {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @MaxLength(2083)
  picture: string;

  @Field()
  description: string;

  @Field()
  @MaxLength(12)
  latitude: string;

  @Field()
  @MaxLength(13)
  longitude: string;
}
export default City;
