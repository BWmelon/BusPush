import router from '@system.router';
import http from '@ohos.net.http';
import data_storage from '@ohos.data.storage';
import prompt from '@system.prompt';
import featureAbility from '@ohos.ability.featureAbility'
export default {
    data: {
        code: '643792',
        title: '',
    },
    onInit() {

    },
    /**
     * 收入code
     * @param e 输入回调
     */
    onInputCode(e) {
        this.code = e.value
    },
    /**
     * 确认添加
     */
    confirm() {
        if(!this.code) {
            prompt.showToast({message: '请输入查询码'})
            return
        }
        let httpRequest = http.createHttp();

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getCodeInfo?code=${this.code}`,
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            if(res.responseCode == 200) {
                let result = JSON.parse(res.result)
                if(result.errCode == 0) {
                    let context = featureAbility.getContext();
                    context.getCacheDir().then(path => {
                        let storage = data_storage.getStorageSync(path)
                        let codeInfoList = JSON.parse(storage.getSync('codeInfoList', '[]'))
                        if(codeInfoList.find(e => e.code == result.data.code)) {
                            prompt.showToast({message: '查询码已存在，无需重复添加'})
                            return
                        }
                        codeInfoList.push(result.data)
                        storage.putSync('codeInfoList', JSON.stringify(codeInfoList))
                        storage.flushSync()
                        router.replace({
                            uri: 'pages/code/code'
                        })
                    }).catch(() => {
                        prompt.showToast({message: '查询码保存失败，请联系管理员'})
                    });
                } else if(result.errCode == 1) {
                    prompt.showToast({message: '查询码不存在，请确认输入是否正确'})
                } else {
                    prompt.showToast({message: '搜索失败，请联系管理员'})
                }
            } else {
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }

        }).catch(err => {
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
