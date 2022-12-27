import router from '@system.router';
import prompt from '@system.prompt';
import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        title: "",
        autoQuery: false,
        refreshTime: 0,
        warn: false
    },
    onShow() {
        getStorage().then(storage => {
            let setting = storage.getSync('setting', '')

            setting = JSON.parse(setting)
            this.autoQuery = setting.autoQuery
            this.refreshTime = setting.refreshTime
            this.warn = setting.warn
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
        })
    },
    handleChangeAutoQuery(e) {
        getStorage().then(storage => {
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            setting.autoQuery = e.checked
            storage.putSync('setting', JSON.stringify(setting))
            storage.flushSync()
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 打开页面
     * @param e
     */
    openPage(e) {
        let params = {}
        if(e === 'privacy') {
            params.isClear = true
        }
        router.push({
            uri: `pages/${e}/${e}`,
            params
        })
    }
}
