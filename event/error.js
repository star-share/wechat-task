import { log } from "wechaty";

export default function onError(e) {
  log.info("StarterBot", "erro :%s", e);
};
