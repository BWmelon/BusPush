import http from '@ohos.net.http';
import prompt from '@system.prompt';
import data_storage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility'
import vibrator from '@system.vibrator';
import app from '@system.app'
export default {
    data: {
        title: "",
        code: '',
        showMap: false,
        stations: [], // 站点列表
        codeInfo: {},
        realtimeInfo: {},
        countdownOrigin: 30,
        countdown: 30,
        warn: false,
        warnTime: '3',
        running: null,
        buses: [],
        buses1: [{
                     "acBus": 0,
                     "activityLink": "",
                     "airStatus": 0,
                     "assistDesc": "别着急，小车陪你一起等",
                     "awayTag": 0,
                     "beforeBaseIndex": 76,
                     "beforeLat": 32.0038015781373,
                     "beforeLng": 118.78811832492084,
                     "busBaseIndex": 78,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343893",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 0,
                     "distanceToWaitStn": 13628,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.003817255953315,
                     "licence": "343893",
                     "link": "",
                     "lng": 118.78815452778215,
                     "mTicket": 0,
                     "mileage": 2859.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 6,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 5.2,
                     "state": 1,
                     "syncTime": 1,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663840978845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663840978845,
                                     "optimisticTime": 3318,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "18:02",
                                     "travelTime": 3318
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
                     "beforeBaseIndex": 161,
                     "beforeLat": 32.02330785126676,
                     "beforeLng": 118.77906347683214,
                     "busBaseIndex": 164,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343940",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 0,
                     "distanceToWaitStn": 10230,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.02335895108142,
                     "licence": "343940",
                     "link": "",
                     "lng": 118.77907671191564,
                     "mTicket": 0,
                     "mileage": 6215.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 13,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 5.0,
                     "state": 1,
                     "syncTime": 2,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663840120845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663840120845,
                                     "optimisticTime": 2460,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "17:48",
                                     "travelTime": 2460
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
                     "beforeBaseIndex": 265,
                     "beforeLat": 32.03399019356306,
                     "beforeLng": 118.80760465837051,
                     "busBaseIndex": 268,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343960",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 0,
                     "distanceToWaitStn": 6636,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.03398781957094,
                     "licence": "343960",
                     "link": "",
                     "lng": 118.80766398609141,
                     "mTicket": 0,
                     "mileage": 9828.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 18,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 10.0,
                     "state": 1,
                     "syncTime": 2,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663839182845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663839182845,
                                     "optimisticTime": 1522,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "17:33",
                                     "travelTime": 1522
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
                     "beforeBaseIndex": 329,
                     "beforeLat": 32.031071061467294,
                     "beforeLng": 118.83484435757272,
                     "busBaseIndex": 329,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343956",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 374,
                     "distanceToWaitStn": 3998,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.03107128480758,
                     "licence": "343956",
                     "link": "",
                     "lng": 118.83492922687945,
                     "mTicket": 0,
                     "mileage": 12484.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 23,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 1.4,
                     "state": 0,
                     "syncTime": 2,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663838618845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663838618845,
                                     "optimisticTime": 958,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "17:23",
                                     "travelTime": 958
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
                     "beforeBaseIndex": 402,
                     "beforeLat": 32.03796476011898,
                     "beforeLng": 118.85599297421001,
                     "busBaseIndex": 402,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343957",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 292,
                     "distanceToWaitStn": 1115,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.03797335511682,
                     "licence": "343957",
                     "link": "",
                     "lng": 118.8560772425584,
                     "mTicket": 0,
                     "mileage": 15370.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 29,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 2.0,
                     "state": 0,
                     "syncTime": 2,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663837935845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663837935845,
                                     "optimisticTime": 275,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "17:12",
                                     "travelTime": 275
                                 }],
                     "updateFrom": 32,
                     "userName": "",
                     "userPhoto": ""
                 }, {
                     "acBus": 0,
                     "activityLink": "",
                     "airStatus": 0,
                     "assistDesc": "点击查看地图位置",
                     "awayTag": 0,
                     "beforeBaseIndex": 414,
                     "beforeLat": 32.03926094499581,
                     "beforeLng": 118.86001349251853,
                     "busBaseIndex": 414,
                     "busDesc": "",
                     "busDescList": [],
                     "busDescOnLine": "",
                     "busId": "343886",
                     "capacity": 0,
                     "cityId": "018",
                     "datasource": 0,
                     "delay": 0,
                     "delayDesc": "",
                     "display": 0,
                     "distanceToSc": 256,
                     "distanceToWaitStn": 700,
                     "from": 33,
                     "jrDataSrc": 173,
                     "lat": 32.039293998059826,
                     "licence": "343886",
                     "link": "",
                     "lng": 118.86008888321511,
                     "mTicket": 0,
                     "mileage": 15785.0,
                     "mileageOff": 0,
                     "mileageOn": 0,
                     "nearestToUser": false,
                     "newLink": "",
                     "order": 30,
                     "passStnTimeMS": -1,
                     "rType": 0,
                     "shareId": "",
                     "showDistance": 1,
                     "speed": 5.0,
                     "state": 0,
                     "syncTime": 1,
                     "tagDesc": "",
                     "travels": [{
                                     "arrivalTime": 1663837816845,
                                     "debusCost": 0,
                                     "debusTime": 0,
                                     "distance": 0,
                                     "optArrivalTime": 1663837816845,
                                     "optimisticTime": 156,
                                     "order": 31,
                                     "pRate": -1.0,
                                     "recommTip": "17:10",
                                     "travelTime": 156
                                 }],
                     "updateFrom": 32,
                     "userName": "",
                     "userPhoto": ""
                 }]
    },
    onInit() {
        let context = featureAbility.getContext();
        context.getCacheDir().then(path => {
            let storage = data_storage.getStorageSync(path)
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            this.countdown = setting.refreshTime
            this.countdownOrigin = setting.refreshTime
            this.warn = setting.warn
            this.warnTime = setting.warnTime


            this.getRealtime()
            this.running = setInterval(() => {
                if(this.countdown <= 0) {
                    this.getRealtime()
                    this.countdown = this.countdownOrigin

                }
                this.countdown -= 0.1
            }, 100)
        }).catch((err) => {
            console.log(err)
        });
    },
    onDestroy() {
        clearInterval(this.running)
    },
    getIsArrived(item) {
        return item.travels[0].order - item.order === 0
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
            if(res.responseCode == 200) {
                let result = JSON.parse(res.result)

                if(result.errCode == 0) {
                    this.codeInfo = result.data.codeInfo
                    this.getStations()
                    this.realtimeInfo = result.data.realtime.data
                    let buses = result.data.realtime.data.buses.filter(e => e.travels.length > 0).reverse()
                    buses.map(e => {
                        e.class = 'buses-item'
                    })

                    // 判断到站提醒
                    if(buses.length && this.warn) {
                        let firstBus = buses[0]
                        let time = (firstBus.travels[0].travelTime / 60).toFixed(0)
                        if(time <= Number(this.warnTime)) {
                            // 在提前时间范围内，提醒
                            firstBus.class = 'buses-item-warn'
                            vibrator.vibrate({
                                mode: 'long',
                                success: function() {
                                    console.log('vibrate is successful');
                                },
                                fail: function(data, code) {
                                    console.log("vibrate is failed, data: " + data + ", code: " + code);
                                },
                                complete: function() {
                                    console.log('vibrate is completed');
                                }
                            });
                        }
                    }

                    this.buses = buses

                    this.title= JSON.stringify(this.buses)
                } else if(result.errCode == 1) {
                    prompt.showToast({message: result.errMsg})
                } else {
                    prompt.showToast({message: '系统出错，请联系管理员'})
                }
            } else {
//                this.title = JSON.stringify(res)
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }
            this.countdown = this.countdownOrigin
        }).catch(err => {
            this.title = JSON.stringify(err)
            prompt.showToast({message: '网络连接失败，请联系管理员'})
            this.countdown = this.countdownOrigin
        })
    },
    /**
     * 获取站点列表
     * @param code 查询码
     */
    getStations() {
        if(this.stations.length) {
            this.handleStationsBusDisplay()
        }
        // 已加载，不再请求
        if(this.stations.length !== 0) {
            return
        }
        let httpRequest = http.createHttp();
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getLineRoute?lineId=${this.codeInfo.lineId}&cityId=${this.codeInfo.cityId}`,
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
                    this.stations = result.data
                    this.handleStationsData()
                    this.handleStationsBusDisplay()
                } else if(result.errCode == 1) {
                    prompt.showToast({message: result.errMsg})
                } else {
                    prompt.showToast({message: '系统出错，请联系管理员'})
                }
            } else {
                //                this.title = JSON.stringify(res)
                prompt.showToast({message: '网络连接失败，请联系管理员'})
            }
            this.countdown = this.countdownOrigin
        }).catch(err => {
            this.title = JSON.stringify(err)
            prompt.showToast({message: '网络连接失败，请联系管理员'})
            this.countdown = this.countdownOrigin
        })
    },
    /**
     * 处理站点数据
     */
    handleStationsData() {
        this.stations.map(item => {
            item.sn = item.sn.slice(0, 7) + (item.sn.length > 7 ? '...' : '')
        })
    },
    /**
     * 处理地图公交显示
     */
    handleStationsBusDisplay() {
        this.stations.map(item => {
            let arr = this.buses.filter(e => e.order == item.order)
            if(arr.length) {
                let bus = arr[0]
                item.show = true
                item.class = bus.state === 1 ? 'map-item-bus-margin' : 'map-item-bus' // map-item-bus为已到站 map-item-bus-margin为在途中
            } else {
                item.show = false
                item.class = 'map-item-bus'
            }
        })
    },
    /**
     * 单机切换显示模式
     */
    handleClick() {
        this.showMap = !this.showMap
        this.$refs.container.scrollBy({
            dy: this.showMap ? this.codeInfo.targetOrder * 40 - 90 : 0,
            smooth: true
        })
    },
    /**
     * 退出应用
     */
    handleLongpress() {
        prompt.showDialog({
            title: '提示',
            message: '是否退出应用？',
            buttons: [
                {
                    text: 'button',
                    color: '#6354cf',
                },
                {
                    text: 'button',
                    color: '#cb4343',
                }
            ],
            success: function(data) {
                console.log('dialog success callback，click button : ' + data.index);
                if(data.index == 1) {
                    app.terminate();
                }
            },
            cancel: function() {
                console.log('dialog cancel callback');
            },
        });
    }
}
