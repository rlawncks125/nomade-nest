import { IsString, IsNumber, IsOptional } from 'class-validator';

// ? = 필수가 아니다

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional() // PartialType로 불러서 사용하는 곳에서 genres? 처럼 쓰고싶어서 사용하는거같음
  @IsString({ each: true })
  readonly genres: string[];
}
