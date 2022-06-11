/**
 * SubscriptionEmail Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import Subscription from './Subscription';
import SubscriptionEmailOption from './SubscriptionEmailOption';

/**
 * SubscriptionEmail Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_email' })
class SubscriptionEmail extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionId: string;

  @Column()
  emailAddress: string;

  @Column()
  subscribed: boolean;

  @Column()
  nonce: string;

  @Column()
  reportUrlFilter: string;

  @Column()
  emailType: number;

  @Column()
  unsubscribedAt: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.subscriptionEmails)
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(
    () => SubscriptionEmailOption,
    (subscriptionEmailOption) => subscriptionEmailOption.subscriptionEmails,
    { cascade: true },
  )
  subscriptionEmailOptions: SubscriptionEmailOption[];

  static skipTenant = true;
}

export default SubscriptionEmail;
