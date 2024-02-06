import { Resolver, Query, Args } from "@nestjs/graphql";
import { WeatherOutput } from "@/weather/infrastructure/graphql/dtos/output/Weather";
import { GetWeatherByCityUC } from "@/weather/application/use-cases/GetWeatherByCity";

@Resolver(() => WeatherOutput)
export class WeatherResolver {
  constructor(
    private readonly getWeatherByCityUC: GetWeatherByCityUC,
  ) {}

  @Query(() => WeatherOutput, { name: 'weather' })
  async getWeatherByCity(@Args('city') city: string): Promise<WeatherOutput> {
    return await this.getWeatherByCityUC.get(city);
  }
}