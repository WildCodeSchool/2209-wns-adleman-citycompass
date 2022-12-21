import { Field, ObjectType } from "type-graphql";
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

export default Category;
