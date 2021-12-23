import { log } from "wechaty"
import { delay } from "../utils"

export default (user) => {
  log.info('StarterBot', '%s logout', user)
  config.OPEN_ROOM_LIST.forEach(async (roomName) => {
    let room = await that.Room.find({ topic: roomName });
    if (!room) {
      log.log(`查找不到群：${roomName}，请检查群名是否正确`);
      return;
    }

    // 发送
    await delay(1000);
    room.say("小助手已登出！请去登录！");
  })
}