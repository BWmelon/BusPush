import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        min: 15,
        max: 60,
        refreshTime: 30,
    },
    onInit() {
        getStorage().then(storage => {
            let setting = storage.getSync('setting', '')

            setting = JSON.parse(setting)
            this.refreshTime = setting.refreshTime
        }).catch((err) => {
            console.log(err)
        });
    },
    onChangeTime(e) {
        this.refreshTime = Math.round(e.progress)
        if(e.isEnd) {
            getStorage().then(storage => {
                let setting = storage.getSync('setting', '')

                setting = JSON.parse(setting)
                setting.refreshTime = this.refreshTime
                storage.putSync('setting', JSON.stringify(setting))
                storage.flushSync()
            }).catch((err) => {
                console.log(err)
            });
        }

    }
}
