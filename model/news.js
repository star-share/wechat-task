import axios from "./axios"
import config from "../config"

export default {
  networkhot: () => {
    return axios.get(`${config.TXAPI_NEWS_URL}?key=${config.TXAPIKEY}`);
  },

  zaoan: () => {
    return axios.get(`${config.TXAPI_ZAOAN_URL}?key=${config.TXAPIKEY}`);
  },

  wanan: () => {
    return axios.get(`${config.TXAPI_WANAN_URL}?key=${config.TXAPIKEY}`);
  },

  guonei: () => {
    return axios.get(
      `${config.TXAPI_GUONEI_URL}?key=${config.TXAPIKEY}&num=15`
    );
  },

  world: () => {
    return axios.get(`${config.TXAPI_WORLD_URL}?key=${config.TXAPIKEY}&num=15`);
  },
};