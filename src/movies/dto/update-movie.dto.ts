import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// ? 필수가 아니다

// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;
//   @IsNumber()
//   readonly year?: number;
//   @IsString({ each: true })
//   readonly genres?: string[];
// }

// PartiaType 으로 사용시
//CreateMovieDto 쓰는 이유 는 데이터 타입이 같아서
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
