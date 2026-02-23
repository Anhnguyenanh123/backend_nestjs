import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtUserGuard } from '../../common/guards/jwt-user.guard';
import { GiftsService } from './gifts.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gifts')
@ApiBearerAuth('user-auth')
@Controller('gifts')
@UseGuards(JwtUserGuard)
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @ApiOperation({ summary: 'List all active gifts' })
  findAll() {
    return this.giftsService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of an active gift' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.findActiveById(id);
  }
}
