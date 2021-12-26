export default {
  TXAPIKEY: "e0ba5fe507b02561cb04ec8ae2d44c52", // 必填，天行数据key，
  TXAPI_NEWS_URL: "http://api.tianapi.com/networkhot/index", // 当前热点新闻
  TXAPI_ZAOAN_URL: "http://api.tianapi.com/zaoan/index", // 早安
  TXAPI_GUONEI_URL: "http://api.tianapi.com/guonei/index", // 国内新闻
  TXAPI_WORLD_URL: "http://api.tianapi.com/world/index", // 国际新闻
  MEIRI_ONE_STR: "http://wufazhuce.com/", // 每日一句网址
  MEIRISHICI_URL: "https://meirishici.com/", // 每日诗词

  QRCODE_URL: "https://wechaty.js.org/qrcode/",

  // 启动功能群 名称
  OPEN_ROOM_LIST: ["hello world"],

  // 群消息关键字判断
  ROOM_KEYWORD: ["新闻", "鸡汤", "早安", "诗词"],

  // todo mysql存储 schedule   // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
  SCHEDULE_DATA_LIST: [
    {
      date: "0 0 7 * * *",
      event: "morning",
    },
    {
      date: "0 0 12 * * *",
      event: "noon",
    },
    {
      date: "0 0 15 * * *",
      event: "afternoon",
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
