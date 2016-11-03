import './index.less';
import mainTpl from './tpl/main.tpl';

import Vue from 'vue';
export default Vue.component('switch', {
    props: {
        status: 0
    },
    template: mainTpl
});
