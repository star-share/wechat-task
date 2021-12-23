// 定时任务
import * as schedule from "node-schedule"
import { log } from "wechaty";
import config from "../config";
import news from "../model/news";
import { delay } from "../utils";

// 早上定时任务
export async function morning(that, scheduleConfig, scheduleName) {
    log.info(scheduleName);
    config.OPEN_ROOM_LIST.forEach(async (roomName) => {
        let room = await that.Room.find({ topic: roomName })
        if (!room) {
            log.log(`查找不到群：${roomName}，请检查群名是否正确`)
            return
        }

        schedule.scheduleJob(scheduleName, { rule: scheduleConfig.date, tz: "Asia/Shanghai" }, async () => {
            let replyArr = [];
            // 国内新闻
            const guoneiNews = await news.guonei()
            if(guoneiNews?.msg === "success"){
                replyArr.push("【国内新闻】")
                guoneiNews?.newslist.map((item, i) => {
                    replyArr.push(`${i + 1}、${item.title}`);
                });
            }

            // 国际新闻
            const worldNews = await news.world()
            if(worldNews?.msg === "success"){
                replyArr.push("【国际新闻】")
                worldNews?.newslist.map((item, i) => {
                    replyArr.push(`${i + 1}、${item.title}`);
                });
            }

            // 每日一句
            const dayOne = await news.getOneDay()
            if(dayOne){
                replyArr.push(`【心语】${dayOne}`)
            }
            log.info(dayOne)

            // 发送
            await delay(1000);
            replyArr.length && room.say(replyArr.join("<br/><br/>"));
        });

    })
    
}

export function afternoon(that, scheduleConfig, scheduleName){

}


export default {
    morning,
    afternoon
}