import router from '@system.router';
import http from '@ohos.net.http';
import data_storage from '@ohos.data.storage';
export default {
    data: {
        title: 'World',
        code: '22'
    },
    onInputCode(e) {
        console.log(e.value)
        this.code = e.value
    },
    confirm() {
//        let path = '/data/storage/el2/database'
        let path = '/'
        let storage = data_storage.getStorageSync(path + '/test')
//        storage.putSync('code', '123456')
//        storage.flushSync()

//        this.code = storage.getSync('code', 'no')
//
//        router.push({
//            uri: 'pages/code/code'
//        })

        let httpRequest = http.createHttp();

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `http://buspushapi.bwmelon.com/watch/getRealtime?code=${this.code}`,
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.code = JSON.stringify(res)
        }).catch(err => {
            this.code = JSON.stringify(err)
        })
    },
    back() {
        router.back()
    }
}
