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
import * as fs from 'fs';
import * as path from 'path';

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
    @Body() body: { name: string; price: number },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let photoUrl: string | undefined;

    if (file && file.buffer) {
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, file.buffer); // ✅ тут Buffer, не undefined
      photoUrl = `http://localhost:3000/uploads/${fileName}`;
    }

    return this.fishService.create({
      name: body.name,
      price: Number(body.price),
      photo_url: photoUrl, // undefined якщо фото немає
    });
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
