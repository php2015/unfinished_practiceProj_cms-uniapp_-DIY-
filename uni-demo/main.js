import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import MoveHandle from 'components/MoverHandle.vue' 
import publicModel from './model/public.js'
import store from '@/common/store'



Vue.config.productionTip = false
Vue.use(uView);
Vue.component('MoveHandle', MoveHandle);
// Vue.use(VueConfig);
App.mpType = 'app'
Vue.prototype.http = publicModel;

// uView-vuex
let vuexStore = require('./common/store/$u.mixin.js')
Vue.mixin(vuexStore)
 

const app = new Vue({
	store,
	...App
})

import HttpInterceptor from './common/http.interceptor.js';

Vue.use(HttpInterceptor, app);

app.$mount()

export default app