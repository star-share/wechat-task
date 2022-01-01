// 定时任务
import * as schedule from "node-schedule";
import { log } from "wechaty";
import config from "../config";
import news from "../model/news";
import reptile from "../model/reptile";
import { delay } from "../utils";

// 获取room 
const getRoom = async (that, roomName) => {
  let room = await that.Room.find({ topic: roomName });
  if (!room) {
    log.info(`查找不到群：${roomName}，请检查群名是否正确`);
    return "";
  }
  return room;
};

// 早上定时任务
export async function morning(that, scheduleConfig, scheduleName) {
  log.info(scheduleName);

  
  const { roomName, date } = scheduleConfig;
  const room = await getRoom(that, roomName);

  const getReplyHandle = async () => {
    let replyArr = [];
    // 国内新闻
    const guoneiNews = await news.guonei();
    if (guoneiNews?.msg === "success") {
      replyArr.push("【国内新闻】");
      guoneiNews?.newslist.map((item, i) => {
        if(i < 10)replyArr.push(`${i + 1}、${item.title}`);
      });
    }

    // 国际新闻
    const worldNews = await news.world();
    if (worldNews?.msg === "success") {
      replyArr.push("【国际新闻】");
      worldNews?.newslist.map((item, i) => {
        if (i < 10)replyArr.push(`${i + 1}、${item.title}`);
      });
    }

    // 每日一句
    const dayOne = await reptile.getOneDay();
    if (dayOne) {
      replyArr.push(`【心语】${dayOne}`);
    }
    return replyArr
  };

  schedule.scheduleJob(
    scheduleName,
    { rule: date, tz: "Asia/Shanghai" },
    async () => {
      const replyArr = await getReplyHandle();
      // log.info(JSON.stringify(replyArr));
      // 发送
      await delay(1000);
      replyArr.length > 0 && room.say(replyArr.join("<br/><br/>"));
    }
  );
}

// 中午的定时任务
export async function noon(that, scheduleConfig, scheduleName) {
  log.info(scheduleName, "noon");

  const { roomName, date } = scheduleConfig;
  const room = await getRoom(that, roomName);

  schedule.scheduleJob(
    scheduleName,
    { rule: date, tz: "Asia/Shanghai" },
    async () => {
      const shici = await reptile.getDayShiCi();

      // 发送
      await delay(1000);
      const replyArr = Object.values(shici);
      replyArr.length > 0 && room.say(replyArr.join("<br/><br/>"));
    }
  );
}

// 下午的定时任务
export async function afternoon(that, scheduleConfig, scheduleName) {
  log.info(scheduleName, "afternoon--");

  const { roomName, date } = scheduleConfig;
  const room = await getRoom(that, roomName);

  schedule.scheduleJob(
    scheduleName,
    { rule: date, tz: "Asia/Shanghai" },
    async () => {
      const res = await news.gujimingju();
      let replyArr = [];
      if (res?.msg === "success") {
        res?.newslist.map((item, i) => {
          replyArr.push(`${item.content}`);
          replyArr.push(`${item.source}`);
        });
      } else {
        log.info(JSON.stringify(res));
      }
      // 发送
      await delay(1000);
      replyArr.length > 0 && room.say(replyArr.join("<br/><br/>"));
    }
  );
}

// aoao 定时
export async function night(that, scheduleConfig, scheduleName) {
  log.info(scheduleName, "night--");
  const { roomName, date } = scheduleConfig;
  const room = await getRoom(that, roomName);

  schedule.scheduleJob(
    scheduleName,
    { rule: date, tz: "Asia/Shanghai" },
    async () => {
      // 发送
      await delay(1000);
      room.say("@aoao 23：30了！放下手机睡觉了！");
    }
  );
}

// 晚安
export async function wanan(that, scheduleConfig, scheduleName) {
  log.info(scheduleName, "afternoon--");

  const { roomName, date } = scheduleConfig;
  const room = await getRoom(that, roomName);

  schedule.scheduleJob(
    scheduleName,
    { rule: date, tz: "Asia/Shanghai" },
    async () => {
      const res = await news.wanan();
      let replyArr = [];
      if (res?.msg === "success") {
        res?.newslist.map((item, i) => {
          replyArr.push(`${item.content}`);
        });
      } else {
        log.info(JSON.stringify(res));
      }
      // 发送
      await delay(1000);
      replyArr.length > 0 && room.say(replyArr.join("<br/><br/>"));
    }
  );
}


export default {
  morning,
  afternoon,
  noon,
  night,
  wanan,
};
