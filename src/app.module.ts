import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

// app.Module 의 컨트롤러 , 프로바이더  주소 : "/"  에대해 사용
// 다른 모듈은 imports로 불러오는거같음 ex) "/movies" 주소로 불러올떄 등등
