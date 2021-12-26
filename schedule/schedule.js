// 定时任务
import * as schedule from "node-schedule"
import { log } from "wechaty";
import config from "../config";
import news from "../model/news";
import reptile from "../model/reptile";
import { delay } from "../utils";

// 早上定时任务
export async function morning(that, scheduleConfig, scheduleName) {

  log.info(scheduleName)
    let replyArr = [];
    const getReplyHandle = async () => {
      // 国内新闻
      const guoneiNews = await news.guonei();
      if (guoneiNews?.msg === "success") {
        replyArr.push("【国内新闻】");
        guoneiNews?.newslist.map((item, i) => {
          replyArr.push(`${i + 1}、${item.title}`);
        });
      }

      // 国际新闻
      const worldNews = await news.world();
      if (worldNews?.msg === "success") {
        replyArr.push("【国际新闻】");
        worldNews?.newslist.map((item, i) => {
          replyArr.push(`${i + 1}、${item.title}`);
        });
      }

      // 每日一句
      const dayOne = await reptile.getOneDay();
      if (dayOne) {
        replyArr.push(`【心语】${dayOne}`);
      }
      log.info(dayOne);
    }

    config.OPEN_ROOM_LIST.forEach(async (roomName) => {
        let room = await that.Room.find({ topic: roomName })
        if (!room) {
            log.info(`查找不到群：${roomName}，请检查群名是否正确`);
            return
        }

        schedule.scheduleJob(scheduleName, { rule: scheduleConfig.date, tz: "Asia/Shanghai" }, async () => {
            if (replyArr.length === 0) await getReplyHandle();

            // 发送
            await delay(1000);
            replyArr.length && room.say(replyArr.join("<br/><br/>"));
        });

    })
    
}

// 中午的定时任务
export async function noon(that, scheduleConfig, scheduleName) {
  log.info(scheduleName);
  const shici = await reptile.getDayShiCi();

  config.OPEN_ROOM_LIST.forEach(async (roomName) => {
    let room = await that.Room.find({ topic: roomName });
    if (!room) {
      log.info(`查找不到群：${roomName}，请检查群名是否正确`);
      return;
    }

    schedule.scheduleJob(
      scheduleName,
      { rule: scheduleConfig.date, tz: "Asia/Shanghai" },
      async () => {
        // 发送
        await delay(1000);
        const replyArr = Object.values(shici);
        replyArr.length && room.say(replyArr.join("<br/><br/>"));
      }
    );
  });
}


// 下午的定时任务
export function afternoon(that, scheduleConfig, scheduleName){




}


export default {
    morning,
    afternoon,
    noon
}