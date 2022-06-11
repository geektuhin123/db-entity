/**
 * DataSource_Dataset Table
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import BaseTable from './BaseTable';
import Dataset from './Dataset';
import DataSource from './DataSource';

/**
 * DataSource_Dataset Table
 * @extends BaseTable
 */
@Entity({ name: 'data_source_dataset' })
class DataSourceDataset extends BaseTable {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  datasetId: string;

  @PrimaryColumn()
  dataSourceId: string;

  @ManyToOne(() => Dataset, (dataset) => dataset.dataSourceConnection, { primary: true })
  @JoinColumn({ name: 'datasetId' })
  dataset: Dataset;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.datasetConnection, { primary: true })
  @JoinColumn({ name: 'dataSourceId' })
  dataSource: DataSource;
}

export default DataSourceDataset;
