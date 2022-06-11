/**
 * Tenant Table
 */
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import BaseTable from './BaseTable';
import Tenant from './Tenant';
import User from './User';
import Role from './Role';

/**
 * TenantUser Table
 * @extends BaseTable
 */
@Entity({ name: 'tenant_user' })
class TenantUser extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  tenantId: string;

  @Column()
  roleId: string;

  @Column()
  lastLogin: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.tenantUsers)
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.tenantUsers)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Role, (role) => role.tenantUsers)
  @JoinColumn()
  role: Role;
}

export default TenantUser;
