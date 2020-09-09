import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        name: 'Index',
        path: '/index',
        component: () => import('../views/Index/Index'),
        children: [
            {
                path: 'organization',
                name: 'organization',
                component: () => import('../views/Index/organization/organization')
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
