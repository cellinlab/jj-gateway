import { Entity, Column, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
