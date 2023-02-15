import router from '@system.router';
import prompt from '@system.prompt';
import http from '@ohos.net.http';
import { getStorage } from '../../common/utils/tools'

export default {
    data: {
        lineList: [],
        showLoading: false,
        userInfo: {
            userCode: ''
        }
    },
    onInit() {
        getStorage().then(storage => {
            //设置初始化
            let setting = storage.getSync('setting', '')

            setting = JSON.parse(setting)

            // 判断身份码
            if (setting.userInfo.userCode) {
                this.userInfo.userCode = setting.userInfo.userCode
            }

            let data = storage.getSync('lineList', '[]')
            this.lineList = JSON.parse(data)
            this.judgeLoop()

            if (!setting.readPrivacy) {
                // 没有同意隐私政策，跳转隐私政策页面
                this.openPage('privacy')
            } else if (!this.userInfo.userCode) {
                // 没有身份码，自动跳转到扫码页面
                this.openPage('generate')
            } else {
                // 判断自动查询
                if (setting.autoQuery) {
                    this.lineList.map(item => {
                        item.startSec = Number(item.startTime.split(':')[0]) * 3600 + Number(item.startTime.split(':')[1]) * 60
                        item.endSec = Number(item.endTime.split(':')[0]) * 3600 + Number(item.endTime.split(':')[1]) * 60
                    })

                    let now = new Date()

                    let nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

                    let index = this.lineList.findIndex(e => {
                        return nowSec >= e.startSec && nowSec <= e.endSec
                    })
                    if (index !== -1) {
                        // 当前时间在范围内，自动跳转对应项
                        this.openRealtime(this.lineList[index]._id)
                    } else {
                        // 不存在，自动跳转到第一个
                        this.openRealtime(this.lineList[0]._id)
                    }
                }

            }
        }).catch((err) => {
            prompt.showToast({ message: '初始化配置失败，请联系管理员' })
        });

        router.clear();
    },
    /**
     * 判断是否需要滚动
     */
    judgeLoop() {
        this.lineList.map(e => {
            e.nameLoop = e.name.length > 7
            e.snLoop = e.sn.length > 7
            e.lineSn = e.startSn.length + e.endSn.length + 3 > 7
        })
    },
    /**
     * 显示删除弹窗(暂时不需要)
     * @param id 查询id
     */
    showDeleteDialog(id) {
        return
        prompt.showDialog({
            title: '提示',
            message: '是否确认删除？',
            buttons: [{
                    text: '取消',
                    color: '#eee'
                },
                {
                    text: '确认',
                    color: '#f00'
                }
            ],
            success: (data) => {
                if (data.index === 1) {
                    this.lineList.splice(this.lineList.findIndex(e => e._id == id), 1)
                    getStorage().then(storage => {
                        storage.putSync('lineList', JSON.stringify(this.lineList))
                        storage.flushSync()
                    })
                }
            }
        })
    },
    /**
     * 刷新查询列表
     */
    refreshLineList() {
        this.showLoading = true
        let httpRequest = http.createHttp();

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getUserInfo?userCode=${this.userInfo.userCode}`, {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.showLoading = false
            if (res.responseCode == 200) {
                let result = JSON.parse(res.result)
                if (result.errCode == 0) {
                    getStorage().then(storage => {
                        // 保存查询路线信息
                        let lineList = JSON.parse(storage.getSync('lineList', '[]'))
                        lineList = result.lines
                        this.lineList = lineList
                        this.judgeLoop()
                        storage.putSync('lineList', JSON.stringify(lineList))
                        storage.flushSync()
                        prompt.showToast({ message: '路线刷新成功' })
                    }).catch(() => {
                        prompt.showToast({ message: '查询路线保存失败，请联系管理员' })
                    });
                } else {
                    prompt.showToast({ message: result.errMsg })
                }
            } else {
                prompt.showToast({ message: '网络连接失败，请联系管理员' })
            }
        }).catch(err => {
            this.showLoading = false
            prompt.showToast({ message: '网络连接失败，请联系管理员' })
        })
    },
    /**
     * 打开实时页面
     * @param id 查询id
     */
    openRealtime(id) {
        router.push({
            uri: 'pages/realtime/realtime',
            params: {
                id
            }
        })
    },
    /**
     * 打开页面
     * @param name 页面名
     */
    openPage(name) {
        router.push({
            uri: `pages/${name}/${name}`
        })
    },
}