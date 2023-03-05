import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          // path: 'product',
          path: '/',
          name: '產品管理',
          component: () => import('../views/ProductManagement.vue')
        },
        {
          path: '/user',
          name: '人員管理',
          component: () => import('../views/UserManagement.vue')
        },
        {
          path: 'order',
          name: '訂單管理',
          component: () => import('../views/OrderManagement.vue')
        },
        {
          path: 'coupon',
          name: '優惠券管理',
          component: () => import('../views/CouponManagement.vue')
        },
        {
          path: 'image',
          name: '網站圖片管理',
          component: () => import('../views/ImageManagement.vue')
        }
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
  ]
})

export default router
