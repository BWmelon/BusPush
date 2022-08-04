import data_storage from '@ohos.data.storage';
export default {
    data: {
        title: "",
        codeList: [
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
            {
                lineNo: '333路',
                startSn: '开始',
                endSn: '结束',
                code: '123456'
            },
        ]
    },
    onInit() {
        this.title = "Hello World";
        let path = '/'
        let storage = data_storage.getStorageSync(path + '/test')

//        this.title = storage.getSync('code', 'no')
    }
}
