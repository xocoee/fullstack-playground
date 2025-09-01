import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { Fish } from './entities/fish.entity';

@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get()
  getAll(): Promise<Fish[]> {
    return this.fishService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Fish | null> {
    return this.fishService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Fish>): Promise<Fish> {
    return this.fishService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Fish>) {
    return this.fishService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fishService.remove(id);
  }
}
