/**
 * Writeback User Connection History Table
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import BaseTable from './BaseTable';
import User from './User';
import Tenant from './Tenant';
import Visual from './Visual';
import WritebackConnections from './WritebackConnections';

/**
 * Writeback Connections Table
 * @extends BaseTable
 */
@Entity({ name: 'writeback_user_connection_history' })
class WritebackUserConnectionHistory extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tableName: string;

  @Column()
  writebackConnectionId: number;

  @Column()
  tenantId: string;

  @Column()
  visualId: string;

  @ManyToOne(() => User, (user) => user.writebackUserConnectionHistory)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.writebackUserConnectionHistory)
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => Visual, (visual) => visual.writebackUserConnectionHistory)
  @JoinColumn()
  visual: Visual;

  @ManyToOne(
    () => WritebackConnections,
    (writebackConnection) => writebackConnection.writebackUserConnectionHistory,
  )
  writebackConnection: WritebackConnections;
}
export default WritebackUserConnectionHistory;
