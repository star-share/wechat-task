
import qrcodeTerminal from 'qrcode-terminal'
import { ScanStatus, log } from "wechaty"
import Config from "../config"

export default (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [Config.QRCODE_URL, encodeURIComponent(qrcode)].join(
      ""
    );
    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}