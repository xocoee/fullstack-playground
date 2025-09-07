import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { Fish } from './entities/fish.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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
  @UseInterceptors(FileInterceptor('photo', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Partial<Fish>,
  ): Promise<Fish> {
    const fish = new Fish();
    fish.name = body.name || '';
    fish.price = Number(body.price);
    if (file) {
      fish.photo = file.buffer; // саме Buffer для bytea
    }
    return this.fishService.create(fish);
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
