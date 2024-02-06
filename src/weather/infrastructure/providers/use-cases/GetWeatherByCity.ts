import { GetWeatherByCityUC } from '@/weather/application/use-cases/GetWeatherByCity';
import { GetWeatherByCityPort } from '@/weather/domain/ports/GetWeatherByCity';
import { GetWeatherByCityAdapter } from '@/weather/infrastructure/adapters/GetWeatherByCity';

export const findFirmNameByUserIdProvider = {
  provide: GetWeatherByCityUC,
  useFactory: (getWeatherByCityPort: GetWeatherByCityPort) => {
    return new GetWeatherByCityUC(getWeatherByCityPort);
  },
  inject: [GetWeatherByCityAdapter],
};
