import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UpdateBankInfoDto from './dto/update-bank-info.dto';
import UpdatePersonalInfoDto from './dto/update-personal-info.dto';

@Injectable()
export class VerifService {
  constructor(private prisma: PrismaService) {}

  async create(id: string) {
    return this.prisma.verification.create({ data: { userId: id } });
  }

  async findByUser(userId: string) {
    const data = await this.prisma.verification.findFirst({
      where: { userId },
    });

    if (!data) throw new NotFoundException();

    return data;
  }

  async updatePersonalInfo(id: string, data: UpdatePersonalInfoDto) {
    return this.prisma.verification.update({
      where: { id },
      data: {
        ...data,
        verifState: 'FILLED_PERSONAL_INFO',
      },
    });
  }

  async updateBankInfo(id: string, data: UpdateBankInfoDto) {
    return this.prisma.verification.update({
      where: { id },
      data: {
        ...data,
        verifState: 'FILLED_BANK_INFO',
      },
    });
  }

  async signAgreement(id: string) {
    // your signature logic here

    return this.prisma.verification.update({
      where: { id },
      data: {
        signatureId: 'some_id',
        verifState: 'SIGNED',
      },
    });
  }
}
