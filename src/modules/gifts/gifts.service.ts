import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftsRepository: Repository<Gift>,
  ) {}

  async findAllActive(): Promise<Gift[]> {
    return this.giftsRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<Gift[]> {
    return this.giftsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Gift> {
    const gift = await this.giftsRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException(`Gift with id ${id} not found`);
    }
    return gift;
  }

  async findActiveById(id: string): Promise<Gift> {
    const gift = await this.giftsRepository.findOne({
      where: { id, isActive: true },
    });
    if (!gift) {
      throw new NotFoundException(`Gift with id ${id} not found`);
    }
    return gift;
  }

  async create(createGiftDto: CreateGiftDto): Promise<Gift> {
    const gift = this.giftsRepository.create(createGiftDto);
    return this.giftsRepository.save(gift);
  }

  async update(id: string, updateGiftDto: UpdateGiftDto): Promise<Gift> {
    const gift = await this.findById(id);
    Object.assign(gift, updateGiftDto);
    return this.giftsRepository.save(gift);
  }

  async remove(id: string): Promise<void> {
    const gift = await this.findById(id);
    gift.isActive = false;
    await this.giftsRepository.save(gift);
  }
}
