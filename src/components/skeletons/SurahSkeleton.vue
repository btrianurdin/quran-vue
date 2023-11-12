<template>
  <div class="flex flex-col mt-10">
    <div v-for="(_, idx) in count" :key="idx" class="p-4 flex flex-col border-t border-gray-300">
      <div class="w-[70%] h-10 bg-gray-300 rounded-md animate-pulse self-end"></div>
      <div class="w-full h-3 bg-gray-300 animate-pulse rounded-md mt-4"></div>
      <div class="w-[80%] h-3 bg-gray-300 animate-pulse rounded-md mt-2"></div>
    </div>
  </div>
</template>

<script setup>

const count = new Array(8).fill(0)
</script>
