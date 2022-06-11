import User from './User';
import Authentication from './Authentication';
import Role from './Role';
import Tenant from './Tenant';
import UserAuthentication from './UserAuthentication';
import TenantUser from './TenantUser';
import CertifiedLicenses from './CertifiedLicenses';
import Contact from './Contact';
import MailList from './MailList';
import Subscription from './Subscription';
import SubscriptionEmail from './SubscriptionEmail';
import SubscriptionEmailOption from './SubscriptionEmailOption';
import SubscriptionJob from './SubscriptionJob';
import SubscriptionJobEmail from './SubscriptionJobEmail';
import SubscriptionJobEmailAsset from './SubscriptionJobEmailAsset';
import SubscriptionJobEvent from './SubscriptionJobEvent';
import SubscriptionMailList from './SubscriptionMailList';
import SubscriptionMailListOption from './SubscriptionMailListOption';
import Visual from './Visual';
import VisualUserSettings from './VisualUserSettings';
import UserToken from './UserToken';
import VisualMailList from './VisualMailList';
import CommentDestinationSettings from './CommentDestinationSettings';
import CommentVisualDestination from './CommentVisualDestination';
import Comment from './Comment';
import CommentDeliveryStatus from './CommentDeliveryStatus';
import CommentJob from './CommentJob';
import CommentJobDeliveryStatus from './CommentJobDeliveryStatus';
import StorageSettings from './StorageSettings';
import UserStorageSettings from './UserStorageSettings';
import EntityStorageDestination from './EntityStorageDestination';
import SubscriptionJobDestination from './SubscriptionJobDestination';
import SubscriptionJobDestinationAsset from './SubscriptionJobDestinationAsset';
import Writeback from './Writeback';
import VisualVersion from './VisualVersion';
import VisualVersionToken from './VisualVersionToken';
import WritebackData from './WritebackData';
import TenantTheme from './TenantTheme';
import Dataset from './Dataset';
import DataSource from './DataSource';
import Report from './Report';
import DataSourceDataset from './DataSourceDataset';
import Asset from './Asset';
import TenantThemeAsset from './TenantThemeAsset';
import TenantSettings from './TenantSettings';
import CustomColumn from './CustomColumn';
import CustomColumnType from './CustomColumnType';
import CustomColumnValue from './CustomColumnValue';
import WritebackJobEvent from './WritebackJobEvent';
import Audit from './Audit';
import AuditLog from './AuditLog';
import AuditActivity from './AuditActivity';
import WritebackConnections from './WritebackConnections';
import WritebackUserConnectionHistory from './WritebackUserConnectionHistory';

const entities = [
  User,
  Authentication,
  Role,
  Tenant,
  UserAuthentication,
  TenantUser,
  CertifiedLicenses,
  Contact,
  MailList,
  Subscription,
  SubscriptionEmail,
  SubscriptionEmailOption,
  SubscriptionJob,
  SubscriptionJobEmail,
  SubscriptionJobEmailAsset,
  SubscriptionJobEvent,
  SubscriptionMailList,
  SubscriptionMailListOption,
  Visual,
  UserToken,
  VisualUserSettings,
  CommentDestinationSettings,
  CommentVisualDestination,
  VisualMailList,
  Comment,
  CommentDeliveryStatus,
  CommentJob,
  CommentJobDeliveryStatus,
  StorageSettings,
  UserStorageSettings,
  EntityStorageDestination,
  SubscriptionJobDestination,
  SubscriptionJobDestinationAsset,
  Writeback,
  VisualVersion,
  VisualVersionToken,
  WritebackData,
  TenantTheme,
  TenantThemeAsset,
  Report,
  DataSource,
  Dataset,
  DataSourceDataset,
  Asset,
  TenantSettings,
  CustomColumn,
  CustomColumnType,
  CustomColumnValue,
  WritebackJobEvent,
  Audit,
  AuditLog,
  AuditActivity,
  WritebackConnections,
  WritebackUserConnectionHistory,
];

export default entities;
