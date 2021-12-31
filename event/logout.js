import { log } from "wechaty"
import { delay } from "../utils"

export default (user) => {
  log.info('StarterBot', '%s logout', user)
}