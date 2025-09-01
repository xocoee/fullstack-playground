import { Module } from '@nestjs/common';
import { FishService } from './fish.service';
import { FishController } from './fish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fish } from './entities/fish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fish])],
  controllers: [FishController],
  providers: [FishService],
})
export class FishModule {}
