import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Exam } from './exam.entity';
import { LearnedWord } from './learnedWord.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('registered_courses')
@Unique(['user', 'course'])
export class RegisteredCourse extends BaseEntity {
  @Column({ default: true })
  is_registered: string;

  @ManyToOne(() => User, (user) => user.registered_courses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.registered_courses)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Exam, (course) => course.register_course)
  exams: Exam[];

  @OneToMany(() => LearnedWord, (learnedWord) => learnedWord.register_course)
  learned_words: LearnedWord[];
}
