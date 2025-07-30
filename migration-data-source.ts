// migration-data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

// Load the appropriate .env file based on NODE_ENV (default to .env.development)
console.log('before dotenv NODE_ENV:', process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
console.log('after dotenv NODE_ENV:', process.env.NODE_ENV); 
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // Glob patterns for all your entities (TS & JS, src & dist)
  entities: [
    'src/**/entities/**/*.entity{.ts,.js}',
    'dist/**/entities/**/*.entity.js'
  ],

  // Migrations in source and compiled output
  migrations: [
    'src/migrations/*{.ts,.js}',
    'dist/migrations/*.js'
  ],

  migrationsTableName: 'migration_logs'
}

export const AppDataSource = new DataSource(dataSourceOptions)
