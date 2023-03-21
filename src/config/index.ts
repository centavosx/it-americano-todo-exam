import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'satao.db.elephantsql.com',
  port: 5432,
  username: 'iqmqkoox',
  password: '9-IfwsiLOo-BY2kMYuXpKNDDsYeXNm3m',
  database: 'iqmqkoox',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
