/**
 * SubscriptionMailListOption Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionMailList from './SubscriptionMailList';
import Contact from './Contact';

/**
 * SubscriptionMailListOption Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_mail_list_option' })
class SubscriptionMailListOption extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  optionName: string;

  @Column()
  optionValue: string;

  @Column()
  subscriptionMailListId: string;

  @Column()
  contactId: string;

  @ManyToOne(
    () => SubscriptionMailList,
    (subscriptionMailList) => subscriptionMailList.subscriptionMailListOptions,
  )
  @JoinColumn()
  subscriptionMailLists: SubscriptionMailList;

  @ManyToOne(() => Contact, (contact) => contact.subscriptionMailListOptions)
  @JoinColumn()
  contacts: Contact;
}

export default SubscriptionMailListOption;
