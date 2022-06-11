/**
 * Role Table
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseTable from './BaseTable';
import TenantUser from './TenantUser';

/**
 * Role Table
 * @extends BaseTable
 */
@Entity()
class Role extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tenantId: string;

  @OneToMany(() => TenantUser, (tenantUser) => tenantUser.role, { cascade: true })
  tenantUsers: TenantUser[];
}

export default Role;
