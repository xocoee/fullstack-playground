import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fishes')
export class Fish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, nullable: true })
  color: string;

  @Column({ length: 50, nullable: true })
  size: string;
}
