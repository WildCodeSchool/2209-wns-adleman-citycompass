import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, InputType } from "type-graphql";
import Place from "./Place";
import { IsNotEmpty, IsUrl, MinLength, Validate } from "class-validator";
import { IsNotOnlySpaces } from "../helpers/customValidators";

@ObjectType()
@Entity()
class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50, type: "varchar" })
  name: string;

  @Field()
  @Column({ length: 2083, type: "varchar" })
  picto: string;

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.category)
  places?: Place[];
}

@InputType()
export class CategoryInput {
  @Field()
  @MinLength(2, {
    message: "A category name must be at least 2 characters long",
  })
  @IsNotEmpty({ message: "A category name cannot be empty" })
  // custom validator
  @Validate(IsNotOnlySpaces)
  name: string;

  @Field()
  @IsUrl({ message: "A category picto must be an url" })
  picto: string;
}

export default Category;
