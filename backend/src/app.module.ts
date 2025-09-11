import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Organization } from './organizations/organization.entity';
import { Product } from './products/product.entity';
import { ProductImage } from './products/product-image.entity';
import { Category } from './categories/category.entity';
import { Cart } from './carts/cart.entity';
import { CartItem } from './carts/cart-item.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { Payment } from './payments/payment.entity';
import { Review } from './reviews/review.entity';
import { AuditLog } from './audit/audit-log.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: 5432,
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [
          User,
          Organization,
          Product,
          ProductImage,
          Category,
          Cart,
          CartItem,
          Order,
          OrderItem,
          Payment,
          Review,
          AuditLog,
        ],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Organization,
      Product,
      ProductImage,
      Category,
      Cart,
      CartItem,
      Order,
      OrderItem,
      Payment,
      Review,
      AuditLog,
    ]),
    UsersModule,
  ],
})
export class AppModule {}
