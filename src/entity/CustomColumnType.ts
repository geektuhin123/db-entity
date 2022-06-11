/**
 * CustomColumnType Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import BaseTable from './BaseTable';
import CustomColumn from './CustomColumn';

/**
 * CustomColumnType Table
 * @extends BaseTable
 */
@Entity({ name: 'custom_column_type' })
class CustomColumnType extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  settings: string;

  @OneToMany(() => CustomColumn, (customColumn) => customColumn.customColumnType)
  @JoinColumn()
  customColumn: CustomColumn;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  static skipTenant = true;
}
export default CustomColumnType;
