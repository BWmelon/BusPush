import http from '@ohos.net.http';
import prompt from '@system.prompt';
export default {
    data: {
        refresh: false,
        title: "",
        code: '',
        codeInfo: {},
        realtimeInfo: {},
        buses: [{
                    "acBus": 0,
                    "activityLink": "",
                    "airStatus": 0,
                    "assistDesc": "别着急，小车陪你一起等",
                    "awayTag": 0,
                    "beforeBaseIndex": 64,
                    "beforeLat": 31.94690803278997,
                    "beforeLng": 118.74810148871966,
                    "busBaseIndex": 64,
                    "busDesc": "",
                    "busDescList": [],
                    "busDescOnLine": "",
                    "busId": "354013",
                    "capacity": 0,
                    "cityId": "018",
                    "datasource": 0,
                    "delay": 0,
                    "delayDesc": "",
                    "display": 0,
                    "distanceToSc": 259,
                    "distanceToWaitStn": 6818,
                    "from": 33,
                    "jrDataSrc": 173,
                    "lat": 31.94696130376519,
                    "licence": "354013",
                    "link": "",
                    "lng": 118.74815848334364,
                    "mTicket": 0,
                    "mileage": 3278.0,
                    "mileageOff": 0,
                    "mileageOn": 0,
                    "nearestToUser": false,
                    "newLink": "",
                    "order": 7,
                    "passStnTimeMS": -1,
                    "rType": 0,
                    "shareId": "",
                    "showDistance": 1,
                    "speed": 7.8,
                    "state": 0,
                    "syncTime": 1,
                    "tagDesc": "",
                    "travels": [{
                                    "arrivalTime": 1658819831389,
                                    "debusCost": 0,
                                    "debusTime": 0,
                                    "distance": 0,
                                    "optArrivalTime": 1658819831389,
                                    "optimisticTime": 1228,
                                    "order": 18,
                                    "pRate": -1.0,
                                    "recommTip": "15:17",
                                    "travelTime": 1228
                                }],
                    "updateFrom": 32,
                    "userName": "",
                    "userPhoto": ""
                }, {
                    "acBus": 0,
                    "activityLink": "",
                    "airStatus": 0,
                    "assistDesc": "别着急，小车陪你一起等",
                    "awayTag": 0,
                    "beforeBaseIndex": 121,
                    "beforeLat": 31.96737745339094,
                    "beforeLng": 118.75736922218506,
                    "busBaseIndex": 121,
                    "busDesc": "",
                    "busDescList": [],
                    "busDescOnLine": "",
                    "busId": "343898",
                    "capacity": 0,
                    "cityId": "018",
                    "datasource": 0,
                    "delay": 0,
                    "delayDesc": "",
                    "display": 0,
                    "distanceToSc": 853,
                    "distanceToWaitStn": 4287,
                    "from": 33,
                    "jrDataSrc": 173,
                    "lat": 31.967449039821613,
                    "licence": "343898",
                    "link": "",
                    "lng": 118.75737772750357,
                    "mTicket": 0,
                    "mileage": 5811.0,
                    "mileageOff": 0,
                    "mileageOn": 0,
                    "nearestToUser": false,
                    "newLink": "",
                    "order": 12,
                    "passStnTimeMS": -1,
                    "rType": 0,
                    "shareId": "",
                    "showDistance": 1,
                    "speed": 9.8,
                    "state": 0,
                    "syncTime": 2,
                    "tagDesc": "",
                    "travels": [{
                                    "arrivalTime": 1658819424389,
                                    "debusCost": 0,
                                    "debusTime": 0,
                                    "distance": 0,
                                    "optArrivalTime": 1658819424389,
                                    "optimisticTime": 821,
                                    "order": 18,
                                    "pRate": -1.0,
                                    "recommTip": "15:10",
                                    "travelTime": 821
                                }],
                    "updateFrom": 32,
                    "userName": "",
                    "userPhoto": ""
                }]
    },
    onInit() {
        this.title = this.code
        this.getRealtime()
    },
    /**
     * 下拉刷新
     */
    pullDownRefresh() {
        this.refresh = true
        this.getRealtime()
    },
    /**
     * 获取实时信息
     * @param code 查询码
     */
    getRealtime() {
        let httpRequest = http.createHttp();
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getRealtime?code=${this.code}`,
            {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.refresh = false
            if(res.responseCode == 200) {
                let result = JSON.parse(res.result)
                if(result.errCode == 0) {
                    this.codeInfo = result.data.codeInfo
                    this.realtimeInfo = result.data.realtime.data
                    this.buses = result.data.realtime.data.buses

                } else if(result.errCode == 1) {
                    prompt.showToast({message: result.errMsg})
                } else {
                    prompt.showToast({message: '系统出错，请联系管理员'})
                }
            } else {
                this.title = JSON.stringify(res)
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }

        }).catch(err => {
            if(this.refresh) {
                prompt.showToast({message: '刷新失败'})
            }
            this.refresh = false
            this.title = JSON.stringify(err)
            prompt.showToast({message: '网络连接失败，请联系管理员'})
        })
    }
}
