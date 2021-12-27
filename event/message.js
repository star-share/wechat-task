
import {log} from "wechaty"
import Config from "../config";
import News from "../model/news"
import reptile from "../model/reptile";
import weather from "../model/weather";
import {delay} from "../utils"
import _ from "lodash"

async function onMessageHandle(msg) {
    try {
      const room = msg.room(); // 是否为群消息
      const msgSelf = msg.self(); // 是否自己发给自己的消息
      if (msgSelf) return;
      if (room) {
        const roomName = await room.topic();
        const contact = msg.talker(); // 发消息人
        const contactName = contact.name();
        await dispatchRoomFilterByMsgType(this, room, msg);

      } else {
        // await dispatchFriendFilterByMsgType(this, msg);
      }
    } catch (e) {
      console.log("监听消息失败", e);
    }
}


/**
 * 根据消息类型过滤私聊消息事件
 * @param {*} that bot实例
 * @param {*} msg 消息主体
 */
async function dispatchFriendFilterByMsgType(that, msg) {
  try {
    const type = msg.type()
    const contact = msg.talker() // 发消息人
    const isOfficial = contact.type() === that.Contact.Type.Official
    let content = ''
    let replys = []
    switch (type) {
      case that.Message.Type.Text:
        content = msg.text()
        // if (!isOfficial) {
        //   console.log(`发消息人${await contact.name()}:${content}`)
        //   if (content.trim()) {
        //     replys = await getContactTextReply(that, contact, content)
        //     for (let reply of replys) {
        //       await delay(1000)
        //       await contactSay(contact, reply)
        //     }
        //   }
        // } else {
        //   console.log('公众号消息')
        // }
        break
      case that.Message.Type.Emoticon:
        console.log(`发消息人${await contact.name()}:发了一个表情`)
        break
      case that.Message.Type.Image:
        console.log(`发消息人${await contact.name()}:发了一张图片`)
        break
      case that.Message.Type.Url:
        console.log(`发消息人${await contact.name()}:发了一个链接`)
        break
      case that.Message.Type.Video:
        console.log(`发消息人${await contact.name()}:发了一个视频`)
        break
      case that.Message.Type.Audio:
        console.log(`发消息人${await contact.name()}:发了一个视频`)
        break
      default:
        break
    }
  } catch (error) {
    console.log('监听消息错误', error)
  }
}

/**
 * 根据消息类型过滤群消息事件
 * @param {*} that bot实例
 * @param {*} room room对象
 * @param {*} msg 消息主体
 */
async function dispatchRoomFilterByMsgType(that, room, msg) {
  try {
    const contact = msg.talker() // 发消息人
    const contactName = contact.name()
    const roomName = await room.topic()
    const type = msg.type()
    // const userSelfName = that.userSelf().name()

    if(!checkRoomName(roomName)) return;

    let content = ''
    let replys = ''
    // let contactId = contact.id || '111'
    // let contactAvatar = await contact.avatar()
    switch (type) {
      case that.Message.Type.Text:
        content = msg.text();
        log.info(
          `群名: ${roomName} 发消息人: ${contactName} 内容: ${content}`
        );

        // 获取关键字回复
        const replysArr = await getKeywordReplyHandle(msg)
        
        // 发送
        await delay(1000);
        replysArr.length > 0 && room.say(replysArr.join("<br/>"));
       
        break;
      case that.Message.Type.Emoticon:
        content = msg.text();
        console.log(
          `群名: ${roomName} 发消息人: ${contactName} 发了一个表情 ${content}`
        );
        break;
      case that.Message.Type.Image:
        console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一张图片`);
        break;
      case that.Message.Type.Url:
        console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个链接`);
        break;
      case that.Message.Type.Video:
        console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个视频`);
        break;
      case that.Message.Type.Audio:
        console.log(`群名: ${roomName} 发消息人: ${contactName} 发了一个语音`);
        break;
      default:
        break;
    }
  } catch (e) {
    console.log('error', e)
  }
}

/**
 * 检测群名称，是否开功能
 */
function checkRoomName(roomName){
  // log.info("roomName", roomName);
  if (Config.OPEN_ROOM_LIST.includes(roomName)) {
    return true;
  }
  return false;
}


/**
 * 获取关键字的回复
 * @param {msg} msg 
 * @returns 
 */
async function getKeywordReplyHandle(msg){
  const content = msg.text();
  let replysArr = [];

  // 查找消息是否有关键字
  const keywordArr = Config.ROOM_KEYWORD.reduce((arr, item) => {
    if (content.indexOf(item) > -1) {
      arr.push(item);
    }
    return arr;
  }, []);

  // 新闻
  if (keywordArr.includes("新闻")) {
    const res = await News.networkhot();
    if (res?.msg === "success") {
      res?.newslist.map((item, i) => {
        if (i >= 15) return;
        replysArr.push(`${i + 1}、${item.title}`);
      });
    } else {
      log.info(JSON.stringify(res));
    }
  }

  // 早安  鸡汤
  if (keywordArr.includes("早安") || keywordArr.includes("鸡汤")) {
    const res = await News.zaoan();
    if (res?.msg === "success") {
      res?.newslist.map((item, i) => {
        replysArr.push(`【微语】${item.content}`);
      });
    } else {
      log.info(JSON.stringify(res));
    }
  }

  // 晚安
  if (keywordArr.includes("晚安")) {
    const res = await News.wanan();
    if (res?.msg === "success") {
      res?.newslist.map((item, i) => {
        replysArr.push(`${item.content}`);
      });
    } else {
      log.info(JSON.stringify(res));
    }
  }

  // 诗词
  if (keywordArr.includes("诗词")) {
    const shici = await reptile.getDayShiCi();
    if (shici?.title) {
      replysArr.push(Object.values(shici).join("<br/>"));
    } else {
      log.info(JSON.stringify(res));
    }
  }

  // 天气
  const cityName = content.replace("天气", "");
  if (keywordArr.includes("天气") && cityName.length) {
    const cityIdData = await weather.getLocationId(cityName);
    const cityId = _.get(cityIdData, "location[0].id", "");
    if (cityId) {
      const weatherData = await weather.getWeather(cityId);
      if (weatherData.code == 200) {
        const { daily } = weatherData;
        replysArr.push(
          `${_.get(cityIdData, "location[0].name", "")} ${
            daily[0].fxDate
          }的天气`
        );
        replysArr.push(`白天：${daily[0].textDay}`);
        replysArr.push(`晚间：${daily[0].textNight}`);
        replysArr.push(`气温：${daily[0].tempMin}°C~${daily[0].tempMax}°C`);
      }
    }
  }

  return replysArr;
}

export default onMessageHandle