import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";
import City from "./City";
import { IsNotOnlySpaces } from "../helpers/customValidators";
import Place from "./Place";

export type Role = "superadmin" | "admin" | "contributor" | "visitor";

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50, type: "varchar" })
  firstname: string;

  @Field()
  @Column({ length: 50, type: "varchar" })
  lastname: string;

  @Field()
  @Column({ length: 65, type: "varchar" })
  email: string;

  @Field()
  @Column({ length: 255, type: "varchar" })
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
    message: "password too weak",
  })
  password: string;

  @Field()
  @Column({ length: 2083, type: "varchar" })
  picture: string;

  @Field()
  @Column({
    length: 20,
    type: "varchar",
    enum: ["superadmin", "admin", "contributor", "visitor"],
    default: "visitor",
  })
  role: string;

  // this relation allow an user to manage a city or places in a city, depending on user role
  @Field(() => [City], { nullable: true })
  @ManyToMany(() => City)
  @JoinTable()
  managedCities: City[];

  @Field(() => [Place], { nullable: true })
  @OneToMany(() => Place, (place) => place.author)
  managedPlaces?: Place[];
}

@InputType()
export class UserInput {
  @Field()
  @MaxLength(50, {
    message: "A firstname must be less than 50 characters long",
  })
  @MinLength(2, {
    message: "A firstname must be at least 2 characters long",
  })
  @IsNotEmpty({ message: "A firstname cannot be empty" })
  @Validate(IsNotOnlySpaces)
  firstname: string;

  @Field()
  @MaxLength(50, {
    message: "A lastname must be less than 50 characters long",
  })
  @MinLength(2, {
    message: "A lastname must be at least 2 characters long",
  })
  @IsNotEmpty({ message: "A lastname cannot be empty" })
  @Validate(IsNotOnlySpaces)
  lastname: string;

  @Field()
  @MaxLength(65, {
    message: "Email must be less than 65 characters long",
  })
  @IsEmail({ message: "Email must be an valid email" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @Field()
  @MinLength(8, {
    message: "A password must be at least 8 characters long",
  })
  @MaxLength(255, {
    message: "A lastname must be less than 255 characters long",
  })
  // Minimum 8 caractère, une minuscule, une majuscule, un caractère spécial et un chiffre
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
    message: "password too weak",
  })
  @IsNotEmpty({ message: "A password cannot be empty" })
  password: string;

  @Field()
  @MaxLength(2083)
  @IsUrl({ message: "A picture must be an url" })
  @IsNotEmpty({ message: "A picture cannot be empty" })
  picture: string;

  @Field({ defaultValue: "visitor" })
  @MaxLength(20)
  role: string;
}

@InputType()
export class UserUpdate {
  @Field({ nullable: true })
  @MaxLength(50)
  @MinLength(2)
  firstname?: string;

  @Field({ nullable: true })
  @MaxLength(50)
  @MinLength(2)
  lastname?: string;

  @Field({ nullable: true })
  @MaxLength(65)
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
    message: "password too weak",
  })
  password?: string;

  @Field({ nullable: true })
  @MaxLength(2083)
  @IsUrl()
  picture?: string;

  @Field({ nullable: true })
  @MaxLength(20)
  role?: string;
}

@InputType()
export class UserLogin {
  @Field()
  @Column({ length: 65, type: "varchar" })
  email: string;

  @Field()
  @Column({ length: 255, type: "varchar" })
  password: string;
}

@InputType()
export class UserRoleUpdate {
  @Field()
  @MaxLength(20)
  role?: string;
}

@InputType()
export class UserManagedCityUpdate {
  @Field(() => [Number])
  managedCitiesId: number[];
}

export default User;
