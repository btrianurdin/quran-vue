<template>
  <div class="w-full flex justify-between items-start gap-4">
    <div class="text-lg tabular-nums font-semibold">{{ verse.nomorAyat }}.</div>
    <div
      dir="rtl"
      class="font-sans"
      :style="{
        fontSize: verseFontSize + 'px',
        lineHeight: verseFontSize * 1.7 + 'px'
      }"
    >
      {{ verse.teksArab }}
      <span
        class="border inline-flex items-center justify-center w-10 h-10 border-gray-800 rounded-full"
        :style="{
          fontSize: verseFontSize / 2 + 'px',
          width: verseFontSize * 1 + 'px',
          height: verseFontSize * 1 + 'px'
        }"
      >
        {{ convertToArabic(verse.nomorAyat) }}
      </span>
    </div>
  </div>
  <div class="mt-5 text-gray-500" v-if="showLatin">
    {{ verse.teksLatin }}
  </div>
  <div class="mt-3" v-if="showTranslate">
    {{ verse.teksIndonesia }}
  </div>
  <div class="mt-5 flex gap-3 relative">
    <VersesActionButton @click="$emit('playClick', { ...verse })">
      <PlayIcon class="h-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton @click="$emit('bookmarkClick', { ...verse })">
      <BookmarkSolidIcon v-if="isBookmarked" class="w-5 stroke-2" />
      <BookmarkIcon v-if="!isBookmarked" class="w-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton @click="$emit('shareClick', { ...verse })">
      <ShareIcon class="w-5 stroke-2" />
    </VersesActionButton>
    <RouterLink v-if="withLinkVerse" :to="`/surah/${surahId}/verse/${verse.nomorAyat}`">
      <VersesActionButton>
        <LinkIcon class="w-5 stroke-2" />
      </VersesActionButton>
    </RouterLink>
  </div>
</template>

<script setup>
import convertToArabic from '@/utils/convert-arabic'
import VersesActionButton from './VersesActionButton.vue'
import { BookmarkIcon, PlayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolidIcon, LinkIcon } from '@heroicons/vue/24/solid'

const { verse } = defineProps({
  surahId: {
    type: Number,
    required: true
  },
  verse: {
    type: Object,
    required: true
  },
  isBookmarked: {
    type: Boolean,
    required: true
  },
  withLinkVerse: {
    type: Boolean,
    required: false,
    default: true
  },
  showTranslate: {
    type: Boolean,
    required: true
  },
  showLatin: {
    type: Boolean,
    required: true
  },
  verseFontSize: {
    type: Number,
    required: true
  }
})

defineEmits(['bookmarkClick', 'playClick', 'shareClick'])
</script>
