<template>
  <div class="bg-cyan-600 p-3 flex items-center justify-between">
    <button @click="layoutStore.show = true">
      <IconHamburgerMenu class="text-white" />
    </button>
    <h1 class="text-xl font-normal text-center text-white">Quran</h1>
    <div class="opacity-0">
      <IconHamburgerMenu class="text-white" />
    </div>
  </div>
</template>

<script setup>
import { layoutStore } from '@/stores';
import IconHamburgerMenu from './icons/IconHamburgerMenu.vue'
</script>
