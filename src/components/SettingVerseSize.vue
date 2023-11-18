<template>
  <div class="border-b border-b-gray-300 p-4 m-4 flex flex-col gap-4">
    <h2 class="text-lg font-medium">Ukuran Font Ayat</h2>

    <div
      class="font-sans leading-normal"
      dir="rtl"
      :style="{
        fontSize: verseFontSize + 'px'
      }"
    >
      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
    </div>

    <div class="flex gap-4 justify-center w-1/3 mx-auto pt-4">
      <Button>
        <MinusIcon class="w-5 stroke-2 text-white" />
      </Button>
      <TextField class="text-center" :value="verseFontSize" readonly />
      <Button>
        <PlusIcon class="w-5 stroke-2 text-white" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import storage from '@/utils/storage'
import { VERSE_FONT_SIZE_KEY, defaultVerseFontSize } from '@/constants/cache-keys'
import { computed } from 'vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid'
import Button from '@/components/base/Button.vue'
import TextField from '@/components/base/TextField.vue'

const verseFontSize = computed({
  get: () => storage.get(VERSE_FONT_SIZE_KEY) || defaultVerseFontSize,
  set: (size) => {
    storage.set(VERSE_FONT_SIZE_KEY, size)
    return size
  }
})

console.log(verseFontSize.value)
</script>
