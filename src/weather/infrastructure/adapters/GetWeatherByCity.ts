import { GetWeatherByCityPort } from "@/weather/domain/ports/GetWeatherByCity";
import { WeatherProperties } from "@/weather/domain/types/Weather";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";

type OpenWeatherData = {
  coord: { 
    lon: number, 
    lat: number 
  },
  name: string
  main: { 
    temp: number, 
    feels_like: number, 
    temp_min: number, 
    temp_max: number, 
    pressure: number, 
    humidity: number 
  },
  visibility: number,
  wind: { 
    speed: number, 
    deg: number 
  } 
}

@Injectable()
export class GetWeatherByCityAdapter implements GetWeatherByCityPort {
  constructor(private readonly httpService: HttpService) { }

  async get(city: string): Promise<WeatherProperties> {
    const rawData: OpenWeatherData = await this.getWeatherFromOpenWeather(city);
    return this.parseToWeatherProperties(rawData);
  }

  private async getWeatherFromOpenWeather(city: string): Promise<OpenWeatherData> {
    const { data } = await firstValueFrom(
      this.httpService.get<OpenWeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_ACCESS_TOKEN}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data)
          throw new Error('Internal Server Error getting weather by city')
        }),
      ),
    );

    return data;
  }

  private parseToWeatherProperties(rawData: OpenWeatherData): WeatherProperties {
    const weatherProperties: WeatherProperties = {
      city: rawData.name,
      coordinates: {
        lat: rawData.coord.lat,
        lon: rawData.coord.lon
      },
      feelsLike: rawData.main.feels_like,
      humidity: rawData.main.humidity,
      pressure: rawData.main.pressure,
      temperature: rawData.main.temp,
      visibility: rawData.visibility,
      windSpeed: rawData.wind.speed
    }
    return weatherProperties;
  }
}
