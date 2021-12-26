import schedule from "./schedule";
import config from "../config";
import { log } from "wechaty";
import reptile from "../model/reptile";



// 计划任务
export default async (that) => {



    config.SCHEDULE_DATA_LIST.forEach((item, i) => {
        if (typeof schedule[item.event] === "function"){
            schedule[item.event](that, item, `schedule_name_${i}`);
        }
    })
}
