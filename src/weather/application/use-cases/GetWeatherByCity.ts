import { GetWeatherByCityPort } from "@/weather/domain/ports/GetWeatherByCity";
import { WeatherProperties } from "@/weather/domain/types/Weather";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetWeatherByCityUC {
  constructor(private readonly getWeatherByCity: GetWeatherByCityPort) {}

  public async get(
    city: string
  ): Promise<WeatherProperties> {
    return await this.getWeatherByCity.get(city);
  }
}
