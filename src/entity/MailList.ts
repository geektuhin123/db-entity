/**
 * MailList Table
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import Contact from './Contact';
import SubscriptionMailList from './SubscriptionMailList';

/**
 * MailList Table
 * @extends BaseTable
 */
@Entity({ name: 'mail_list' })
class MailList extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tenantId: string;

  @OneToMany(() => Contact, (contact) => contact.mailList, { cascade: true })
  contacts: Contact[];

  @OneToMany(() => SubscriptionMailList, (subscriptionMailList) => subscriptionMailList.mailList, {
    cascade: true,
  })
  subscriptionMailLists: SubscriptionMailList[];
}

export default MailList;
