import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: 'mongodb://admin:password@localhost:27017/school',
      host: 'localhost',
      port: 27017,
      database: 'school',
      username: 'admin',
      password: 'password',
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    LessonModule,
    StudentModule
  ]
})
export class AppModule {
}
