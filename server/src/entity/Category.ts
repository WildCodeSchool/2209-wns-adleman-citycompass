import { Field, ObjectType, InputType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

@InputType()
export class CategoryInput {
	@Field()
	name: string;

	@Field()
	picto: string;
}

export default Category;
