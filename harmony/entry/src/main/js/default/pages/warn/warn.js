import data_storage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@system.prompt';
export default {
    data: {
        warn: false,
        warnTime: '3',
        range: [],
        selectedIndex: 0, // 索引
    },
    onInit() {
        this.initRange()
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            this.warn = setting.warn
            this.warnTime = setting.warnTime
            this.selectedIndex = this.range.findIndex(e => e === this.warnTime)
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '配置读取失败，请联系管理员'})
        })
    },
    /**
     * 初始化时间选
     */
    initRange() {
        new Array(15).fill('').map((e, index) => {
            this.range.push(String(index + 1))
        })
    },
    /**
     * 切换时间
     * @param newValue 时间
     */
    handleChangeWarnTime(e) {
        this.warnTime = e.newValue
        this.selectedIndex = this.range.findIndex(e => e === this.warnTime)
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            setting.warnTime = e.newValue
            storage.putSync('setting', JSON.stringify(setting))
            storage.flushSync()
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '保存失败，请联系管理员'})
        })
    },
    /**
     * 切换状态
     * @param e
     */
    handleChangeWarn(e) {
        this.warn = e.checked
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            setting.warn = e.checked
            storage.putSync('setting', JSON.stringify(setting))
            storage.flushSync()
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '保存失败，请联系管理员'})
        })
    },
}
