<template>
  <div class="w-full flex justify-between items-start gap-4">
    <div class="text-lg tabular-nums font-semibold">{{ verse.nomorAyat }}.</div>
    <div dir="rtl" class="text-4xl leading-[60px] font-sans">
      {{ verse.teksArab }}
      <span
        class="border inline-flex items-center justify-center w-10 h-10 border-gray-800 rounded-full text-2xl"
      >
        {{ convertToArabic(verse.nomorAyat) }}
      </span>
    </div>
  </div>
  <div class="mt-5 text-gray-500">
    {{ verse.teksLatin }}
  </div>
  <div class="mt-3">
    {{ verse.teksIndonesia }}
  </div>
  <div class="mt-5 flex gap-4">
    <VersesActionButton @click="$emit('playClick', { ...verse })">
      <PlayIcon class="h-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton @click="$emit('bookmarkClick', { ...verse })">
      <BookmarkSolidIcon v-if="isBookmarked" class="w-5 stroke-2" />
      <BookmarkIcon v-if="!isBookmarked" class="w-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton>
      <ShareIcon class="w-5 stroke-2" />
    </VersesActionButton>
  </div>
</template>

<script setup>
import convertToArabic from '@/utils/convert-arabic'
import VersesActionButton from './VersesActionButton.vue'
import { BookmarkIcon, PlayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/vue/24/solid'

const { verse } = defineProps({
  verse: {
    type: Object,
    required: true
  },
  isBookmarked: {
    type: Boolean,
    required: true
  }
})

defineEmits(['bookmarkClick', 'playClick'])
</script>
