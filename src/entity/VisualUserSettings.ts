/**
 * VisualUserSettings Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import User from './User';

/**
 * VisualUserSettings Token Table
 * @extends BaseTable
 */
@Entity({ name: 'visual_user_settings' })
class VisualUserSettings extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  visualId: string;

  @Column()
  userId: string;

  @Column()
  immediateNotification: boolean;

  @Column()
  nonce: string;

  @Column()
  unsubscribedAt: number;

  @Column('text')
  settings: string;

  @ManyToOne(() => User, (user) => user.visualUserSettings)
  @JoinColumn()
  user: User;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.settings = this.settings ? JSON.stringify(this.settings) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.settings = JSON.parse(this.settings);
  }

  static skipTenant = true;
}

export default VisualUserSettings;
