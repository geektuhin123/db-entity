/**
 * Tenant Settings Table
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
} from 'typeorm';
import BaseTable from './BaseTable';
import { decrypt } from '../utilities/cipher';

import Tenant from './Tenant';

/**
 * TenantSettings Table
 * @extends BaseTable
 */
@Entity({ name: 'tenant_settings' })
class TenantSettings extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  meta: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.tenantSettings)
  @JoinColumn()
  tenant: Tenant;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.meta = typeof this.meta === 'object' ? JSON.stringify(this.meta) : this.meta || '{}';
  }

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.meta = this.meta ? JSON.parse(decrypt(this.meta, this.updatedAt.toString())) : {};
  }
}

export default TenantSettings;
