<template>
  <div class="mt-5 flex gap-4">
    <VersesActionButton>
      <PlayIcon class="h-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton>
      <BookmarkSolidIcon v-if="isBookmarked" class="w-5 stroke-2" />
      <BookmarkIcon v-if="!isBookmarked" class="w-5 stroke-2" />
    </VersesActionButton>
    <VersesActionButton>
      <ShareIcon class="w-5 stroke-2" />
    </VersesActionButton>
  </div>
</template>

<script setup>
import VersesActionButton from '@/components/VersesActionButton.vue'
import storage from '@/utils/storage'
import { BookmarkIcon, PlayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'

const props = defineProps({
  surah: {
    type: Object,
    required: true
  },
  verse: {
    type: Object,
    required: true
  }
})

// const bookmarkClick = (metadata) => {
//   storage.update('bookmark', (bookmark) => {
//     const meta = {
//       surahId: surahId.value,
//       surahName: surahData.value.namaLatin,
//       ...metadata
//     }

//     if (!bookmark) {
//       return [meta]
//     }

//     const isExist = bookmark.find((item) => item.nomorAyat === metadata.nomorAyat)
//     if (isExist) {
//       return bookmark.filter((item) => item.nomorAyat !== metadata.nomorAyat)
//     }
//     return [...bookmark, meta]
//   })
// }

const isBookmarked = computed(() => {
  const bookmark = storage.get('bookmark')
  if (!bookmark) return false
  const isExist = bookmark.find(
    (item) => item.nomorAyat === props.verse.nomorAyat && item.surahId === props.surah.id
  )
  return Boolean(isExist)
})
</script>
