import { CoordinatesProperties } from "./Coordinates"

export type WeatherProperties =
{
  city: string,
  coordinates: CoordinatesProperties,
  temperature: number,
  feelsLike: number,
  visibility: number,
  pressure: number,
  humidity: number,
  windSpeed: number
}
