import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { GiftsModule } from './modules/gifts/gifts.module';
import { UserAuthModule } from './modules/auth/user-auth/user-auth.module';
import { AdminAuthModule } from './modules/auth/admin-auth/admin-auth.module';
import { User } from './modules/users/entities/user.entity';
import { Admin } from './modules/admins/entities/admin.entity';
import { Gift } from './modules/gifts/entities/gift.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Admin, Gift],
        migrations: ['dist/database/migrations/*.js'],
        synchronize: false,
      }),
    }),
    UsersModule,
    AdminsModule,
    GiftsModule,
    UserAuthModule,
    AdminAuthModule,
  ],
})
export class AppModule {}
