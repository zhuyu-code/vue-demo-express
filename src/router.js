import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import FoundList from './views/FoundList'
import Daily from './views/Daily';
import DailyItem from './views/DailyItem'
import DailyItemAdd from './views/DailyItemAdd.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    { path: '/', redirect: '/index' },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: 'home', name: 'home', component: Home },
        { path: 'infoshow', name: 'infoshow', component: InfoShow },
        { path: 'foundlist', name: 'foundlist', component: FoundList },
        {path:'dailymanage',name:'daily',component:Daily},
        {path:'dailymanage/add',name:'dailyAdd',component:DailyItemAdd},
        {path:'dailymanage/:userId',name:'dailyItem',component:DailyItem},
        
       
      ]
    },
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;