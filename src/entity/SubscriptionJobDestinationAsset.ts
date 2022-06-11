/**
 * SubscriptionJobDestinationAsset Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionJobDestination from './SubscriptionJobDestination';

/**
 * SubscriptionJobDestinationAsset Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job_destination_asset' })
class SubscriptionJobDestinationAsset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionJobDestinationId: string;

  @Column()
  assetUrl: string;

  @Column()
  assetName: string;

  @Column()
  fileFormat: string;

  @Column()
  message: string;

  @Column('text')
  errorCode: string;

  @Column('text')
  errorMeta: string;

  @Column()
  assetType: string;

  @ManyToOne(
    () => SubscriptionJobDestination,
    (subscriptionJobDestination) => subscriptionJobDestination.subscriptionJobDestinationAssets,
  )
  @JoinColumn()
  subscriptionJobDestination: SubscriptionJobDestination;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    this.errorMeta = this.errorMeta ? JSON.stringify(this.errorMeta) : '{}';
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.errorMeta = JSON.parse(this.errorMeta);
  }
}

export default SubscriptionJobDestinationAsset;
