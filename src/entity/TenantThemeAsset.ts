/**
 * TenantThemeAsset Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import Tenant from './Tenant';
import User from './User';

/**
 * TenantThemeAsset Table
 * @extends BaseTable
 */
@Entity({ name: 'tenant_theme_asset' })
class TenantThemeAsset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  type: number;

  @Column()
  asset: string;

  @Column()
  assetName: string;

  @Column()
  assetUrl: string;

  @Column()
  extension: string;

  @Column()
  assetMeta: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.theme)
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.theme)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => User, (user) => user.theme)
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.assetMeta = this.assetMeta ? JSON.stringify(this.assetMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.assetMeta = this.assetMeta ? JSON.parse(this.assetMeta) : {};
  }
}
export default TenantThemeAsset;
