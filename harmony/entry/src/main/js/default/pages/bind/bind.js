import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        title: 'World'
    },
    confirm() {

        console.log('000')
        let httpRequest = http.createHttp();

        httpRequest.on('headerReceive', (header) => {
        })

        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            "https://api.no0a.cn/api/onenote/query",
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(res => {
            this.title = JSON.stringify(res)
        }).catch(err => {
            this.title = JSON.stringify(err)
        })
    },
    back() {
        router.back()
    }
}
