
import './index.less';
import mainTpl from './tpl/main.tpl';
import Vue from 'vue';

Vue.component('msgbox', {
    template: mainTpl,
    data() {
        return {
            content: '',
            show: false
        };
    },
    methods: {
        clickOK() {
            this.show = false;
            if (this.hideFun) {
                this.hideFun();
            }
        }
    }
});

let alertV = new Vue({
    el: '#alert'
});

let msgBox = alertV.$refs.msgbox;
export default (msg, callback) => {
    msgBox.content = msg;
    msgBox.show = true;
    msgBox.hideFun = callback ;
};
