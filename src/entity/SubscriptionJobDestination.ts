/**
 * SubscriptionJobDestination Table
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterLoad,
  ManyToOne,
  AfterInsert,
  AfterUpdate,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import BaseTable from './BaseTable';
import SubscriptionJob from './SubscriptionJob';
import SubscriptionJobDestinationAsset from './SubscriptionJobDestinationAsset';
import Writeback from './Writeback';

/**
 * SubscriptionJobDestination Table
 * @extends BaseTable
 */
@Entity({ name: 'subscription_job_destination' })
class SubscriptionJobDestination extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  path: string;

  @Column()
  fileFormat: string;

  @Column()
  webhookUrl: string;

  @Column()
  type: number;

  @Column('text')
  settings: string;

  @Column()
  subscriptionJobId: string;

  @Column()
  jobEntityType: number;

  @Column()
  reportUrlFilter: string;

  @ManyToOne(
    () => SubscriptionJob,
    (subscriptionJob) => subscriptionJob.subscriptionJobDestinations,
  )
  @JoinColumn({ name: 'subscriptionJobId' })
  subscriptionJob: SubscriptionJob;

  @OneToMany(
    () => SubscriptionJobDestinationAsset,
    (subscriptionJobDestinationAsset) => subscriptionJobDestinationAsset.subscriptionJobDestination,
    { cascade: true },
  )
  subscriptionJobDestinationAssets: SubscriptionJobDestinationAsset[];

  @ManyToOne(() => Writeback, (writeback) => writeback.subscriptionJobDestination)
  @JoinColumn({ name: 'subscriptionJobId' })
  writeback: Writeback;

  /**
   * Function hook executes before inserting new row
   */
  @BeforeInsert()
  @BeforeUpdate()
  stringifyJson() {
    if (this.settings) {
      this.settings = JSON.stringify(this.settings);
    } else {
      this.settings = '{}';
    }
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  parseJson() {
    this.settings = this.settings ? JSON.parse(this.settings) : {};
  }

  static skipTenant = true;
}

export default SubscriptionJobDestination;
