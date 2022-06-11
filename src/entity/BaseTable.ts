/**
 * Base Table Class
 */
import { Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';

/**
 * Base Table Class
 * @extends BaseEntity
 */
abstract class BaseTable extends BaseEntity {
  @Column()
  status: number;

  @Column()
  createdAt: number;

  @Column()
  createdBy: number;

  @Column()
  updatedAt: number;

  @Column()
  updatedBy: number;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  addTimestamp() {
    const now = Math.ceil(new Date().getTime() / 1000);
    this.createdAt = this.createdAt || now;
    this.updatedAt = now;
    if (!this.createdBy) {
      this.createdBy = 0;
    }
    if (!this.updatedBy) {
      this.updatedBy = 0;
    }
  }

  @BeforeUpdate()
  updateTimestamp() {
    const now = Math.ceil(new Date().getTime() / 1000);
    this.updatedAt = now;
  }
}

export default BaseTable;
