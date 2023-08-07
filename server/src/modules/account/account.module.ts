import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '../../../db/entities'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AccountResolver } from './account.resolver'
import { ErrorsService } from '../../common/errors.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AccountService,
    AccountResolver,
    ErrorsService,
  ],
  exports: [AccountService], // експортується для того щоб можна було використовувати в auth модулі
})

export class AccountModule {
}
