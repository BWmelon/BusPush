import {
    dingdingRobotSecret,
    dingdingWebhook,
    dingdingAtMobiles
} from '../config/keys'
import cryptoJs from 'crypto-js'

console.log('cryptoJs', cryptoJs);


function dingdingRobot(text) {
    if(!dingdingRobotSecret || !dingdingWebhook) return // 没有填写则不发送
    const timestamp = new Date().getTime()
    const dingdingRobotSecretStr = timestamp + '\n' + dingdingRobotSecret
    const signature = encodeURIComponent(cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA256(dingdingRobotSecretStr, dingdingRobotSecret)))

    let url = dingdingWebhook + `&timestamp=${timestamp}&sign=${signature}`
    wx.request({
        url,
        method: 'POST',
        data: {
            "at": {
                "atMobiles": dingdingAtMobiles,
                "atUserIds": [
                ],
                "isAtAll": false
            },
            "text": {
                "content": "腕上公交收到了一个反馈：" + text
            },
            "msgtype": "text"
        },
        json: true
    })
}

module.exports = dingdingRobot