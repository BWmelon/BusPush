import router from '@system.router';
import http from '@ohos.net.http';
import prompt from '@system.prompt';
import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        userCode: '',
        showLoading: false
    },
    onShow() {
        getStorage().then(storage => {
            let setting = storage.getSync('setting', '')

            setting = JSON.parse(setting)

            // 如果存在身份码，则带入修改
            if(setting.userInfo.userCode != '') {
                this.userCode = setting.userInfo.userCode
            }
        }).catch((err) => {
            prompt.showToast({message: '初始化配置失败，请联系管理员'})
        })
    },
    /**
     * 收入code
     * @param e 输入回调
     */
    onInputCode(e) {
        this.userCode = e.value
    },
    /**
     * 确认添加
     */
    confirm() {
        if(!this.userCode) {
            prompt.showToast({message: '请输入身份码'})
            return
        }
        this.showLoading = true
        let httpRequest = http.createHttp();

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getUserInfo?userCode=${this.userCode}`,
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.showLoading = false
            if(res.responseCode == 200) {
                let result = JSON.parse(res.result)
                if(result.errCode == 0) {
                    getStorage().then(storage => {
                        // 保存身份码
                        let setting = storage.getSync('setting', '')
                        setting = JSON.parse(setting)
                        setting.userInfo.userCode = result.userInfo.userCode
                        storage.putSync('setting', JSON.stringify(setting))
                        // 保存查询路线信息
                        let lineList = JSON.parse(storage.getSync('lineList', '[]'))
                        lineList = result.lines
                        storage.putSync('lineList', JSON.stringify(lineList))
                        storage.flushSync()
                        // 远程模拟器绑定后无法跳到首页，真机可以
                        router.replace({
                            uri: 'pages/code/code'
                        })
                    }).catch(() => {
                        prompt.showToast({message: '身份码绑定失败，请联系管理员'})
                    });
                } else {
                    prompt.showToast({message: result.errMsg})
                }
            } else {
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }
        }).catch(err => {
            this.showLoading = false
            prompt.showToast({message: '网络连接失败，请联系管理员'})
        })
    },
    /**
     * 取消
     */
    back() {
        router.back()
    }
}
