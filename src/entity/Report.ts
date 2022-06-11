/**
 * Report Table
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
  OneToOne,
} from 'typeorm';
import BaseTable from './BaseTable';
import Dataset from './Dataset';
import Subscription from './Subscription';
import { saveAssetRecord } from '../utilities/common';
import Visual from './Visual';
import User from './User';
import Asset from './Asset';

/**
 * Report Table
 * @extends BaseTable
 */
@Entity({ name: 'report' })
class Report extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  meta: string;

  @Column()
  workspaceId: string;

  @Column()
  reportUrl: string;

  @Column()
  tenantId: string;

  @Column()
  reportId: string;

  @Column()
  datasetId: string;

  @ManyToOne(() => Dataset, (dataset) => dataset.reports)
  @JoinColumn()
  dataset: Dataset;

  @OneToOne(() => Asset)
  @JoinColumn({ name: 'id', referencedColumnName: 'assetId' })
  asset: Asset;

  @ManyToOne(() => User, (user) => user.datasets)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @OneToMany(() => Subscription, (subscription) => subscription.report, { cascade: true })
  subscriptions: Subscription[];

  @OneToMany(() => Visual, (visual) => visual.report, { cascade: true })
  visuals: Visual[];

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
    this.meta = this.meta ? JSON.parse(this.meta) : '{}';
    saveAssetRecord(this, 'Report');
  }

  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.meta = this.meta ? JSON.parse(this.meta) : '{}';
  }
}

export default Report;
