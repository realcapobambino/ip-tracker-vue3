import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeView2 from '../views/HomeView2.vue'

const routes = [
	// {
	// 	path: '/',
	// 	name: 'Home',
	// 	component: HomeView,
	// 	meta: {
	// 		title: 'IP Address Tracker | Easy!',
	// 	},
	// },
	{
		path: '/',
		name: 'HomeView2',
		component: HomeView2,
		meta: {
			title: 'IP Address Tracker | Easy!',
		},
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title}`
	next()
})

export default router
