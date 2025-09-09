import { Module } from '@nestjs/common';
import { FishService } from './fish.service';
import { FishController } from './fish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish } from './entities/fish.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fish]),
    MulterModule.register({
      dest: './uploads', // тут зберігатимуться фото риб
    }),
  ],
  controllers: [FishController],
  providers: [FishService],
})
export class FishModule {}
