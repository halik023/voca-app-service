import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { RegisteredCourse } from './registeredCourse.entity';

@Entity('exams')
export class Exam extends BaseEntity {
  @Column({ default: 0 })
  score: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(
    () => RegisteredCourse,
    (registeredCourse) => registeredCourse.exams,
  )
  @JoinColumn({ name: 'register_course_id' })
  register_course: RegisteredCourse;
}
