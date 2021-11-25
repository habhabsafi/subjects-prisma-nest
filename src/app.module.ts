import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ControllersModule } from './controllers/controllers.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './services/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ControllersModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env`
    // ignoreEnvFile: process.env.ENV !== `DEV`,
  }), AuthModule, UsersModule, ScheduleModule.forRoot()

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
