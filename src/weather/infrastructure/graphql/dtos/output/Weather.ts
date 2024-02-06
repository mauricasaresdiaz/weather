import { CoordinatesProperties } from "@/weather/domain/types/Coordinates";
import { WeatherProperties } from "@/weather/domain/types/Weather";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WeatherOutput implements WeatherProperties {
  @Field(() => String)
  city: string;
  @Field(() => Coordinates)
  coordinates: CoordinatesProperties;
  @Field(() => Number)
  temperature: number;
  @Field(() => Number)
  feelsLike: number;
  @Field(() => Number)
  visibility: number;
  @Field(() => Number)
  pressure: number;
  @Field(() => Number)
  humidity: number;
  @Field(() => Number)
  windSpeed: number;
}

@ObjectType()
export class Coordinates implements CoordinatesProperties {
  @Field(() => Number)
  lat: number;
  @Field(() => Number)
  lon: number;
}
