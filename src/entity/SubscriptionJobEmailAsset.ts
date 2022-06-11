/**
 * SubscriptionJobEmailAsset Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionJobEmail from './SubscriptionJobEmail';

/**
 * SubscriptionJobEmailAsset Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job_email_asset' })
class SubscriptionJobEmailAsset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionJobEmailId: string;

  @Column()
  assetUrl: string;

  @ManyToOne(
    () => SubscriptionJobEmail,
    (subscriptionJobEmail) => subscriptionJobEmail.subscriptionJob,
  )
  @JoinColumn()
  subscriptionJobEmails: SubscriptionJobEmail;
}

export default SubscriptionJobEmailAsset;
