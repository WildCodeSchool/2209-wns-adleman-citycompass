import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  IsLatitude,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import Place from "./Place";
import { HasSixDecimalMax, IsDotInString } from "../helpers/customValidators";

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
  // custom Validation
  @Validate(IsDotInString)
  latitude: string;

  @Field()
  @Column({ length: 13, type: "varchar" })
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
  name: string;

  @Field()
  @MaxLength(2083)
  @IsUrl()
  picture: string;

  @Field()
  @MinLength(10)
  description: string;

  @Field()
  @MaxLength(10)
  @MinLength(1)
  @IsLatitude()
  // custom Validation
  @Validate(IsDotInString)
  @Validate(HasSixDecimalMax)
  latitude: string;

  @Field()
  @MaxLength(13)
  @MinLength(1)
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
  @MaxLength(10)
  @MinLength(1)
  @IsLatitude()
  // custom Validation
  @Validate(IsDotInString)
  @Validate(HasSixDecimalMax)
  latitude?: string;

  @Field({ nullable: true })
  @MaxLength(13)
  @MinLength(1)
  longitude?: string;
}
export default City;
