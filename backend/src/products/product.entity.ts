import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { Category } from 'src/categories/category.entity';
import { ProductImage } from './product-image.entity';
import { CartItem } from 'src/carts/cart-item.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { Review } from 'src/reviews/review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (org) => org.products)
  organization: Organization;

  @ManyToOne(() => Category, (cat) => cat.products, { nullable: true })
  category: Category;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ProductImage, (img) => img.product)
  images: ProductImage[];

  @OneToMany(() => CartItem, (ci) => ci.product)
  cart_items: CartItem[];

  @OneToMany(() => OrderItem, (oi) => oi.product)
  order_items: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}