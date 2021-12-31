import axios from "./axios"
import config from "../config"

export default {
  // 当前热门新闻
  networkhot: () => {
    return axios.get(`${config.TXAPI_NEWS_URL}?key=${config.TXAPIKEY}`);
  },

  // 早安心语
  zaoan: () => {
    return axios.get(`${config.TXAPI_ZAOAN_URL}?key=${config.TXAPIKEY}`);
  },

  // 晚安心语
  wanan: () => {
    return axios.get(`${config.TXAPI_WANAN_URL}?key=${config.TXAPIKEY}`);
  },

  // 国内新闻
  guonei: () => {
    return axios.get(
      `${config.TXAPI_GUONEI_URL}?key=${config.TXAPIKEY}&num=15`
    );
  },

  // 国际新闻
  world: () => {
    return axios.get(`${config.TXAPI_WORLD_URL}?key=${config.TXAPIKEY}&num=15`);
  },

  // 古籍名句
  gujimingju: () => {
    return axios.get(`${config.TXAPI_GJMJ_URL}?key=${config.TXAPIKEY}`);
  },

  // 毒鸡汤
  dujitang: () => {
    return axios.get(`${config.TXAPI_DUJITANG_URL}?key=${config.TXAPIKEY}`);
  },

  // 成语典故
  chengyudiangu: (word) => {
    return axios.post(
      `${config.TXAPI_CHENGYU_URL}`,
      {
        key: config.TXAPIKEY,
        word
      }
    );
  },

  // 唐诗三百
  tangshisanbai: () => {
    return axios.get(`${config.TXAPI_POETRY_URL}?key=${config.TXAPIKEY}`);
  },
};