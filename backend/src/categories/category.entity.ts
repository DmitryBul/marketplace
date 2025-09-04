import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { Product } from 'src/products/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (org) => org.categories)
  organization: Organization;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}