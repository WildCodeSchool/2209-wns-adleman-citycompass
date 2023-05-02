import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsEmail, IsUrl, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";
import City from "./City";

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
  managedCities?: City[];
}

@InputType()
export class UserInput {
  @Field()
  @MaxLength(50)
  @MinLength(2)
  firstname: string;

  @Field()
  @MaxLength(50)
  @MinLength(2)
  lastname: string;

  @Field()
  @MaxLength(65)
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @Field()
  @MaxLength(2083)
  @IsUrl()
  picture: string;
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

export default User;
