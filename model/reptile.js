import axios from "./axios";
import config from "../config";
import * as cheerio from "cheerio";
import { log } from "wechaty";
import fs from "fs";
import path from "path";


const HTML_HEADERS = {
  Accept: "text/plain, text/html, */*",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
};

export default {
  // 每日一句
  getOneDay: async () => {
    try {
      let res = await axios.get(config.MEIRI_ONE_STR, {
        headers: HTML_HEADERS,
      });
      let $ = cheerio.load(res);
      let todayOneList = $("#carousel-one .carousel-inner .item");
      let todayOne = $(todayOneList[0])
        .find(".fp-one-cita")
        .text()
        .replace(/(^\s*)|(\s*$)/g, "");
      return todayOne;
    } catch (error) {
      console.log("获取每日一句失败：", error);
    }
  },

  // 每日诗词
  getDayShiCi: async () => {
    try {
      let res = await axios.get(config.MEIRISHICI_URL, {
        headers: HTML_HEADERS,
      });
      let $ = cheerio.load(res);
      let title = $("#container h2.mb-5.text-center").find("a").text();
      let text = $("#container .display-pre.text-center").text();
      let auth = $("#container .time-meta .text-right.col-6").text();

      return {
        title,
        auth,
        text,
      };
    } catch (error) {
      console.log("获取每日诗词失败：", error);
    }
  },

  // 获取美女图  del
  getMeinv: async (pageIndex) => {
    const fileUrl = path.resolve(`model/data/meinv${pageIndex}.json`);
    const meinvData = fs.readFileSync(fileUrl);
    return JSON.parse(meinvData)
  },

  // 获取壁纸
  getBizhi: async (index) => {
    try {
       const url = config.MEINV_IMG_URL.replace("{index}", index);
       const res = await axios.get(url, {
         headers: HTML_HEADERS,
       });
       let $ = cheerio.load(res);
       const img = $(".endpage .pic img").attr("src");
       return img;
      
    } catch (error) {
      console.log("获取壁纸失败！", error);
    }
  },

};
