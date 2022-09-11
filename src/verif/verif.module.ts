import { Module } from '@nestjs/common';
import { VerifService } from './verif.service';
import { VerifController } from './verif.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [VerifController],
  providers: [VerifService],
})
export class VerifModule {}
