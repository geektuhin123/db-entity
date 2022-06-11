/**
 * DataSource Table
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
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { saveAssetRecord } from '../utilities/common';
import BaseTable from './BaseTable';
import DataSourceDataset from './DataSourceDataset';
import Tenant from './Tenant';

/**
 * DataSource Table
 * @extends BaseTable
 */
@Entity({ name: 'data_source' })
class DataSource extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  meta: string;

  @Column()
  workspaceId: string;

  @Column()
  tenantId: string;

  @Column()
  dataSourceId: string;

  @OneToMany(() => DataSourceDataset, (ds) => ds.dataSource)
  datasetConnection: DataSourceDataset;

  @ManyToOne(() => Tenant, (tenant) => tenant.dataSources)
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
    saveAssetRecord(this, 'DataSource');
  }

  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.meta = JSON.parse(this.meta);
  }
}

export default DataSource;
