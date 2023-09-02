import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { EntityNotFoundErrorFilter } from './common/filter/entity-not-found-error.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new EntityNotFoundErrorFilter())
  // app.setGlobalPrefix('api')
  // app.enableCors() //щоб не було конфліктів зі сторони серверу під час відпровки запитів

  const config = await app.get(ConfigService)
  const port = config.get<number>('API_PORT')

  await app.listen(port || 5000, () => {
    console.log(`Start on port: ${port}`)
  })
}

bootstrap()
