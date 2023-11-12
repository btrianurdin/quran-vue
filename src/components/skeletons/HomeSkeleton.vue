<template>
  <div class="flex flex-col gap-3">
    <div v-for="(idx, i) in count" :key="i" class="p-2">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-full animate-pulse bg-gray-300 flex-shrink-0"></div>
        <div class="flex flex-col gap-2 w-full">
          <div class="w-1/2 h-3 animate-pulse rounded-md bg-gray-300"></div>
          <div class="w-1/3 h-3 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const count = new Array(12).fill(0)
</script>
