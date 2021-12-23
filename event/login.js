import { log } from "wechaty"
import schedule from "../schedule"

// export default (user) => {
export default function onLogin(user){
  log.info('StarterBot', '%s login', user)

  log.info("启动计划任务！")
  schedule(this)
}


