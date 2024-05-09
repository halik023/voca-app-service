import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import * as bcrypt from 'bcrypt';
import { Course } from './course.entity';
import { Follower } from './follower.entity';
import { RegisteredCourse } from './registeredCourse.entity';
import { VocaSetting } from './vocaSetting.entity';
import { AccountType, Gender } from 'src/common/enum';
import { generateUsername } from 'unique-username-generator';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  type: AccountType;

  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  avatar: string;

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

  @OneToOne(() => VocaSetting, (vocaSetting) => vocaSetting.user)
  voca_setting: VocaSetting;

  private oldPassword: string;

  private generateUsername(): void {
    this.username = generateUsername('', 0, 12);
  }

  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.oldPassword = this.password;
  }

  @BeforeInsert()
  async beforeInsert() {
    this.generateUsername();
    if (!this.password) return;
    await this.hashPassword();
  }

  @BeforeUpdate()
  async encryptPassword() {
    if (this.oldPassword === this.password) return;
    await this.hashPassword();
  }
}
