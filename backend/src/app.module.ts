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
      host: 'localhost',
      port: 5432,
      username: 'postgres', // 👈 твій користувач
      password: '', // 👈 твій пароль
      database: 'postgres', // або mydb, якщо хочеш працювати там
      autoLoadEntities: true,
      synchronize: true, // 👈 тільки для навчання (сам створить таблиці)
    }),
    ItemsModule,
    FishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
