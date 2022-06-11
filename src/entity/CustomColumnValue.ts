/**
 * CustomColumnValue Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import Audit from './Audit';
import BaseTable from './BaseTable';
import CustomColumn from './CustomColumn';
import User from './User';

/**
 * CustomColumnValue Table
 * @extends BaseTable
 */
@Entity({ name: 'custom_column_value' })
class CustomColumnValue extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  customColumnId: string;

  @Column()
  value: string;

  @Column()
  valueMeta: string;

  @Column()
  cellId: string;

  @Column()
  rowId: string;

  @Column()
  dimensions: string;

  @ManyToOne(() => User, (user) => user.customColumnValue)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => CustomColumn, (customColumn) => customColumn.customColumnValue)
  @JoinColumn()
  customColumn: CustomColumn;

  @OneToMany(() => Audit, (customColumnValueAudit) => customColumnValueAudit.customColumn, {
    cascade: true,
  })
  customColumnValueAudits: Audit[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.valueMeta = this.valueMeta ? JSON.parse(this.valueMeta) : {};
  }

  static skipTenant = true;
}
export default CustomColumnValue;
