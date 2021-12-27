import { log } from "wechaty";

export default function onError(e) {
  log.info("StarterBot", "erro :%s", e);
  config.OPEN_ROOM_LIST.forEach(async (roomName) => {
    let room = await that.Room.find({ topic: roomName });
    if (!room) {
      log.log(`查找不到群：${roomName}，请检查群名是否正确`);
      return;
    }

    room.say("小助手程序报错！");
  });
};
