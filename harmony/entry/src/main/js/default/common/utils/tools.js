import prompt from '@system.prompt';
import data_storage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility'

const getStorage = () => {
    return new Promise((resolve, reject) => {
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')

            if(!setting) {
                let str = JSON.stringify({
                    autoQuery: false,
                    refreshTime: 30,
                    warn: false,
                    warnTime: '3',
                    readPrivacy: false,
                    userInfo: {
                        userCode: ''
                    }
                })
                storage.putSync('setting', str)
                storage.flushSync()
            }
            resolve(storage)
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
            reject()
        });
    })
}

export {
    getStorage
}