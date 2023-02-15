import app from '@system.app'
import prompt from '@system.prompt';
import router from '@system.router';
import { getStorage } from '../../common/utils/tools'
export default {
    data: {
        isClear: false
    },
    onInit() {

    },
    quit() {
        app.terminate();
    },
    agree() {
        getStorage().then(storage => {
            //设置初始化
            let setting = storage.getSync('setting', '')
            setting = JSON.parse(setting)
            setting.readPrivacy = true
            storage.putSync('setting', JSON.stringify(setting))
            storage.flushSync()
            router.back()
        }).catch((err) => {
            prompt.showToast({message: '读取配置失败，请联系管理员'})
        })
    },
    clear() {
        prompt.showDialog({
            title: '提示',
            message: '是否清空所有数据并退出应用？',
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
                    getStorage().then(storage => {
                        storage.putSync('setting', JSON.stringify({}))
                        storage.putSync('lineList', JSON.stringify([]))
                        storage.flushSync()
                        app.terminate();
                    }).catch((err) => {
                        prompt.showToast({message: '读取配置失败，请联系管理员'})
                    })

                }
            },
            cancel: function() {
                console.log('dialog cancel callback');
            },
        });
    }
}
