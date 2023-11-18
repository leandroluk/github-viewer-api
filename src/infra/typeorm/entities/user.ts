import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '#/domain';
import { FullText } from '../decorators';

@FullText<IUser>('email')
@Entity('user')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'removed_at', nullable: true })
  removedAt: Date | null;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'text' })
  password: string;
}
