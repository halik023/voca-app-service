import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Account } from './account.entity';
import { Course } from './course.entity';
import { Follower } from './follower.entity';
import { RegisteredCourse } from './registeredCourse.entity';
import { VocaSetting } from './vocaSetting.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  date_of_birth: Date;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => Course, (course) => course.author)
  courses: Course[];

  @OneToMany(() => Follower, (follower) => follower.following)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.follower)
  followings: Follower[];

  @OneToMany(
    () => RegisteredCourse,
    (registeredCourse) => registeredCourse.user,
  )
  registered_courses: RegisteredCourse[];

  @OneToMany(() => VocaSetting, (vocaSetting) => vocaSetting.user)
  voca_settings: VocaSetting[];
}
