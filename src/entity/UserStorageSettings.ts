/**
 * StorageUserDestination Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import BaseTable from './BaseTable';
import EntityStorageDestination from './EntityStorageDestination';
import StorageSettings from './StorageSettings';
import User from './User';
import { decrypt } from '../utilities/cipher';

/**
 * UserStorageSettings Table
 * @extends BaseTable
 */
@Entity({ name: 'user_storage_settings' })
class UserStorageSettings extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  accessToken: string;

  @Column('text')
  refreshToken: string;

  @Column('text')
  username: string;

  @Column('text')
  nonce: string;

  @Column()
  storageSettingId: string;

  @Column()
  tenantId: string;

  @Column('text')
  settings: string;

  @ManyToOne(() => StorageSettings, (storageSetting) => storageSetting.userStorageSettings)
  storageSetting: StorageSettings;

  @OneToMany(
    () => EntityStorageDestination,
    (entityStorageDestination) => entityStorageDestination.userStorageSetting,
    { cascade: true },
  )
  entityStorageDestinations: EntityStorageDestination[];

  @ManyToOne(() => User, (user) => user.userStorageSettings)
  @JoinColumn({ name: 'createdBy' })
  user: User;

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
  parseJsonAndDecrypt() {
    this.settings = JSON.parse(this.settings);
    this.accessToken =
      this.accessToken && this.accessToken !== ''
        ? decrypt(this.accessToken, this.createdAt.toString())
        : this.accessToken;

    this.refreshToken =
      this.refreshToken && this.refreshToken !== ''
        ? decrypt(this.refreshToken, this.createdAt.toString())
        : this.refreshToken;
  }
}

export default UserStorageSettings;
