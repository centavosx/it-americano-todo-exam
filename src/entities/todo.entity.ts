import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: true })
  description: string | null;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted: Date;
}
