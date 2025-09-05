import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_items, { onDelete: 'SET NULL' })
  product: Product;

  @Column()
  product_name: string; // snapshot

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // snapshot

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}