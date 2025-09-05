import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Organization } from 'src/organizations/organization.entity';
import { Cart } from 'src/carts/cart.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from 'src/payments/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Organization, (org) => org.orders)
  organization: Organization;

  @ManyToOne(() => Cart, { onDelete: 'SET NULL' })
  cart: Cart;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pending' })
  payment_status: string; // pending | paid | refunded | failed

  @Column({ default: 'pending' })
  delivery_status: string; // pending | processing | delivering | delivered | cancelled

  @Column({ nullable: true })
  shipping_full_name: string;

  @Column({ nullable: true })
  shipping_phone: string;

  @Column({ nullable: true })
  shipping_address_line1: string;

  @Column({ nullable: true })
  shipping_address_line2: string;

  @Column({ nullable: true })
  shipping_city: string;

  @Column({ nullable: true })
  shipping_postcode: string;

  @Column({ nullable: true })
  shipping_country: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItem, (oi) => oi.order)
  items: OrderItem[];

  @OneToMany(() => Payment, (p) => p.order)
  payments: Payment[];
}