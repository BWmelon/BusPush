export default {
    data: {
        title: "",
        autoQuery: false,
        intervalList: []
    },
    onInit() {
        this.title = "Hello World";
        this.initIntervalList()
    },
    initIntervalList() {
        new Array(60).fill('').map((e, index) => {
            if(index > 14 && index < 60) {
                this.intervalList.push(String(index + 1))
            }
        })
    },
    showSelectInterval() {
        this.$element("interval").show();
    },
}
