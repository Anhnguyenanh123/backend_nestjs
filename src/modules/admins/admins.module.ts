import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminGiftsController } from './admin-gifts.controller';
import { GiftsModule } from '../gifts/gifts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), GiftsModule],
  controllers: [AdminGiftsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
