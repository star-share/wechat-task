import schedule from "./schedule";
import config from "../config";


// 计划任务
export default (that) => {
    config.SCHEDULE_DATA_LIST.forEach((item, i) => {
        if (typeof schedule[item.event] === "function"){
            schedule[item.event](that, item, `schedule_name_${i}`);
        }
    })
}
