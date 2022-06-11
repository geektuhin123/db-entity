/**
 * CustomColumn Table
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
import CustomColumnType from './CustomColumnType';
import CustomColumnValue from './CustomColumnValue';
import User from './User';
import Visual from './Visual';

/**
 * CustomColumn Table
 * @extends BaseTable
 */
@Entity({ name: 'custom_column' })
class CustomColumn extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  measureGuid: string;

  @Column()
  customColumnTypeId: string;

  @Column()
  visualId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text')
  columnMeta: string;

  @ManyToOne(() => User, (user) => user.customColumns)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ManyToOne(() => Visual, (visual) => visual.customColumn)
  @JoinColumn()
  visual: Visual;

  @ManyToOne(() => CustomColumnType, (customColumnType) => customColumnType.customColumn)
  @JoinColumn()
  customColumnType: CustomColumnType;

  @OneToMany(() => CustomColumnValue, (customColumnValue) => customColumnValue.customColumn)
  @JoinColumn()
  customColumnValue: CustomColumnValue;

  @OneToMany(() => Audit, (customColumnAudit) => customColumnAudit.customColumn, {
    cascade: true,
  })
  customColumnAudits: Audit[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.columnMeta = this.columnMeta ? JSON.parse(this.columnMeta) : {};
  }

  static skipTenant = true;
}
export default CustomColumn;
