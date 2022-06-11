/**
 * Asset Table
 */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import BaseTable from './BaseTable';
import Dataset from './Dataset';
import DataSource from './DataSource';
import Report from './Report';
import Subscription from './Subscription';
import User from './User';

/**
 * Asset Table
 * @extends BaseTable
 */
@Entity({ name: 'asset' })
class Asset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  assetType: string;

  @Column()
  assetId: string;

  @Column()
  workspaceId: string;

  @Column()
  workspaceName: string;

  @Column()
  owner: string;

  @Column()
  refreshedAt: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => User, (user) => user.assets)
  @JoinColumn({ name: 'owner', referencedColumnName: 'email' })
  user: User;

  @OneToOne(() => Dataset)
  @JoinColumn({ name: 'assetId' })
  dataset: Dataset;

  @OneToOne(() => DataSource)
  @JoinColumn({ name: 'assetId' })
  dataSource: DataSource;

  @OneToOne(() => Report)
  @JoinColumn({ name: 'assetId' })
  report: Report;

  @OneToOne(() => Subscription)
  @JoinColumn({ name: 'assetId' })
  subscription: Subscription;
}

export default Asset;
