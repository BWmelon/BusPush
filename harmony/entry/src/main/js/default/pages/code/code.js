import data_storage from '@ohos.data.storage';
import router from '@system.router';
import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@system.prompt';
export default {
    data: {
        codeInfoList: []
    },
    onInit() {
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            if(!setting) {
                storage.putSync('setting', JSON.stringify({ autoQuery: false, refreshTime: 30, warn: false, warnTime: '3' }))
                storage.flushSync()
            }
            setting = JSON.parse(setting)

            let data = storage.getSync('codeInfoList', '[]')
            this.codeInfoList = JSON.parse(data)
            this.judgeLoop()

            if(!this.codeInfoList.length) {
                // 没有查询码，自动跳转到扫码页面
                this.openPage('generate')
            } else {
                // 判断自动查询
                if(setting.autoQuery) {
                    this.codeInfoList.map(item => {
                        item.startSec = Number(item.startTime.split(':')[0]) * 3600 + Number(item.startTime.split(':')[1]) * 60
                        item.endSec = Number(item.endTime.split(':')[0]) * 3600 + Number(item.end.split(':')[1]) * 60
                    })

                    let now = new Date()

                    let nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

                    let index = this.codeInfoList.findIndex(e => nowSec >= e.startSec && nowSec <= e.endSec)
                    if(index !== -1) {
                        // 当前时间在范围内，自动跳转对应项
                        this.openRealtime(this.codeInfoList[index].code)
                    } else {
                        // 不存在，自动跳转到第一个
                        this.openRealtime(this.codeInfoList[0].code)
                    }
                }

            }
        }).catch((err) => {
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
        });

        router.clear();
    },
    /**
     * 判断是否需要滚动
     */
    judgeLoop() {
        this.codeInfoList.map(e => {
            e.nameLoop = e.name.length > 7
            e.snLoop = e.sn.length > 7
            e.lineSn = e.startSn.length + e.endSn.length + 3 > 7
        })
    },
    /**
     * 显示删除弹窗
     * @param code 查询码
     */
    showDeleteDialog(code) {
        prompt.showDialog({
            title: '提示',
            message: '是否确认删除？',
            buttons: [
                {
                    text: '取消',
                    color: '#eee'
                },
                {
                    text: '确认',
                    color: '#f00'
                }
            ],
            success: (data) => {
                if(data.index === 1) {
                    this.codeInfoList.splice(this.codeInfoList.findIndex(e => e.code == code), 1)
                    let context = featureAbility.getContext();
                    context.getCacheDir().then(path => {
                        let storage = data_storage.getStorageSync(path)
                        storage.putSync('codeInfoList', JSON.stringify(this.codeInfoList))
                        storage.flushSync()
                    })
                }
            }
        })
    },
    /**
     * 打开实时页面
     * @param code 查询码
     */
    openRealtime(code) {
        router.push({
            uri: 'pages/realtime/realtime',
            params: {
                code
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
