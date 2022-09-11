import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VerifModule } from './verif/verif.module';

@Module({
  imports: [PrismaModule, UsersModule, VerifModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
