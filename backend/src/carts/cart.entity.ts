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
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Organization, (org) => org.carts)
  organization: Organization;

  @Column({ default: 'active' })
  status: string; // active | ordered | abandoned

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CartItem, (ci) => ci.cart)
  items: CartItem[];
}