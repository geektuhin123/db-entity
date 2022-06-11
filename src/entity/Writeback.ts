/**
 * Writeback Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import BaseTable from './BaseTable';
import Visual from './Visual';
import User from './User';
import SubscriptionJobDestination from './SubscriptionJobDestination';
import WritebackJobEvent from './WritebackJobEvent';
import { decrypt } from '../utilities/cipher';
import { decompress } from '../utilities/compression';

/**
 * Comment Table
 * @extends BaseTable
 */
@Entity({ name: 'writeback' })
class Writeback extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  visualId: number;

  @Column()
  writebackMeta: string;

  @Column()
  environment: string;

  @Column()
  executionId: string;

  @Column()
  webhookMeta: string;

  @Column()
  jobMeta: string;

  @Column()
  type: number;

  @Column()
  errorCode: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Visual, (visual) => visual.comments)
  @JoinColumn()
  visual: Visual;

  @OneToMany(
    () => SubscriptionJobDestination,
    (subscriptionJobDestination) => subscriptionJobDestination.writeback,
    {
      cascade: true,
    },
  )
  subscriptionJobDestination: SubscriptionJobDestination[];

  @OneToMany(() => WritebackJobEvent, (writebackJobEvents) => writebackJobEvents.writeback, {
    cascade: true,
  })
  writebackJobEvents: WritebackJobEvent[];

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.writebackMeta = this.writebackMeta ? JSON.stringify(this.writebackMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.writebackMeta = this.writebackMeta ? JSON.parse(this.writebackMeta) : {};
    this.jobMeta = this.jobMeta
      ? JSON.parse(
          decompress(decrypt(this.jobMeta, this.createdAt.toString()), {
            inputEncoding: 'Base64',
          }),
        )
      : {};
  }

  static skipTenant = true;
}
export default Writeback;
