<template>
  <div
    class="relative mx-auto w-full md:w-[600px] bg-white min-h-[100dvh] flex flex-col overflow-hidden"
  >
    <SidebarLayout />

    <header id="header">
      <TopBar />
    </header>

    <main class="h-full top-0 flex-1 relative overflow-hidden">
      <div id="container" class="absolute inset-0 overflow-auto">
        <RouterView />
      </div>
    </main>

    <AudioControl />
    <ShareBottomSheet />
  </div>
  <VueQueryDevtools />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import TopBar from './components/TopBar.vue'
import SidebarLayout from './components/SidebarLayout.vue'
import { watch } from 'vue'
import AudioControl from './components/AudioControl.vue'
import { layoutStore } from './stores'
import ShareBottomSheet from './components/ShareBottomSheet.vue'

const router = useRouter()

// close sidebar when route change
watch(
  () => router.currentRoute.value,
  () => {
    layoutStore.hide()
  }
)
</script>

<style>
.backdrop {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
