/**
 * SubscriptionMailList Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import Subscription from './Subscription';
import MailList from './MailList';
import SubscriptionMailListOption from './SubscriptionMailListOption';

/**
 * SubscriptionMailList Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_mail_list' })
class SubscriptionMailList extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionId: string;

  @Column()
  mailListId: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.subscriptionMailLists)
  @JoinColumn()
  subscription: Subscription;

  @ManyToOne(() => MailList, (mailList) => mailList.subscriptionMailLists)
  @JoinColumn()
  mailList: MailList;

  @OneToMany(
    () => SubscriptionMailListOption,
    (subscriptionMailListOption) => subscriptionMailListOption.subscriptionMailLists,
  )
  subscriptionMailListOptions: SubscriptionMailListOption[];
}

export default SubscriptionMailList;
