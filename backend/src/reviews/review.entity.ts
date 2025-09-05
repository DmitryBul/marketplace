import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';

@Entity('reviews')
@Unique(['product', 'user'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}