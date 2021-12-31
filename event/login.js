import { log } from "wechaty"
import schedule from "../schedule"

// export default (user) => {
export default function onLogin(user){
  log.info('StarterBot', '%s login', user)

  log.info("启动计划任务！")
  schedule(this)

  // // 群内 进行登录提示
  // config.OPEN_ROOM_LIST.forEach(async (roomName) => {
  //   let room = await this.Room.find({ topic: roomName })
  //   if (!room) {
  //       log.info(`查找不到群：${roomName}，请检查群名是否正确`)
  //       return
  //   }
  //   setTimeout(()=>{
  //     // room.say(`每日提醒小助手已登录该群！`);
  //   }, 2000)
  // })
}


