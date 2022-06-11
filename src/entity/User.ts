/**
 * User Table
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import UserAuthentication from './UserAuthentication';
import TenantUser from './TenantUser';
import Subscription from './Subscription';
import UserStorageSettings from './UserStorageSettings';
import VisualUserSettings from './VisualUserSettings';
import Comment from './Comment';
import Writeback from './Writeback';
import SubscriptionJob from './SubscriptionJob';
import VisualVersion from './VisualVersion';
import VisualVersionToken from './VisualVersionToken';
import CommentJob from './CommentJob';
import Visual from './Visual';
import TenantTheme from './TenantTheme';
import Asset from './Asset';
import Dataset from './Dataset';
import CustomColumn from './CustomColumn';
import CustomColumnValue from './CustomColumnValue';
import Audit from './Audit';
import AuditActivity from './AuditActivity';
import WritebackConnections from './WritebackConnections';
import WritebackUserConnectionHistory from './WritebackUserConnectionHistory';
/**
 * User Table
 * @extends BaseTable
 */
@Entity()
class User extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column('text')
  img: string;

  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.user, {
    cascade: true,
  })
  userAuthentications: UserAuthentication[];

  @OneToMany(() => TenantUser, (tenantUser) => tenantUser.user)
  tenantUsers: TenantUser[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Dataset, (asset) => asset.user)
  datasets: Dataset[];

  @OneToMany(() => SubscriptionJob, (subscriptionJob) => subscriptionJob.user)
  subscriptionJobs: SubscriptionJob[];

  @OneToMany(() => UserStorageSettings, (userStorageSettings) => userStorageSettings.user)
  userStorageSettings: UserStorageSettings[];

  @OneToMany(() => VisualUserSettings, (visualUserSettings) => visualUserSettings.user, {
    cascade: true,
  })
  visualUserSettings: VisualUserSettings[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => CommentJob, (comment) => comment.user, {
    cascade: true,
  })
  commentJobs: CommentJob[];

  @OneToMany(() => Writeback, (writeback) => writeback.user, {
    cascade: true,
  })
  writeback: Writeback[];

  @OneToMany(() => VisualVersion, (visualVersion) => visualVersion.user, {
    cascade: true,
  })
  versions: VisualVersion[];

  @OneToMany(() => VisualVersionToken, (visualVersion) => visualVersion.user, {
    cascade: true,
  })
  versionToken: VisualVersionToken[];

  @OneToMany(() => Visual, (visual) => visual.user)
  visual: Visual[];

  @OneToMany(() => TenantTheme, (theme) => theme.user)
  theme: Visual[];

  @OneToMany(() => CustomColumn, (column) => column.user, {
    cascade: true,
  })
  customColumns: CustomColumn[];

  @OneToMany(() => CustomColumnValue, (columnValue) => columnValue.user, {
    cascade: true,
  })
  customColumnValue: CustomColumnValue[];

  @OneToMany(() => Audit, (audit) => audit.user, {
    cascade: true,
  })
  audits: Audit[];

  @OneToMany(() => AuditActivity, (auditActivity) => auditActivity.activityUser, {
    cascade: true,
  })
  auditActivities: AuditActivity[];

  @OneToMany(() => WritebackConnections, (writebackConnection) => writebackConnection.user, {
    cascade: true,
  })
  writebackConnections: WritebackConnections[];

  @OneToMany(
    () => WritebackUserConnectionHistory,
    (writebackUserConnectionHistory) => writebackUserConnectionHistory.user,
    {
      cascade: true,
    },
  )
  writebackUserConnectionHistory: WritebackUserConnectionHistory[];

  static skipTenant = true;
}
export default User;
