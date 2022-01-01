import keyConfig from "./ENV";

let keyData = {};
keyData = keyConfig;

export default {
  // 天行
  TXAPIKEY: keyData?.TXAPIKEY || "天行数据key", // 必填，天行数据key，
  TXAPI_NEWS_URL: "http://api.tianapi.com/networkhot/index", // 当前热点新闻
  TXAPI_ZAOAN_URL: "http://api.tianapi.com/zaoan/index", // 早安
  TXAPI_WANAN_URL: "http://api.tianapi.com/wanan/index", // 晚安
  TXAPI_GUONEI_URL: "http://api.tianapi.com/guonei/index", // 国内新闻
  TXAPI_WORLD_URL: "http://api.tianapi.com/world/index", // 国际新闻
  TXAPI_GJMJ_URL: "http://api.tianapi.com/gjmj/index", // 古籍名句
  TXAPI_DUJITANG_URL: "http://api.tianapi.com/dujitang/index", // 毒鸡汤
  TXAPI_CHENGYU_URL: "http://api.tianapi.com/chengyu/index", // 成语典故
  TXAPI_POETRY_URL: "http://api.tianapi.com/poetry/index", // 唐诗三百

  // 和风天气
  QWEATHER_KEY: keyData?.QWEATHER_KEY || "和风天气key",
  GET_CITY_ID_URL: "https://geoapi.qweather.com/v2/city/lookup",
  GET_WEATHER_URL: "https://devapi.qweather.com/v7/weather/3d",

  // 爬虫
  MEIRI_ONE_STR: "http://wufazhuce.com/", // 每日一句网址
  MEIRISHICI_URL: "https://meirishici.com/", // 每日诗词
  MEINV_IMG_URL: "http://www.netbian.com/desk/{index}.htm", // 壁纸 1-24000

  QRCODE_URL: "https://wechaty.js.org/qrcode/",

  // 关键字回复开启功能群
  OPEN_ROOM_LIST: ["hello 2022"],

  // 群消息关键字判断
  ROOM_KEYWORD: [
    "新闻",
    "毒鸡汤",
    "早安",
    "晚安",
    "诗词",
    "天气",
    "名句",
    "壁纸",
  ],

  // todo mysql存储 schedule   // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
  SCHEDULE_DATA_LIST: [
    {
      date: "0 0 6 * * *",
      event: "morning",
      roomName: "hello 2022",
    },
    {
      date: "0 0 12 * * *",
      event: "noon",
      roomName: "hello 2022",
    },
    {
      date: "0 0 18 * * *",
      event: "afternoon",
      roomName: "hello 2022",
    },
    {
      date: "0 30 23 * * *",
      event: "night",
      roomName: "hello 2022",
    },
    {
      date: "0 31 23 * * *",
      event: "wanan",
      roomName: "hello 2022",
    },
  ],

  /**
   * 关键词触发指定事件，适用于私聊与群聊
   * key: 关键词
   * position: 关键词所在位置 start 开头  middle 不限 end 结尾
   * event: 触发事件名称，更多查看事件字典
   */
  EVENTKEYWORDLIST: [
    // {key:'?',position:'start',event:'rubbish'},
    // {key:'名人名言',position:'middle',event:'mingyan'},
    {
      key: "新闻",
      position: "*",
      event: "rubbish",
    },
  ],
};
