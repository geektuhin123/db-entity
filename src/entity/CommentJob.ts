/**
 * CommentJob Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import BaseTable from './BaseTable';
import CommentJobDeliveryStatus from './CommentJobDeliveryStatus';
import User from './User';
import Visual from './Visual';

/**
 * CommentJob Table
 * @extends BaseTable
 */
@Entity({ name: 'comment_job' })
class CommentJob extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  jobId: string;

  @Column()
  visualId: string;

  @Column()
  scheduledTime: number;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  errorCode: string;

  @Column()
  jobMeta: string;

  @Column()
  jobType: number;

  @ManyToOne(() => User, (user) => user.commentJobs)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @OneToMany(
    () => CommentJobDeliveryStatus,
    (commentJobDeliveryStatus) => commentJobDeliveryStatus.commentJob,
    {
      cascade: true,
    },
  )
  commentJobDeliveryStatus: CommentJobDeliveryStatus[];

  @ManyToOne(() => Visual, (visual) => visual.commentJobs)
  @JoinColumn()
  visual: Visual;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.jobMeta = this.jobMeta ? JSON.stringify(this.jobMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.jobMeta = this.jobMeta ? JSON.parse(this.jobMeta) : {};
  }

  static skipTenant = true;
}
export default CommentJob;
