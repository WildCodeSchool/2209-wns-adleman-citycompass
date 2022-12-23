import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ObjectType, InputType } from "type-graphql";
import Place from "./Place";

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

	@OneToMany(() => Place, (place) => place.category)
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
