/**
 * Subscription Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionMailList from './SubscriptionMailList';
import SubscriptionJob from './SubscriptionJob';
import SubscriptionEmail from './SubscriptionEmail';
import User from './User';
import EntityStorageDestination from './EntityStorageDestination';
import { decrypt } from '../utilities/cipher';
import Report from './Report';

/**
 * Subscription Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription' })
class Subscription extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  subscriptionType: number;

  @Column()
  reportType: number;

  @Column()
  reportIdentifier: string;

  @Column()
  reportUrl: string;

  @Column()
  reportDisplayName: string;

  @Column()
  workspaceName: string;

  @Column()
  reportName: string;

  @Column('text')
  reportAdditionalSetting: string;

  @Column()
  reportAssetId: string;

  @Column()
  frequency: string;

  @Column()
  timeZone: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  emailSubject: string;

  @Column()
  emailBody: string;

  @Column()
  lastJobStatus: number;

  @Column()
  tenantId: string;

  @Column()
  nameCounter: number;

  @ManyToOne(() => Report, (report) => report.subscriptions)
  @JoinColumn({ name: 'reportAssetId' })
  report: Report;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @OneToMany(
    () => SubscriptionMailList,
    (subscriptionMailList) => subscriptionMailList.subscription,
    { cascade: true },
  )
  subscriptionMailLists: SubscriptionMailList[];

  @OneToMany(
    () => EntityStorageDestination,
    (subscriptionStorageDestination) => subscriptionStorageDestination.subscription,
    { cascade: true },
  )
  subscriptionStorageDestinations: EntityStorageDestination[];

  @OneToMany(() => SubscriptionJob, (subscriptionJob) => subscriptionJob.subscription, {
    cascade: true,
  })
  subscriptionJobs: SubscriptionJob[];

  @OneToMany(() => SubscriptionEmail, (subscriptionEmail) => subscriptionEmail.subscription, {
    cascade: true,
  })
  subscriptionEmails: SubscriptionEmail[];

  /**
   * Function hook that executes after loading the data into the object
   * Will decrypt the accessTokens
   */
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  decryptReportDetails() {
    if (this.reportAdditionalSetting && this.reportAdditionalSetting !== '') {
      // logger.info(`decrypting reportAdditionalSetting using createdAt: ${this.createdAt}`);
      this.reportAdditionalSetting = decrypt(
        this.reportAdditionalSetting,
        this.createdAt.toString(),
      );
    }
  }
}

export default Subscription;
