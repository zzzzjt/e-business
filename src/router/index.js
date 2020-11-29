import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect:'/login' },
        { path: '/login', component: Login },
        { path: '/Home', component: Home }
    ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //form 从哪个路径跳转而来
    // next是一个函数，代表放行 next("/login") 强制跳转
    if(to.path === '/login' ) return next();
    //获取token
    const token = window.sessionStorage.getItem('token');
    if (!token) return next('/login');
    next();
})

export default router;