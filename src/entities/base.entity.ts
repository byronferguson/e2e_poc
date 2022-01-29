import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  // @Column({
  //   nullable: true,
  //   comment: 'Account ID responsible for creating record',
  // })
  // createdById: number;

  // @Column({
  //   nullable: true,
  //   comment: 'Account ID responsible for updating record',
  // })
  // updatedById: number;

  @Exclude({
    toClassOnly: true,
  })
  @CreateDateColumn()
  createdAt?: Date;

  @Exclude({
    toClassOnly: true,
  })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}
