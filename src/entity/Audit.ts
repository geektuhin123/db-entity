/**
 * Audit Table
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
  OneToMany,
} from 'typeorm';
import AuditActivity from './AuditActivity';
import AuditLog from './AuditLog';
import BaseTable from './BaseTable';
import CustomColumn from './CustomColumn';
import CustomColumnValue from './CustomColumnValue';
import User from './User';
import Visual from './Visual';

/**
 * Audit Table
 * @extends BaseTable
 */
@Entity({ name: 'audit' })
class Audit extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  entityId: string;

  @Column()
  entityType: string;

  @Column()
  recordId: string;

  @Column()
  activityId: string;

  @Column()
  valueColumnId: string;

  @Column()
  valueColumnType: string;

  @Column()
  action: string;

  @Column()
  oldValue: string;

  @Column()
  newValue: string;

  @ManyToOne(() => Visual, (visual) => visual.audits)
  @JoinColumn({ name: 'entityId' })
  visual: Visual;

  @ManyToOne(() => CustomColumn, (customColumn) => customColumn.customColumnAudits)
  @JoinColumn({ name: 'valueColumnId' })
  customColumn: CustomColumn;

  @ManyToOne(
    () => CustomColumnValue,
    (customColumnValue) => customColumnValue.customColumnValueAudits,
  )
  @JoinColumn({ name: 'valueColumnId' })
  customColumnValue: CustomColumnValue;

  @ManyToOne(() => User, (user) => user.audits)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => AuditActivity, (auditActivity) => auditActivity.auditRecords)
  @JoinColumn({ name: 'activityId' })
  auditActivity: AuditActivity;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @OneToMany(() => AuditLog, (auditLog) => auditLog.audit, {
    cascade: true,
  })
  auditLogs: AuditLog[];

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.oldValue =
      this.oldValue && typeof this.oldValue === 'object' ? JSON.stringify(this.oldValue) : '{}';
    this.newValue =
      this.newValue && typeof this.newValue === 'object' ? JSON.stringify(this.newValue) : '{}';
  }

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  parseJson() {
    this.oldValue = this.oldValue ? JSON.parse(this.oldValue) : {};
    this.newValue = this.newValue ? JSON.parse(this.newValue) : {};
  }
}

export default Audit;
