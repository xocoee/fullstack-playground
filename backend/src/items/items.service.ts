import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  name: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  create(item: Item) {
    this.items.push(item);
    return item;
  }
}
