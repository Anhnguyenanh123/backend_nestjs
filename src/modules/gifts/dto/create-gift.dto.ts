import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGiftDto {
  @ApiProperty({ example: 'T-Shirt' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Cool cotton T-shirt' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://image.url/shirt.jpg' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
