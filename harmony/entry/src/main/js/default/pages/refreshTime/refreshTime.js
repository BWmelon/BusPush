import data_storage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@system.prompt';
export default {
    data: {
        min: 15,
        max: 60,
        refreshTime: 30,
    },
    onInit() {
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            if(!setting) {
                storage.putSync('setting', JSON.stringify({ autoQuery: false, refreshTime: 30, warn: false, warnTime: '3', readPrivacy: false }))
                storage.flushSync()
            }

            setting = JSON.parse(setting)
            this.refreshTime = setting.refreshTime
        }).catch((err) => {
            console.log(err)
        });
    },
    onChangeTime(e) {
        this.refreshTime = Math.round(e.progress)
        if(e.isEnd) {
            let context = featureAbility.getContext();
            context.getCacheDir().then(path => {
                let storage = data_storage.getStorageSync(path)
                //设置初始化
                let setting = storage.getSync('setting', '')

                setting = JSON.parse(setting)
                setting.refreshTime = this.refreshTime
                storage.putSync('setting', JSON.stringify(setting))
                storage.flushSync()
            }).catch((err) => {
                console.log(err)
            });
        }

    }
}
