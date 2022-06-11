/**
 * Writeback Connections Table
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
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import User from './User';
import { decrypt } from '../utilities/cipher';
import Tenant from './Tenant';
import StorageSettings from './StorageSettings';
import EntityStorageDestination from './EntityStorageDestination';
import WritebackUserConnectionHistory from './WritebackUserConnectionHistory';
import logger from '../config/logger';

/**
 * Writeback Connections Table
 * @extends BaseTable
 */
@Entity({ name: 'writeback_connections' })
class WritebackConnections extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  connectionName: string;

  @Column()
  storageSettingId: number;

  @Column()
  tenantId: string;

  @Column('text')
  meta: string;

  @Column()
  connectionHash: string;

  @Column()
  connectionOwner: number;

  @ManyToOne(() => User, (user) => user.writebackConnections)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.writebackConnections)
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => StorageSettings, (storageSetting) => storageSetting.writebackConnections)
  @JoinColumn()
  storageSetting: StorageSettings;

  @OneToMany(
    () => EntityStorageDestination,
    (entityStorageDestination) => entityStorageDestination.writebackConnection,
    {
      cascade: true,
    },
  )
  entityStorageDestinations: EntityStorageDestination[];

  @OneToMany(
    () => WritebackUserConnectionHistory,
    (writebackUserConnectionHistory) => writebackUserConnectionHistory.writebackConnection,
    {
      cascade: true,
    },
  )
  writebackUserConnectionHistory: WritebackUserConnectionHistory[];

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    if (this.meta) {
      this.meta = JSON.stringify(this.meta);
    } else {
      this.meta = '{}';
    }
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    try {
      this.meta = JSON.parse(this.meta);
      const { password, privateKey } = this.meta as any;
      if (password) (this.meta as any).password = decrypt(password, this.createdAt.toString());
      if (privateKey) {
        (this.meta as any).privateKey = decrypt(privateKey, this.createdAt.toString());
      }
    } catch (error) {
      logger.log(
        'error',
        `Failed to execute parseJson() in WritebackConnections: ${error.message}`,
      );
    }
  }
}
export default WritebackConnections;
