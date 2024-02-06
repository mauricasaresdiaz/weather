import { WeatherProperties } from "../types/Weather";

export interface GetWeatherByCityPort {
  get(city: string): Promise<WeatherProperties>;
}