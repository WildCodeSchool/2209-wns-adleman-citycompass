import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  IsLatitude,
  IsLongitude,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
  IsNotEmpty,
} from "class-validator";
import Place from "./Place";
import { IsNotOnlySpaces } from "../helpers/customValidators";
import User from "./User";

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
  @IsUrl()
  picture: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ length: 12, type: "varchar" })
  @IsLatitude()
  latitude: string;

  @Field()
  @Column({ length: 13, type: "varchar" })
  @IsLongitude()
  longitude: string;

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.city)
  places?: Place[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User)
  @JoinTable()
  managers?: User[];
}

@InputType()
export class CityInput {
  @Field()
  @MaxLength(50)
  @MinLength(2)
  @IsNotEmpty({ message: "A city name cannot be empty" })
  @Validate(IsNotOnlySpaces)
  name: string;

  @Field()
  @MaxLength(2083)
  @IsUrl()
  picture: string;

  @Field()
  @MinLength(10)
  description: string;

  @Field()
  @IsLatitude()
  latitude: string;

  @Field()
  @IsLongitude()
  longitude: string;
}

@InputType()
export class CityUpdate {
  @Field({ nullable: true })
  @MaxLength(50)
  @MinLength(2)
  name?: string;

  @Field({ nullable: true })
  @MaxLength(2083)
  @IsUrl()
  picture?: string;

  @Field({ nullable: true })
  @MinLength(10)
  description?: string;

  @Field({ nullable: true })
  @IsLatitude()
  latitude?: string;

  @Field({ nullable: true })
  @IsLongitude()
  longitude?: string;
}
export default City;
