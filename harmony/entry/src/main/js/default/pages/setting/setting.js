import router from '@system.router';
import prompt from '@system.prompt';
import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        title: "",
        autoQuery: false,
        refreshTime: 0,
        warn: false,
        userInfo:{
            userCode: ''
        }
    },
    onShow() {
        getStorage().then(storage => {
            let setting = storage.getSync('setting', '')

            setting = JSON.parse(setting)
            this.autoQuery = setting.autoQuery
            this.refreshTime = setting.refreshTime
            this.warn = setting.warn

            if(setting.userInfo.userCode) {
                this.userInfo.userCode = setting.userInfo.userCode
            }
        }).catch((err) => {
            console.log(err)
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
        })
    },
    /**
     * 点击身份码事件
     */
    handleClickUserCode() {
        if(this.userInfo.userCode) {
            // 直接挑战到修改界面
            this.openPage('bind')
        } else {
            // 没有绑定，跳到扫码页面
            this.openPage('generate')
        }
    },
    /**
     * 切换自动查询
     * @param e
     */
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
