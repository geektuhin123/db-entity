/**
 * CommentVisualDestination Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import BaseTable from './BaseTable';
import CommentDestinationSettings from './CommentDestinationSettings';
import Visual from './Visual';
import VisualMailList from './VisualMailList';

/**
 * CommentVisualDestination Table
 * @extends BaseTable
 */
@Entity({ name: 'comment_visual_destination' })
class CommentVisualDestination extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  visualId: string;

  @Column()
  destinationSettingsId: string;

  @Column()
  notificationType: number;

  @Column('text')
  webhookUrl: string;

  @Column('text')
  settings: string;

  @ManyToOne(
    () => CommentDestinationSettings,
    (commentDestinationSettings) => commentDestinationSettings.commentVisualDestinations,
  )
  @JoinColumn({ name: 'destinationSettingsId' })
  commentDestinationSettings: CommentDestinationSettings;

  @OneToMany(() => VisualMailList, (visualMailList) => visualMailList.commentVisualDestination, {
    cascade: true,
  })
  visualMailList: VisualMailList[];

  @ManyToOne(() => Visual, (visual) => visual.commentVisualDestinations)
  @JoinColumn()
  visual: Visual;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.settings = this.settings ? JSON.stringify(this.settings) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.settings = JSON.parse(this.settings);
  }

  static skipTenant = true;
}
export default CommentVisualDestination;
