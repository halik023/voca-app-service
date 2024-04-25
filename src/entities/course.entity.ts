import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { RegisteredCourse } from './registeredCourse.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true })
  is_audio_quiz: boolean;

  @Column({ default: true })
  is_en_quiz_mode: boolean;

  @Column({ nullable: true })
  thumnail: string;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(
    () => RegisteredCourse,
    (registeredCourse) => registeredCourse.course,
  )
  registered_courses: RegisteredCourse[];
}
