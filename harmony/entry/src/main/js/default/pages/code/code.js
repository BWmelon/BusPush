import data_storage from '@ohos.data.storage';
import router from '@system.router';
import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@system.prompt';
export default {
    data: {
        codeInfoList: []
    },
    onInit() {
        router.clear();
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            let data = storage.getSync('codeInfoList', '[]')
            this.codeInfoList = JSON.parse(data)

            if(!this.codeInfoList.length) {
                // 没有查询码，自动跳转到扫码页面
                this.openPage('generate')
            }
        }).catch(() => {
            prompt.showToast({message: '查询码获取失败，请联系管理员'})
        });
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
