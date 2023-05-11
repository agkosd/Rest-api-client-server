import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { IssueModule } from './issue.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [Issue],
        synchronize: true,
    }), IssueModule],

})
export class AppModule { }
