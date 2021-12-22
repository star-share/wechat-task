import { WechatyBuilder, log } from "wechaty";
import onScan from "./event/scan";
import onLogin from "./event/login";
import onLogout from "./event/logout";
import onMessage from "./event/message";

const bot = WechatyBuilder.build({
  name: "star-share-bot",
  puppet: "wechaty-puppet-wechat",
});

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);

bot
  .start()
  .then(() => log.info("StarterBot", "Starter Bot Started."))
  .catch((e) => log.error("StarterBot", e));
