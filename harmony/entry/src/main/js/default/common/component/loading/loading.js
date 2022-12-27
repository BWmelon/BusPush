export default {
    data: {
    },
    props: {
        title: {
            default: '加载中',
        },
        showLoading: {
            default: false
        }
    },
    onInit() {
        this.$watch('showLoading', 'onChangeShowLoading')
    },
    onChangeShowLoading(newVal) {
        if(newVal) {
            this.$element('dialog').show()
        } else {
            this.$element('dialog').close()
        }
    }
}
