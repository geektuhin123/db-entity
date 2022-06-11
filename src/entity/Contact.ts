/**
 * Contact Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import MailList from './MailList';
import SubscriptionMailListOption from './SubscriptionMailListOption';

/**
 * Contact Table
 * @extends BaseTable
 */
@Entity({ name: 'contact' })
class Contact extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  emailAddress: string;

  @Column()
  mailListId: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => MailList, (mailList) => mailList.contacts)
  @JoinColumn()
  mailList: MailList;

  @OneToMany(
    () => SubscriptionMailListOption,
    (subscriptionMailListOption) => subscriptionMailListOption.contacts,
    { cascade: true },
  )
  subscriptionMailListOptions: SubscriptionMailListOption[];
}

export default Contact;
