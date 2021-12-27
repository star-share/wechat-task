import axios from "./axios";
import config from "../config";

export default {
  getLocationId: (city) => {
    return axios.get(
      `${config.GET_CITY_ID_URL}?key=${config.QWEATHER_KEY}&location=${encodeURI(city)}&lang=zh`
    );
  },
  getWeather: (cityId) => {
    return axios.get(
      `${config.GET_WEATHER_URL}?key=${config.QWEATHER_KEY}&location=${cityId}&lang=zh`
    );
  },
};
