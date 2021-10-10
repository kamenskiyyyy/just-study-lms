import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { HomeworkEntity } from '../homework/homework.entity';

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: false })
  block: boolean;

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  type: 'choiceFromList' | 'writeWord';

  @Column('json', { default: [], nullable: false })
  body: Array<{}>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => HomeworkEntity, (homework) => homework.tasks, {
    eager: true,
  })
  homework: HomeworkEntity;

  @ManyToOne(() => UserEntity, (user) => user.usersToTasks, { eager: true })
  student: UserEntity;
}
