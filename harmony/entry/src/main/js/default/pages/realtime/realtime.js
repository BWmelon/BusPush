import http from '@ohos.net.http';
import prompt from '@system.prompt';
import vibrator from '@system.vibrator';
import app from '@system.app'
import router from '@system.router';
import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        id: '',
        showMap: false,
        stations: [], // 站点列表
        lineInfo: {},
        realtimeInfo: {},
        countdownOrigin: 30,
        countdown: 30,
        warn: false,
        warnTime: '3',
        accurateVibration: false,
        running: null,
        showLoading: false,
        buses: [], // 所有当前未到站车辆
        busesAll: [], // 所有车辆（包含已过站）
    },
    onReady() {
        getStorage().then(storage => {
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            this.countdown = setting.refreshTime
            this.countdownOrigin = setting.refreshTime
            this.warn = setting.warn
            this.warnTime = setting.warnTime
            this.accurateVibration = setting.accurateVibration

            this.getRealtime(true)
            this.running = setInterval(() => {
                if (this.countdown <= 0) {
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
     * @param first 首次查询
     */
    getRealtime(first = false) {
        if (first) {
            setTimeout(() => {
                this.showLoading = true
            }, 100)
        }
        let httpRequest = http.createHttp();
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getRealtime?id=${this.id}`, {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            this.showLoading = false
            if (res.responseCode == 200) {
                let result = JSON.parse(res.result)

                if (result.errCode == 0) {
                    this.lineInfo = result.data.lineInfo

                    this.realtimeInfo = result.data.realtime.data
                    this.busesAll = result.data.realtime.data.buses.reverse()
                    let buses = result.data.realtime.data.buses.filter(e => e.travels.length > 0)
                    buses.map(e => {
                        e.class = 'buses-item'
                    })

                    // 判断到站提醒
                    if (buses.length && this.warn) {
                        let firstBus = buses[0]
                        let time = (firstBus.travels[0].travelTime / 60).toFixed(0)
                        if (time <= Number(this.warnTime)) {
                            // 在提前时间范围内，提醒
                            firstBus.class = 'buses-item-warn'
                            this.handleVibrate(time)
                        }
                    }

                    this.buses = buses

                    this.getStations()
                } else if (result.errCode == 1) {
                    prompt.showToast({ message: result.errMsg })
                    setTimeout(() => {
                        router.back({
                            uri: 'pages/code/code'
                        })
                    }, 2000)
                } else {
                    prompt.showToast({ message: '系统出错，请联系管理员' })
                    setTimeout(() => {
                        router.back({
                            uri: 'pages/code/code'
                        })
                    }, 2000)
                }
            } else {
                prompt.showToast({ message: '网络连接失败，请联系管理员' })
                setTimeout(() => {
                    router.back({
                        uri: 'pages/code/code'
                    })
                }, 2000)
            }
            this.countdown = this.countdownOrigin
        }).catch(err => {
            this.showLoading = false
            prompt.showToast({ message: '网络连接失败，请联系管理员' })
            setTimeout(() => {
                router.back({
                    uri: 'pages/code/code'
                })
            }, 2000)
            this.countdown = this.countdownOrigin
        })
    },
    /**
     * 处理震动
     * @param time 剩余到站时间
     */
    async handleVibrate(time) {
        // 即将到站，长震动5次
        if(time === 0) {
            for (let i = 0; i < 5; i++) {
                await this.vibrate('long')
            }
            return
        }
        if(this.accurateVibration) {
            let longTime = Math.floor(time / 5)
            let shortTime = time % 5
            for (let i = 0; i < longTime; i++) {
                await this.vibrate('long')
            }
            for (let i = 0; i < shortTime; i++) {
                await this.vibrate('short')
            }
        } else {
            this.vibrate('long')
        }
    },
    /**
     * 震动
     * @param mode 模式 long short
     */
    vibrate(mode) {
        return new Promise(resolve => {
            vibrator.vibrate({
                mode,
                success: () => {
                    console.log('vibrate is successful');
                },
                fail: (data, code) => {
                    console.log("vibrate is failed, data: " + data + ", code: " + code);
                },
                complete: () => {
                    console.log('vibrate is completed');
                    setTimeout(() => {
                        resolve()
                    }, mode === 'long' ? 1200 : 300)
                }
            });
        })
    },
    /**
     * 获取站点列表
     */
    getStations() {
        if (this.stations.length) {
            this.handleStationsBusDisplay()
        }
        // 已加载，不再请求
        if (this.stations.length !== 0) {
            return
        }
        let httpRequest = http.createHttp();
        // 填写http请求的url地址，可以带参数也可以不带参数。URL地址需要开发者自定义。GET请求的参数可以在extraData中指定
        httpRequest.request(
            `https://buspushapi.bwmelon.com/watch/getLineRoute?lineId=${this.lineInfo.lineId}&cityId=${this.lineInfo.cityId}`, {
                // 开发者根据自身业务需要添加header字段
                header: {
                    "Content-Type": "application/json"
                },
            }
        ).then(res => {
            if (res.responseCode == 200) {
                let result = JSON.parse(res.result)

                if (result.errCode == 0) {
                    this.stations = result.data
                    this.handleStationsData()
                    this.handleStationsBusDisplay()
                } else if (result.errCode == 1) {
                    prompt.showToast({ message: result.errMsg })
                } else {
                    prompt.showToast({ message: '系统出错，请联系管理员' })
                }
            } else {
                prompt.showToast({ message: '网络连接失败，请联系管理员' })
            }
            this.countdown = this.countdownOrigin
        }).catch(err => {
            prompt.showToast({ message: '网络连接失败，请联系管理员' })
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
            let arr = this.busesAll.filter(e => e.order == item.order)
            if (arr.length) {
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
        if (!this.stations.length) {
            prompt.showToast({ message: '站点列表加载中，请稍后再试' })
            return
        }
        this.showMap = !this.showMap
        if (this.showMap) {
            this.$refs.container.scrollBy({
                dy: (this.lineInfo.targetOrder * 40 - 90) - this.$refs.container.getScrollOffset().y,
                smooth: true
            })
        } else {
            this.$refs.container.scrollTop({ smooth: true })

        }
    },
    /**
     * 退出应用
     */
    handleLongpress() {
        prompt.showDialog({
            title: '提示',
            message: '是否退出应用？',
            buttons: [{
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
                if (data.index == 1) {
                    app.terminate();
                }
            },
            cancel: function() {
                console.log('dialog cancel callback');
            },
        });
    }
}