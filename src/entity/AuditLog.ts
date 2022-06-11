/**
 * AuditLog Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  BeforeUpdate,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
} from 'typeorm';
import Audit from './Audit';
import BaseTable from './BaseTable';

/**
 * AuditLog Table
 * @extends BaseTable
 */
@Entity({ name: 'audit_log' })
class AuditLog extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  auditId: string;

  @Column()
  meta: string;

  @ManyToOne(() => Audit, (audit) => audit.auditLogs)
  @JoinColumn({ name: 'auditId' })
  audit: Audit;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.meta = this.meta && typeof this.meta === 'object' ? JSON.stringify(this.meta) : '{}';
  }

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.meta = this.meta ? JSON.parse(this.meta) : {};
  }
}

export default AuditLog;
