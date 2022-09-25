import router from '@system.router';
import data_storage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@system.prompt';
export default {
    data: {
        title: "",
        autoQuery: false,
        refreshTime: 0,
        warn: false
    },
    onShow() {
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
            this.autoQuery = setting.autoQuery
            this.refreshTime = setting.refreshTime
            this.warn = setting.warn
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
        })
    },
    handleChangeAutoQuery(e) {
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
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
        router.push({
            uri: `pages/${e}/${e}`,
        })
    }
}
