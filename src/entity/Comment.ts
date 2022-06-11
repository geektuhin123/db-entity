/**
 * Comment Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import BaseTable from './BaseTable';
import CommentDeliveryStatus from './CommentDeliveryStatus';
import Visual from './Visual';
import User from './User';
import { decrypt } from '../utilities/cipher';

/**
 * Comment Table
 * @extends BaseTable
 */
@Entity({ name: 'comment' })
class Comment extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  comment: string;

  @Column()
  commentGuid: string;

  @Column()
  parentCommentGuid: string;

  @Column()
  visualId: string;

  @Column()
  childCount: number;

  @Column('text')
  commentMeta: string;

  @Column('text')
  threadStatus: string;

  @Column('text')
  threadAssignee: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @OneToMany(
    () => CommentDeliveryStatus,
    (commentDeliveryStatus) => commentDeliveryStatus.comment,
    {
      cascade: true,
    },
  )
  commentDeliveryStatus: CommentDeliveryStatus[];

  @ManyToOne(() => Visual, (visual) => visual.comments)
  @JoinColumn()
  visual: Visual;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.commentMeta =
      this.commentMeta && JSON.parse(decrypt(this.commentMeta, this.createdAt.toString()));
    if (this.comment && this.comment !== '') {
      this.comment = decrypt(this.comment, this.createdAt.toString());
    }
  }

  static skipTenant = true;
}
export default Comment;
