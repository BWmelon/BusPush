import router from '@system.router';
export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    openAdd() {
        console.log('11122')
        router.push({
            uri: 'pages/bind/bind'
        })
    }
}
