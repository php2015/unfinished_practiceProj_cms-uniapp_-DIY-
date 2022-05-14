import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('./views/index/index'),
	}
]

const router = new VueRouter({
	routes
})

export default router