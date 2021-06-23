import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column('uuid')
  boardId: string;

  @Column({ type: 'json', nullable: true })
  columnId: string;
}
