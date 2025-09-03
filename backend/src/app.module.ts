import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { FishModule } from './fish/fish.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.31.106',
      port: 5432,
      username: 'postgres',
      password: '5885',
      database: 'fishStore', 
      autoLoadEntities: true,
      synchronize: false,
    }),
    ItemsModule,
    FishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
