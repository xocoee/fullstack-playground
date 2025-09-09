import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fishes')
export class Fish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('numeric', { precision: 5, scale: 2 })
  price: number;

  @Column({ nullable: true })
  photo_url: string;
}
