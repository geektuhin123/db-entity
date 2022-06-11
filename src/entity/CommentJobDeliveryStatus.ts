/**
 * CommentJobDeliveryStatus Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import CommentJob from './CommentJob';

/**
 * CommentJobDeliveryStatus Table
 * @extends BaseTable
 */
@Entity({ name: 'comment_job_delivery_status' })
class CommentJobDeliveryStatus extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  commentJobId: string;

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

  @ManyToOne(() => CommentJob, (commentJob) => commentJob.commentJobDeliveryStatus)
  @JoinColumn()
  commentJob: CommentJob;

  static skipTenant = true;
}
export default CommentJobDeliveryStatus;
