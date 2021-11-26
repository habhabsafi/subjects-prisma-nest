import { Controller, Get, Request, Post, UseGuards, Logger } from "@nestjs/common"
import { AppService } from "./app.service"
import { AuthService } from './services/auth/auth.service'
import { LocalAuthGuard } from "./services/auth/local-auth.guard";
import { JwtAuthGuard } from './services/auth/jwt-auth.guard';
import { TasksService } from "./services/tasks/tasks.services";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly tasksService: TasksService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    Logger.log(req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    Logger.log("ssssssxxx")

    return req.user
  }

  @Get()
  getHello(): string {
    Logger.log("hello")
    // this.tasksService.handleCron();
    return this.appService.getHello()
  }
}
