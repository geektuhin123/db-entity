/**
 * SubscriptionJob Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import Subscription from './Subscription';
import SubscriptionJobDestination from './SubscriptionJobDestination';
import SubscriptionJobEmail from './SubscriptionJobEmail';
import SubscriptionJobEvent from './SubscriptionJobEvent';
import Tenant from './Tenant';
import User from './User';

/**
 * SubscriptionJob Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job' })
class SubscriptionJob extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  jobId: string;

  @Column()
  initiatorJobId: string;

  @Column()
  subscriptionId: string;

  @Column()
  tenantId: string;

  @Column()
  scheduledTime: number;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  errorCode: string;

  @Column()
  jobMeta: string;

  @Column()
  jobType: number;

  @ManyToOne(() => User, (user) => user.subscriptionJobs)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.subscriptionJobs)
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(
    () => SubscriptionJobEmail,
    (subscriptionJobEmail) => subscriptionJobEmail.subscriptionJob,
    { cascade: true },
  )
  subscriptionJobEmails: SubscriptionJobEmail[];

  @OneToMany(
    () => SubscriptionJobDestination,
    (subscriptionJobDestination) => subscriptionJobDestination.subscriptionJob,
    { cascade: true },
  )
  subscriptionJobDestinations: SubscriptionJobDestination[];

  @OneToMany(
    () => SubscriptionJobEvent,
    (subscriptionJobEvents) => subscriptionJobEvents.subscriptionJob,
    { cascade: true },
  )
  subscriptionJobEvents: SubscriptionJobEvent[];

  @ManyToOne(() => Tenant, (tenant) => tenant.subscriptionJobs)
  @JoinColumn()
  tenant: Tenant;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.jobMeta = this.jobMeta ? JSON.stringify(this.jobMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.jobMeta = this.jobMeta ? JSON.parse(this.jobMeta) : {};
  }
}

export default SubscriptionJob;
