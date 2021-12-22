import axios from "./axios"
import Config from "../config"

export default {
  networkhot: () => {
    return axios.get(`${Config.TXAPI_NEWS_URL}?key=${Config.TXAPIKEY}`);
  },

  zaoan: () => {
      return axios.get(`${Config.TXAPI_ZAOAN_URL}?key=${Config.TXAPIKEY}`);
  }
};