/**
 * Dataset Table
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import BaseTable from './BaseTable';
import DataSourceDataset from './DataSourceDataset';
import Report from './Report';
import Tenant from './Tenant';
import { saveAssetRecord } from '../utilities/common';

import User from './User';
import Asset from './Asset';

/**
 * Dataset Table
 * @extends BaseTable
 */
@Entity({ name: 'dataset' })
class Dataset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  meta: string;

  @Column()
  configuredBy: string;

  @Column()
  workspaceId: string;

  @Column()
  datasetId: string;

  @Column()
  tenantId: string;

  @OneToMany(() => DataSourceDataset, (ds) => ds.dataset)
  dataSourceConnection: DataSourceDataset;

  @OneToMany(() => Report, (report) => report.dataset, { cascade: true })
  reports: Report[];

  @OneToOne(() => Asset)
  @JoinColumn({ name: 'id', referencedColumnName: 'assetId' })
  asset: Asset;

  @ManyToOne(() => User, (user) => user.datasets)
  @JoinColumn({ name: 'configuredBy', referencedColumnName: 'email' })
  configuredUser: User;

  @ManyToOne(() => User, (user) => user.datasets)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.datasets)
  @JoinColumn()
  tenant: Tenant;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.meta = this.meta ? JSON.stringify(this.meta) : '{}';
  }

  @AfterInsert()
  handleAsset() {
    this.meta = JSON.parse(this.meta);
    saveAssetRecord(this, 'Dataset');
  }

  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.meta = JSON.parse(this.meta);
  }
}

export default Dataset;
