/**
 * SubscriptionJobEmail Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionJob from './SubscriptionJob';
import SubscriptionJobEmailAsset from './SubscriptionJobEmailAsset';

/**
 * SubscriptionJobEmail Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job_email' })
class SubscriptionJobEmail extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionJobId: string;

  @Column()
  emailAddress: string;

  @Column()
  emailSubject: string;

  @Column()
  emailBody: string;

  @Column()
  errorCode: string;

  @Column()
  messageId: string;

  @Column()
  reportUrlFilter: string;

  @ManyToOne(() => SubscriptionJob, (subscriptionJob) => subscriptionJob.subscriptionJobEmails)
  @JoinColumn()
  subscriptionJob: SubscriptionJob;

  @OneToMany(
    () => SubscriptionJobEmailAsset,
    (subscriptionJobEmailAsset) => subscriptionJobEmailAsset.subscriptionJobEmails,
    { cascade: true },
  )
  subscriptionJobEmailAsset: SubscriptionJobEmailAsset[];

  static skipTenant = true;
}

export default SubscriptionJobEmail;
