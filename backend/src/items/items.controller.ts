import { Controller, Get, Post, Body } from '@nestjs/common';
import * as itemsService_1 from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: itemsService_1.ItemsService) {}

  @Get()
  getAllItems(): itemsService_1.Item[] {
    return this.itemsService.findAll();
  }

  @Post()
  createItem(@Body() item: itemsService_1.Item) {
    return this.itemsService.create(item);
  }
}
