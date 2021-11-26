import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MyLogger } from './services/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  // app.useLogger(app.get(MyLogger))
  await app.listen(3005)
}
bootstrap()
