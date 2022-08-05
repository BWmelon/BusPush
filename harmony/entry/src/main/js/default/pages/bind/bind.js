import router from '@system.router';
import http from '@ohos.net.http';
import data_storage from '@ohos.data.storage';
import prompt from '@system.prompt';
export default {
    data: {
        title: 'World',
        code: '643792'
    },
    onInputCode(e) {
        console.log(e.value)
        this.code = e.value

    },
    confirm() {
        if(!this.code) {
            prompt.showToast({message: '请输入查询码'})
            return
        }
//        let path = '/data/storage/el2/database'
        let path = '/'
        let storage = data_storage.getStorageSync(path + '/test')
        storage.putSync('code', '123456')
        storage.flushSync()

        this.code = storage.getSync('code', 'no')

        router.push({
            uri: 'pages/code/code'
        })

        let httpRequest = http.createHttp();

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `http://buspushapi.bwmelon.com/watch/getCodeInfo?code=${this.code}`,
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.title = res.responseCode
            if(res.responseCode == 200) {
                let result = JSON.parse(res.result)
                this.title = typeof JSON.parse(result)
                if(result.errCode === 0) {
//                    this.title = JSON.stringify(res.data)
                } else if(result.errCode === 1) {
                    prompt.showToast({message: '查询码不存在，请确认输入是否正确'})
                } else {
//                    prompt.showToast({message: '搜索失败，请联系管理员'})
                    prompt.showToast({message: String(result.errCode)})
                }

            } else {
                this.title = JSON.stringify(res)
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }

        }).catch(err => {
            this.title = JSON.stringify(err)
            prompt.showToast({message: '网络连接失败，请联系管理员1'})
        })
    },
    back() {
        router.back()
    }
}
