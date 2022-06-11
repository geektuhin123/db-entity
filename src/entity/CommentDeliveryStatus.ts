/**
 * CommentDeliveryStatus Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import Comment from './Comment';

/**
 * CommentDeliveryStatus Table
 * @extends BaseTable
 */
@Entity({ name: 'comment_delivery_status' })
class CommentDeliveryStatus extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  commentId: string;

  @Column('text')
  destination: string;

  @Column()
  visualDestinationId: string;

  @Column('text')
  subject: string;

  @Column('text')
  message: string;

  @Column()
  messageId: string;

  @Column()
  errorCode: string;

  @ManyToOne(() => Comment, (comment) => comment.commentDeliveryStatus)
  @JoinColumn()
  comment: Comment;

  static skipTenant = true;
}
export default CommentDeliveryStatus;
