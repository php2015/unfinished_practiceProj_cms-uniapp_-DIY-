import Vue from 'vue'
import App from './App.vue'
import router from './router.js' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDraggable from 'vuedraggable'

Vue.config.productionTip = false 

Vue.component('sortable', VueDraggable)
Vue.use(ElementUI);

Vue.prototype.$uni_url = "http://localhost:8081/"


new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
