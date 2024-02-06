import { Module } from "@nestjs/common";
import { WeatherResolver } from '@/weather/infrastructure/graphql/resolvers/Weather.resolver';
import { HttpModule } from "@nestjs/axios";
import * as providers from './providers';

@Module({  
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [
    ...Object.values(providers),
    WeatherResolver,
  ],
  exports: [],
})
export class WeatherModule {}