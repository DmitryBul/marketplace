import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { Cart } from 'src/carts/cart.entity';
import { Order } from 'src/orders/order.entity';
import { Review } from 'src/reviews/review.entity';
import { AuditLog } from 'src/audit/audit-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (org) => org.users, { nullable: true })
  organization: Organization;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'customer' })
  role: string; // customer | manager | admin

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => AuditLog, (log) => log.user)
  logs: AuditLog[];
}
