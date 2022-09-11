import { IsNotEmpty, IsString } from 'class-validator';

class UpdateBankInfoDto {
  @IsNotEmpty()
  @IsString()
  bankCode: string;

  @IsNotEmpty()
  @IsString()
  bankNumber: string;
}

export default UpdateBankInfoDto;
