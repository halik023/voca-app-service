import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/base.entity';
import { User } from './user.entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: User;

  private oldPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.oldPassword = this.password;
  }

  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeInsert()
  async beforeInsert() {
    if (!this.password) return;
    await this.hashPassword();
  }

  @BeforeUpdate()
  async encryptPassword() {
    if (this.oldPassword === this.password) return;
    await this.hashPassword();
  }

  async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
