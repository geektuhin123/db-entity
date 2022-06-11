/**
 * Tenant Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import TenantUser from './TenantUser';
import Visual from './Visual';
import config from '../config/config';
import SubscriptionJob from './SubscriptionJob';
import TenantTheme from './TenantTheme';
import DataSource from './DataSource';
import Dataset from './Dataset';
import TenantSettings from './TenantSettings';
import WritebackConnections from './WritebackConnections';
import WritebackUserConnectionHistory from './WritebackUserConnectionHistory';

/**
 * Tenant Table
 * @extends BaseTable
 */
@Entity()
class Tenant extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column()
  visualDomain: string;

  @Column()
  licenseMeta: string;

  @Column()
  featureMeta: string;

  @OneToMany(() => TenantUser, (tenantUser) => tenantUser.tenant, { cascade: true })
  tenantUsers: TenantUser[];

  @OneToMany(() => Visual, (visual) => visual.tenant, { cascade: true })
  visual: Visual[];

  @OneToMany(() => SubscriptionJob, (subscriptionJob) => subscriptionJob.tenant, { cascade: true })
  subscriptionJobs: SubscriptionJob[];

  @OneToMany(() => TenantTheme, (theme) => theme.tenant, { cascade: true })
  theme: TenantTheme[];

  @OneToMany(() => DataSource, (dataSource) => dataSource.tenant, { cascade: true })
  dataSources: DataSource[];

  @OneToMany(() => Dataset, (dataset) => dataset.tenant, { cascade: true })
  datasets: Dataset[];

  @OneToMany(() => TenantSettings, (tenantSetting) => tenantSetting.tenant, { cascade: true })
  tenantSettings: TenantSettings[];

  @OneToMany(() => WritebackConnections, (writebackConnection) => writebackConnection.tenant, {
    cascade: true,
  })
  writebackConnections: WritebackConnections[];

  @OneToMany(
    () => WritebackUserConnectionHistory,
    (writebackUserConnectionHistory) => writebackUserConnectionHistory.tenant,
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
    this.licenseMeta = this.licenseMeta ? JSON.stringify(this.licenseMeta) : '{}';
    this.featureMeta = this.featureMeta ? JSON.stringify(this.featureMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    if (config.license.licenseMeta) {
      this.licenseMeta = config.license.licenseMeta;
    } else {
      this.licenseMeta = JSON.parse(this.licenseMeta);
    }
    this.featureMeta = JSON.parse(this.featureMeta);
  }

  static skipTenant = true;
}

export default Tenant;
