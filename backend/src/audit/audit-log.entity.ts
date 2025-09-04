import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Organization } from 'src/organizations/organization.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.logs, { nullable: true })
  user: User;

  @ManyToOne(() => Organization, (org) => org.logs, { nullable: true })
  organization: Organization;

  @Column()
  action: string; // PRODUCT_CREATE, ORDER_STATUS_CHANGE

  @Column({ nullable: true })
  entity: string; // products/orders/...

  @Column({ nullable: true })
  entity_id: number;

  @Column({ type: 'json', nullable: true })
  payload: any;

  @CreateDateColumn()
  created_at: Date;
}