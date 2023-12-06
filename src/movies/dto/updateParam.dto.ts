import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateParamDTO {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ example: '65702b617c0b40d776056c86' })
  id: string;
}
