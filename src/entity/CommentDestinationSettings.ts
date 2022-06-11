/**
 * CommentDestinationSettings Table
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import CommentVisualDestination from './CommentVisualDestination';

/**
 * CommentDestinationSettings Table
 * @extends BaseTable
 */
@Entity({ name: 'comment_destination_settings' })
class CommentDestinationSettings extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  settings: string;

  @OneToMany(
    () => CommentVisualDestination,
    (commentVisualDestination) => commentVisualDestination.commentDestinationSettings,
    {
      cascade: true,
    },
  )
  commentVisualDestinations: CommentVisualDestination[];

  static skipTenant = true;
}
export default CommentDestinationSettings;
