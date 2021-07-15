import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogMiddleware } from 'middlewares/log.middleware';
import { BoardsModule } from './boards/boards.module';
import { LoginModule } from './login/login.module';
import ormconfig from './ormconfig';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).exclude('/login').forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
