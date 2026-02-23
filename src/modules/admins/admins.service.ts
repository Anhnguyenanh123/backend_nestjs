import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  async findById(id: string): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return admin;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.findOne({ where: { email } });
  }
}
