/**
 * CertifiedLicenses Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';

/**
 * CertifiedLicenses Table
 * @extends BaseTable
 */
@Entity()
class CertifiedLicenses extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  licenseMeta: string;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    if (this.licenseMeta) {
      this.licenseMeta = JSON.stringify(this.licenseMeta);
    } else {
      this.licenseMeta = '{}';
    }
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.licenseMeta = JSON.parse(this.licenseMeta);
  }

  static skipTenant = true;
}

export default CertifiedLicenses;
