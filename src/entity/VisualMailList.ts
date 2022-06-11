/**
 * VisualMailList Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import CommentVisualDestination from './CommentVisualDestination';

/**
 * VisualMailList Table
 * @extends BaseTable
 */
@Entity({ name: 'visual_mail_list' })
class VisualMailList extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  visualDestinationId: string;

  @Column()
  subscribed: boolean;

  @Column()
  nonce: string;

  @Column()
  unsubscribedAt: number;

  @ManyToOne(
    () => CommentVisualDestination,
    (commentVisualDestination) => commentVisualDestination.visualMailList,
  )
  @JoinColumn({ name: 'visualDestinationId' })
  commentVisualDestination: CommentVisualDestination;

  static skipTenant = true;
}
export default VisualMailList;
