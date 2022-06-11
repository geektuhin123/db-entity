/**
 * StorageSettings Table
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import BaseTable from './BaseTable';
import EntityStorageDestination from './EntityStorageDestination';
import UserStorageSettings from './UserStorageSettings';
import { decrypt } from '../utilities/cipher';
import StorageType from '../config/StorageType';
import WritebackConnections from './WritebackConnections';

/**
 * StorageSettings Table
 * @extends BaseTable
 */
@Entity({ name: 'storage_settings' })
class StorageSettings extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  settings: string;

  @OneToMany(() => UserStorageSettings, (userStorageSetting) => userStorageSetting.storageSetting)
  userStorageSettings: UserStorageSettings[];

  @OneToMany(
    () => EntityStorageDestination,
    (entityStorageDestination) => entityStorageDestination.storageSetting,
  )
  entityStorageDestinations: EntityStorageDestination[];

  @OneToMany(
    () => WritebackConnections,
    (writebackConnection) => writebackConnection.storageSetting,
    { cascade: true },
  )
  writebackConnections: WritebackConnections[];

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
    if (
      this.id === StorageType.ONE_DRIVE.toString() ||
      this.id === StorageType.MS_TEAMS.toString() ||
      this.id === StorageType.SHARE_POINT.toString() ||
      this.id === StorageType.GOOGLE_DRIVE.toString()
    ) {
      this.settings = JSON.parse(decrypt(this.settings, this.updatedAt.toString()));
    }
  }

  static skipTenant = true;
}

export default StorageSettings;
