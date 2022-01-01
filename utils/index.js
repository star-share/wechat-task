import { UrlLink, MiniProgram } from "wechaty";
import { FileBox } from "file-box";


/**
 * 延时函数
 * @param {*} ms 毫秒
 */
export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 群关键词回复
 * @param {*} contact
 * @param {*} msg
 * @param {*} isRoom
 */
export async function roomSay(room, contact, msg) {
  try {
    if (msg.type === 1 && msg.content) {
      // 文字
      // contact ? await room.say(msg.content, contact) : await room.say(msg.content)
    } else if (msg.type === 2 && msg.url) {
      // url文件
      let obj = FileBox.fromUrl(msg.url);
      // contact ? await room.say('', contact) : ''
      await room.say(obj);
    } else if (msg.type === 3 && msg.url) {
      // bse64文件
      let obj = FileBox.fromDataURL(msg.url, "room-avatar.jpg");
      // contact ? await room.say('', contact) : ''
      // await delay(500)
      await room.say(obj);
    } else if (msg.type === 4 && msg.url && msg.title && msg.description) {
      let url = new UrlLink({
        description: msg.description,
        thumbnailUrl: msg.thumbUrl,
        title: msg.title,
        url: msg.url,
      });
      console.log(url);
      await room.say(url);
    } else if (
      msg.type === 5 &&
      msg.appid &&
      msg.title &&
      msg.pagePath &&
      msg.description &&
      msg.thumbUrl &&
      msg.thumbKey
    ) {
      let miniProgram = new MiniProgram({
        appid: msg.appid,
        title: msg.title,
        pagePath: msg.pagePath,
        description: msg.description,
        thumbUrl: msg.thumbUrl,
        thumbKey: msg.thumbKey,
      });
      await room.say(miniProgram);
    }
  } catch (e) {
    console.log("群回复错误", e);
  }
}
