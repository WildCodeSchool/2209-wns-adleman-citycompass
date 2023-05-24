import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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
import { IsDotInString, IsNotOnlySpaces } from "../helpers/customValidators";

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
  // custom Validations
  @Validate(IsDotInString)
  latitude: string;

  @Field()
  @Column({ length: 13, type: "varchar" })
  @IsLongitude()
  // custom validations
  @Validate(IsDotInString)
  longitude: string;

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.city)
  places?: Place[];
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
  // custom Validation
  @Validate(IsDotInString)
  latitude: string;

  @Field()
  @IsLongitude()
  // custom validations
  @Validate(IsDotInString)
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
  // custom Validation
  @Validate(IsDotInString)
  latitude?: string;

  @Field({ nullable: true })
  @IsLongitude()
  // custom validations
  @Validate(IsDotInString)
  longitude?: string;
}
export default City;
