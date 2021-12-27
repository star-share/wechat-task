import { WechatyBuilder, log } from "wechaty";
import onScan from "./event/scan";
import onLogin from "./event/login";
import onLogout from "./event/logout";
import onMessage from "./event/message";
import onError from "./event/error"

const bot = WechatyBuilder.build({
  name: "star-share-bot",
  puppet: "wechaty-puppet-wechat",
});

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);
bot.on("error", onError);

bot
  .start()
  .then(() => log.info("StarterBot", "Starter Bot Started."))
  .catch(async (e) => {
    log.error("Bot", "init() fail: %s", e);
    process.exit(1);
  })