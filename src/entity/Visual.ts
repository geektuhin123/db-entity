/**
 * Visual Table
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
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BaseTable from './BaseTable';
import CommentVisualDestination from './CommentVisualDestination';
import Comment from './Comment';
import Writeback from './Writeback';
import Tenant from './Tenant';
import CommentJob from './CommentJob';
import VisualVersion from './VisualVersion';
import VisualVersionToken from './VisualVersionToken';
import User from './User';
import Report from './Report';
import logger from '../config/logger';
import EntityStorageDestination from './EntityStorageDestination';
import CustomColumn from './CustomColumn';
import Audit from './Audit';
import WritebackUserConnectionHistory from './WritebackUserConnectionHistory';

/**
 * Visual Table
 * @extends BaseTable
 */
@Entity({ name: 'visual' })
class Visual extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  visualGuid: string;

  @Column()
  visualTemplateGuid: string;

  @Column()
  tenantId: string;

  @Column()
  allowComment: boolean;

  @Column()
  accessType: number;

  @Column()
  notification: boolean;

  @Column('text')
  reportIdentifier: string;

  @Column('text')
  reportUrl: string;

  @Column('text')
  reportSection: string;

  @Column('text')
  reportDisplayName: string;

  @Column('text')
  visualMeta: string;

  @Column('text')
  writebackMeta: string;

  @Column('text')
  usersAllowed: string;

  @Column()
  digest: boolean;

  @Column('text')
  schedule: string;

  @Column('text')
  writebackAllowedUsers: string;

  @Column()
  reportAssetId: string;

  @Column()
  scheduleStatus: number;

  @Column()
  collabVisualDestinationId: number;

  @ManyToOne(() => Report, (report) => report.visuals)
  @JoinColumn({ name: 'reportAssetId' })
  report: Report;

  @OneToMany(() => Audit, (audit) => audit.visual, { cascade: true })
  audits: Audit[];

  @OneToMany(
    () => EntityStorageDestination,
    (visualStorageDestination) => visualStorageDestination.visual,
    { cascade: true },
  )
  visualStorageDestinations: EntityStorageDestination[];

  @OneToMany(
    () => CommentVisualDestination,
    (commentVisualDestination) => commentVisualDestination.visual,
    {
      cascade: true,
    },
  )
  commentVisualDestinations: CommentVisualDestination[];

  @OneToMany(() => Comment, (comment) => comment.visual, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => Writeback, (writeback) => writeback.visual, {
    cascade: true,
  })
  writeback: Writeback[];

  @ManyToOne(() => Tenant, (tenant) => tenant.visual)
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(() => CommentJob, (commentJob) => commentJob.visual, {
    cascade: true,
  })
  commentJobs: CommentJob[];

  @OneToMany(() => VisualVersion, (visualVersion) => visualVersion.visual, {
    cascade: true,
  })
  visualVersions: VisualVersion[];

  @OneToMany(() => VisualVersionToken, (visualVersion) => visualVersion.visual, {
    cascade: true,
  })
  visualVersionToken: VisualVersion[];

  @OneToMany(
    () => WritebackUserConnectionHistory,
    (writebackUserConnectionHistory) => writebackUserConnectionHistory.visual,
    {
      cascade: true,
    },
  )
  writebackUserConnectionHistory: WritebackUserConnectionHistory[];

  @ManyToOne(() => User, (user) => user.visual)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => User, (user) => user.visual)
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @OneToMany(() => CustomColumn, (customColumn) => customColumn.visual, {
    cascade: true,
  })
  customColumn: CustomColumn[];

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    try {
      this.visualMeta = this.visualMeta ? JSON.stringify(this.visualMeta) : '{}';
      this.writebackMeta = this.writebackMeta ? JSON.stringify(this.writebackMeta) : '{}';
      this.usersAllowed = this.usersAllowed ? JSON.stringify(this.usersAllowed) : '{}';
      this.schedule = this.schedule ? JSON.stringify(this.schedule) : '{}';
      this.writebackAllowedUsers = this.writebackAllowedUsers
        ? JSON.stringify(this.writebackAllowedUsers)
        : '[]';
    } catch (error) {
      logger.log('error', `Visual > stringifyJson failed ${JSON.stringify(error)}`);
    }
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    try {
      this.visualMeta = this.visualMeta ? JSON.parse(this.visualMeta) : {};
      this.writebackMeta = this.writebackMeta ? JSON.parse(this.writebackMeta) : {};
      this.usersAllowed = this.usersAllowed ? JSON.parse(this.usersAllowed) : {};
      this.schedule = this.schedule ? JSON.parse(this.schedule) : {};
      this.writebackAllowedUsers = this.writebackAllowedUsers
        ? JSON.parse(this.writebackAllowedUsers)
        : {};
    } catch (error) {
      logger.log('error', `Visual > parseJson failed ${JSON.stringify(error)}`);
    }
  }

  static skipTenant = true;
}
export default Visual;
