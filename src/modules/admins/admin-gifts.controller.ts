import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAdminGuard } from '../../common/guards/jwt-admin.guard';
import { GiftsService } from '../gifts/gifts.service';
import { CreateGiftDto } from '../gifts/dto/create-gift.dto';
import { UpdateGiftDto } from '../gifts/dto/update-gift.dto';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin - Gifts')
@ApiBearerAuth('admin-auth')
@Controller('admin/gifts')
@UseGuards(JwtAdminGuard)
export class AdminGiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @ApiOperation({ summary: 'List all gifts (admin only)' })
  findAll() {
    return this.giftsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new gift' })
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a gift' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGiftDto: UpdateGiftDto,
  ) {
    return this.giftsService.update(id, updateGiftDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a gift' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.giftsService.remove(id);
  }
}
