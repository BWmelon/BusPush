import router from '@system.router';
export default {
    data: {
        tip: "请用微信扫描小程序码生成查询码"
    },
    onInit() {

    },
    /**
     * 打开页面
     * @param name 页面名
     */
    openPage(name) {
        router.push({
            uri: `pages/${name}/${name}`
        })
    },
}
