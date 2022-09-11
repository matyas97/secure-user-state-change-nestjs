import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  SetMetadata,
  Param,
} from '@nestjs/common';
import { VerifService } from './verif.service';
import { VerifStateChangeGuard } from './guards/verif-state-change';
import User from '../users/decorators/user.decorator';
import VerifStates from 'src/constants/verif-states';
import UpdatePersonalInfoDto from './dto/update-personal-info.dto';
import { UserExistsGuard } from 'src/users/guards/user-exists';
import UpdateBankInfoDto from './dto/update-bank-info.dto';

@Controller('verif')
export class VerifController {
  constructor(private readonly verifService: VerifService) {}

  @Post()
  @UseGuards(UserExistsGuard)
  create(@User('id') userId: string) {
    return this.verifService.create(userId);
  }

  @Get()
  findByUser(@User('id') userId: string) {
    return this.verifService.findByUser(userId);
  }

  @Patch(':id/personal-info')
  @SetMetadata('state', VerifStates.FILLED_PERSONAL_INFO)
  @UseGuards(VerifStateChangeGuard)
  updatePersonalInfo(
    @Param('id') id: string,
    @Body() data: UpdatePersonalInfoDto,
  ) {
    return this.verifService.updatePersonalInfo(id, data);
  }

  @Patch(':id/bank-info')
  @SetMetadata('state', VerifStates.FILLED_BANK_INFO)
  @UseGuards(VerifStateChangeGuard)
  updateBankInfo(@Param('id') id: string, @Body() data: UpdateBankInfoDto) {
    return this.verifService.updateBankInfo(id, data);
  }

  @Post(':id/sign-agreement')
  @SetMetadata('state', VerifStates.SIGNED)
  @UseGuards(VerifStateChangeGuard)
  signAgreement(@Param('id') id: string) {
    return this.verifService.signAgreement(id);
  }
}
