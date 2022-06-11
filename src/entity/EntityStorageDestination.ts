/**
 * StorageUserDestination Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BaseTable from './BaseTable';
import StorageSettings from './StorageSettings';
import Subscription from './Subscription';
import UserStorageSettings from './UserStorageSettings';
import { decrypt } from '../utilities/cipher';
import Visual from './Visual';
import logger from '../config/logger';
import WritebackConnections from './WritebackConnections';

/**
 * StorageUserDestination Table
 * @extends BaseTable
 */
@Entity({ name: 'entity_storage_destination' })
class EntityStorageDestination extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  path: string;

  @Column()
  fileFormat: string;

  @Column()
  fileName: string;

  @Column()
  webhookUrl: string;

  @Column('text')
  settings: string;

  @Column()
  userStorageSettingId: string;

  @Column()
  storageSettingId: string;

  @Column()
  writebackConnectionId: string;

  @Column()
  entityId: string;

  @Column()
  entityType: number;

  @Column()
  settingsHash: string;

  @Column()
  reportUrlFilter: string;

  @ManyToOne(
    () => UserStorageSettings,
    (userStorageSetting) => userStorageSetting.entityStorageDestinations,
  )
  userStorageSetting: UserStorageSettings;

  @ManyToOne(() => Subscription, (subscription) => subscription.subscriptionStorageDestinations)
  @JoinColumn({ name: 'entityId' })
  subscription: Subscription;

  @ManyToOne(() => Visual, (visual) => visual.visualStorageDestinations)
  @JoinColumn({ name: 'entityId' })
  visual: Visual;

  @ManyToOne(() => StorageSettings, (storageSetting) => storageSetting.entityStorageDestinations)
  storageSetting: StorageSettings;

  @ManyToOne(
    () => WritebackConnections,
    (writebackConnection) => writebackConnection.entityStorageDestinations,
  )
  writebackConnection: WritebackConnections;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    if (this.settings) {
      this.settings = JSON.stringify(this.settings);
    } else {
      this.settings = '{}';
    }
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    try {
      this.settings = JSON.parse(this.settings);
      const { password, privateKey } = this.settings as any;
      if (password) (this.settings as any).password = decrypt(password, this.createdAt.toString());
      if (privateKey) {
        (this.settings as any).privateKey = decrypt(privateKey, this.createdAt.toString());
      }
    } catch (error) {
      logger.log(
        'error',
        `Failed to execute parseJson() in EntityStorageDestination: ${error.message}`,
      );
    }
  }

  static skipTenant = true;
}

export default EntityStorageDestination;
