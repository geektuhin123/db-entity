/**
 * SubscriptionJobEvent Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionJob from './SubscriptionJob';

/**
 * SubscriptionJobEvent Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job_event' })
class SubscriptionJobEvent extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionJobId: string;

  @Column()
  eventCode: string;

  @Column()
  eventValue: string;

  @ManyToOne(() => SubscriptionJob, (subscriptionJob) => subscriptionJob.subscriptionJobEvents)
  @JoinColumn()
  subscriptionJob: SubscriptionJob;
}

export default SubscriptionJobEvent;
