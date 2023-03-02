import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType, InputType } from "type-graphql";
import Place from "./Place";

@ObjectType()
@Entity()
class Category {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 50, type: "varchar" })
  name: string;

  @Field()
  @Column({ length: 2083, type: "varchar" })
  picto: string;

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.category, {
    onDelete: "CASCADE"
  })
  places?: Place[];
}

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field()
  picto: string;
}

export default Category;
