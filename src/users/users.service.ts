import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      Logger.error(error);
      throw new ServiceUnavailableException();
    }
  }
}
