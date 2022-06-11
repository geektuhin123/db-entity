/**
 * TenantTheme Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BaseTable from './BaseTable';
import Tenant from './Tenant';
import User from './User';

/**
 * TenantTheme Table
 * @extends BaseTable
 */
@Entity({ name: 'tenant_theme' })
class TenantTheme extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  name: string;

  @Column()
  themeMeta: string;

  @Column()
  img: string;

  @Column()
  publicTheme: number;

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
    this.themeMeta = this.themeMeta ? JSON.stringify(this.themeMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.themeMeta = this.themeMeta && JSON.parse(this.themeMeta);
  }
}
export default TenantTheme;
