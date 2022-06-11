/**
 * SubscriptionEmailOption Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionEmail from './SubscriptionEmail';

/**
 * SubscriptionEmailOption Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_email_option' })
class SubscriptionEmailOption extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionEmailId: string;

  @Column()
  optionName: string;

  @Column()
  optionValue: string;

  @ManyToOne(
    () => SubscriptionEmail,
    (subscriptionEmail) => subscriptionEmail.subscriptionEmailOptions,
  )
  @JoinColumn()
  subscriptionEmails: SubscriptionEmail;
}

export default SubscriptionEmailOption;
