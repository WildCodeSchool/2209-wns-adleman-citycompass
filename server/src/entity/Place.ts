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

  @ManyToOne(() => City, (city) => city.places)
  city: City;

  @Field()
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.places)
  category: Category;
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
