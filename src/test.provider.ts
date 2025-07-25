
import { DataSource } from 'typeorm';
import { TestTable } from './test.entity';

export const testProviders = [
  {
    provide: 'TEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TestTable),
    inject: ['DATA_SOURCE'],
  },
];
