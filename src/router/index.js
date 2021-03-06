import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        name: 'Index',
        path: '/index',
        redirect: '/index/organization',
        component: () => import('../views/Index/Index'),
        children: [
            {
                path: 'organization',
                name: 'organization',
                component: () => import('../views/Index/organization/organization')
            },
            {
                path: 'paper',
                name: 'paper',
                component: () => import('../views/Index/paper/paper.vue')
            },
            {
                path: 'exercisePaper',
                name: 'ExercisePaper',
                component: () => import('../views/Index/ExercisePaper/ExercisePaper'),
                children: [
                    {
                        path: 'remarkPaper',
                        name: 'remarkPaper',
                        component: () => import('../views/Index/ExercisePaper/remarkPaper/remarkPaper'),
                    },
                    {
                        path: 'chapterManager',
                        name: 'chapterManager',
                        component: ()=> import('../views/Index/ExercisePaper/chapterManager/chapterManager')
                    }
                ]
            },
            {
                path: 'sendNotice',
                name: 'sendNotice',
                component: () => import('../views/Index/sendNotice/sendNotice')
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
