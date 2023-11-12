import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/surah/:id',
      name: 'surah',
      component: () => import('../views/SurahView.vue')
    },
    {
      path: '/prayers',
      name: 'prayers',
      component: () => {}
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => {}
    },
    {
      path: '/about',
      name: 'about',
      component: () => {}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.title) return next()
  document.title = `${to.meta.title} | Quran`
  next()
})

export default router
