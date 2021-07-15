import { TaskEntity } from 'tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json', array: false })
  columns: Array<{ title: string; order: number }>;

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks: TaskEntity[];
}
