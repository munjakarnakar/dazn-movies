import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

const genres = ['ACTION','DRAMA','THRILLER','CRIME'];

export class MoiveDTO {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty({example: 'RRR'})
    name: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty({example: "Action"})
    @IsEnum(genres, { message: `Genres must be one of [${genres}]` })
    genre: string
    
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty({example:"https://www.movies.com/rrr"})
    streamingLink: string
    
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    @ApiProperty({example: 1.5})
    rating: number
}