import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.repository.create(createItemDto);
    return this.repository.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.repository.find({
      order: { name: 'ASC' },
      where: { quantity: MoreThanOrEqual(0) },
    });
  }

  findOne(id: string): Promise<Item> {
    return this.repository.findOne(id);
  }

  /* async findOneBy(id: string): Promise<Item> {
    const item = await this.repository.findOneBy({ 
      id: id });

    if (!item) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return;
  }
  */

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.repository.preload({
      id: id,
      ...updateItemDto,
    });
    if (!item) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repository.remove(item);
  }
}
