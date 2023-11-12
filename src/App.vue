<template>
  <div class="relative mx-auto w-full md:w-[600px] bg-white h-screen flex flex-col">
    <SidebarLayout />

    <header id="header">
      <TopBar />
    </header>

    <main class="h-full overflow-auto">
      <RouterView />
    </main>
  </div>
  <VueQueryDevtools />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import TopBar from './components/TopBar.vue'
import SidebarLayout from './components/SidebarLayout.vue'
import { watch } from 'vue'
import { layoutStore } from './stores'

const router = useRouter()

// close sidebar when route change
watch(
  () => router.currentRoute.value,
  () => {
    if (!layoutStore.show) return
    layoutStore.show = false
  }
)
</script>

<style scoped></style>
