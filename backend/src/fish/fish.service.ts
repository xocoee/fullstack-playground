import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fish } from './entities/fish.entity';

@Injectable()
export class FishService {
  constructor(
    @InjectRepository(Fish)
    private fishRepo: Repository<Fish>,
  ) {}

  findAll() {
    return this.fishRepo.find();
  }

  findOne(id: number) {
    return this.fishRepo.findOneBy({ id });
  }

  create(data: Partial<Fish>) {
    const fish = this.fishRepo.create(data);
    return this.fishRepo.save(fish);
  }

  update(id: number, data: Partial<Fish>) {
    return this.fishRepo.update(id, data);
  }

  remove(id: number) {
    return this.fishRepo.delete(id);
  }
}
