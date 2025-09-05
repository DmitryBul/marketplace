import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Category } from 'src/categories/category.entity';
import { Product } from 'src/products/product.entity';
import { Cart } from 'src/carts/cart.entity';
import { Order } from 'src/orders/order.entity';
import { AuditLog } from 'src/audit/audit-log.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => Category, (cat) => cat.organization)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.organization)
  products: Product[];

  @OneToMany(() => Cart, (cart) => cart.organization)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.organization)
  orders: Order[];

  @OneToMany(() => AuditLog, (log) => log.organization)
  logs: AuditLog[];
}
