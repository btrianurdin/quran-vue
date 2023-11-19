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
      path: '/surah/:id/verse/:verseId',
      name: 'verse',
      component: () => import('../views/VerseView.vue')
    },
    {
      path: '/prayers',
      name: 'prayers',
      component: () => import('../views/ShortSurah.vue'),
      meta: {
        title: 'Doa Harian'
      }
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: () => import('../views/BookmarksView.vue'),
      meta: {
        title: 'Daftar Markah'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: {
        title: 'Pengaturan'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Tentang'
      }
    }
  ],
  scrollBehavior() {
    document.querySelector('#container').scrollTo(0, 0)
  }
})

router.beforeEach((to, from, next) => {
  try {
    if (!to.meta.title) return next()
    document.title = `${to.meta.title} | Quran`
    next()
  } catch (error) {
    console.log('router log: ' + error)
    next()
  }
})

export default router
