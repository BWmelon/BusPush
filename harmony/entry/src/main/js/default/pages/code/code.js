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
            let data = storage.getSync('codeInfoList', '[]')
            this.codeInfoList = JSON.parse(data)
        }).catch(() => {
            prompt.showToast({message: '查询码获取失败，请联系管理员'})
        });
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
