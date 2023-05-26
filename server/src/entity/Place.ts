import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";
import City from "./City";
import Category from "./Category";

@Entity()
@ObjectType()
class Place {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ length: 12, type: "varchar" })
  latitude: string;

  @Field()
  @Column({ length: 13, type: "varchar" })
  longitude: string;

  @Field()
  @Column({ length: 255, type: "varchar" })
  adress: string;

  @Field({ nullable: true })
  @Column({ length: 2083, type: "varchar" })
  website?: string;

  @Field()
  @Column({ length: 2083, type: "varchar" })
  picture: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column()
  cityId: number;

  @Field(() => City)
  @ManyToOne(() => City, (city) => city.places, { onDelete: "CASCADE" })
  city: City;

  @Field()
  @Column()
  categoryId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.places, {
    onDelete: "CASCADE",
  })
  category: Category;

  // to do : add a many to one relation with user, and name the property "author"
  // a contributor can modify a place only if he is the author (but city admin can modify them all)
}

@InputType()
export class PlaceInput {
  @Field()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @Field()
  @MaxLength(12)
  @MinLength(1)
  latitude: string;

  @Field()
  @MaxLength(13)
  @MinLength(1)
  longitude: string;

  @Field()
  @MaxLength(255)
  @MinLength(10)
  adress: string;

  @Field({ nullable: true })
  @MaxLength(2083)
  website?: string;

  @Field()
  @MaxLength(2083)
  @MinLength(21)
  picture: string;

  @Field()
  @MinLength(10)
  description: string;

  @Field()
  cityId: number;

  @Field()
  categoryId: number;
}

export default Place;
