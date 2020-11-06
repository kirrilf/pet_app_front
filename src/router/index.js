import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    meta: {auth:true},
    component: () => import('../views/Home')
  },
  {
    path: '/post_create',
    name: 'post_create',
    meta: {auth:true},
    component: () => import('../views/CreatePost')
  },
  {
    path: '/post_update/:id',
    name: 'post_update',
    meta: {auth:true},
    component: () => import('../views/UpdatePost')
  },
  {
    path: '/login',
    name: 'login',
    component:() => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,next)=> {
  const haveToken = localStorage.access_token
  const requireAuth = to.matched.some(record => record.meta.auth)
  if(!haveToken && requireAuth){
    next('/login')
  }else {
    next()
  }
});

export default router
