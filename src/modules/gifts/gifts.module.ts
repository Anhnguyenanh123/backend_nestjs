import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from './entities/gift.entity';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gift])],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
