import './index.less';
import mainTpl from './tpl/main.tpl';

import Vue from 'vue';
export default Vue.component('background', {
    props: {
        blur: {
            type: Boolean,
            default: true
        },
        bgUrl: {
            default: '//s.qunarzz.com/ivyue-touch/smart-home/images/background-201609061726.png'
        }
    },
    template: mainTpl
});
