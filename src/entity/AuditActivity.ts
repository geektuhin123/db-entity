/**
 * AuditActivity Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Audit from './Audit';
import BaseTable from './BaseTable';
import User from './User';

/**
 * AuditActivity Table
 * @extends BaseTable
 */
@Entity({ name: 'audit_activity' })
class AuditActivity extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tenantId: string;

  @Column()
  meta: string;

  @Column()
  activityType: number;

  @OneToMany(() => Audit, (audit) => audit.auditActivity)
  auditRecords: Audit[];

  @ManyToOne(() => User, (user) => user.auditActivities)
  @JoinColumn({ name: 'createdBy' })
  activityUser: User;

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

export default AuditActivity;
