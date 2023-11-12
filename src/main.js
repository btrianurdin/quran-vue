import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import queryClient from './services/networks/query-client'
import Toast from 'vue-toastification'

const app = createApp(App)

/**
 * @type {import('@tanstack/vue-query').VueQueryPluginOptions}
 */
const vueQueryPluginOptions = {
  queryClient: queryClient
}

/**
 * @type {import('vue-toastification').PluginOptions}
 */
const toastOptions = {
  position: 'top-center',
  timeout: 3000
}

app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(Toast, toastOptions)

app.mount('#app')
