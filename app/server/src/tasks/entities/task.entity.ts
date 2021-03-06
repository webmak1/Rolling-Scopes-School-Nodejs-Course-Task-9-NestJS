import { BoardEntity } from 'boards/entities/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'users/entities/user.entity';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: BoardEntity;

  @Column('uuid')
  // @Column({ type: 'uuid', nullable: true })
  boardId: string;

  @Column({ type: 'json', nullable: true })
  columnId: string;
}
