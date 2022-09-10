import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export default CreateUserDto;
