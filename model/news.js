import axios from "./axios"
import config from "../config"
import * as cheerio from "cheerio";
import { log } from "wechaty";

export default {
  networkhot: () => {
    return axios.get(`${config.TXAPI_NEWS_URL}?key=${config.TXAPIKEY}`);
  },

  zaoan: () => {
      return axios.get(`${config.TXAPI_ZAOAN_URL}?key=${config.TXAPIKEY}`);
  },

  guonei: () => {
    return axios.get(`${config.TXAPI_GUONEI_URL}?key=${config.TXAPIKEY}&num=15`);
  },

  world: () => {
      return axios.get(`${config.TXAPI_WORLD_URL}?key=${config.TXAPIKEY}&num=15`);
  },

  // 每日一句
  getOneDay: async () => {
    try {
      let res = await axios.get(config.ONE, {
        headers: {
          Accept: "text/plain, text/html, */*",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        },
      });
      let $ = cheerio.load(res);
      let todayOneList = $('#carousel-one .carousel-inner .item');
      let todayOne = $(todayOneList[0])
        .find('.fp-one-cita')
        .text()
        .replace(/(^\s*)|(\s*$)/g, '');
      return todayOne;
    } catch (error) {
      console.log('获取每日一句失败：', error);
    }
  }
};