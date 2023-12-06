import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

const genres = ['ACTION', 'DRAMA', 'THRILLER', 'CRIME'];

export class UpdateMoiveDTO {
  @IsString()
  @IsDefined()
  @IsOptional()
  @ApiProperty({ example: 'RRR' })
  name: string;

  @IsString()
  @IsDefined()
  @IsOptional()
  @ApiProperty({ example: 'Action' })
  @IsEnum(genres, { message: `Genres must be one of [${genres}]` })
  genre: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'https://www.movies.com/rrr' })
  streamingLink: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @ApiProperty({ example: 1.5 })
  rating: number;
}
