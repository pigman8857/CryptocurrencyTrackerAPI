import { Module } from '@nestjs/common';
import { databaseProviders } from '../data-source/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})

@Module({})
export class DatabaseModule {}
