import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { AuthModule } from './services/auth/auth.module';
import { TasksModule } from './services/tasks/tasks.module';
import { UsersModule } from './services/users/users.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [ControllersModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env`
        // ignoreEnvFile: process.env.ENV !== `DEV`,
      }), AuthModule, UsersModule, ScheduleModule.forRoot()
        , TasksModule
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
