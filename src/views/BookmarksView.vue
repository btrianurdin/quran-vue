<template>
  <div class="flex flex-col h-full">
    <h2 class="text-xl text-center font-medium p-4">Markah</h2>

    <div v-if="!bookmarks.length" class="p-4 flex-1 flex justify-center items-center">
      <p class="text-center italic text-gray-500">Kamu belum memiliki markah.</p>
    </div>

    <div class="flex flex-col gap-5 p-4" v-if="bookmarks.length > 0">
      <div
        v-for="bookmark in bookmarks"
        :key="`${bookmark.surahId}${bookmark.nomorAyat}`"
        class="bg-gray-100 p-4 rounded-md"
      >
        <h3 class="text-center text-lg mb-5 border-b pb-4 border-gray-300">
          Surat {{ bookmark.surahName }}
        </h3>

        <div class="w-full flex justify-between items-start gap-4">
          <div class="text-lg tabular-nums font-semibold">{{ bookmark.nomorAyat }}.</div>
          <div dir="rtl" class="text-4xl leading-[60px]">
            {{ bookmark.teksArab }}
            <span
              class="border inline-flex items-center justify-center w-10 h-10 border-gray-800 rounded-full text-2xl"
            >
              {{ convertToArabic(bookmark.nomorAyat) }}
            </span>
          </div>
        </div>
        <div class="mt-5 text-gray-500">
          {{ bookmark.teksLatin }}
        </div>
        <div class="mt-3">
          {{ bookmark.teksIndonesia }}
        </div>
        <div class="mt-5 flex gap-3">
          <VersesActionButton @click="playAudio(bookmark)">
            <PlayIcon class="h-5 stroke-2" />
          </VersesActionButton>
          <VersesActionButton @click="removeBookmark(bookmark)">
            <BookmarkSolidIcon class="w-5 stroke-2" />
          </VersesActionButton>
          <VersesActionButton @click="shareHandler(bookmark)">
            <ShareIcon class="w-5 stroke-2" />
          </VersesActionButton>
          <RouterLink :to="`/surah/${bookmark.surahId}/verse/${bookmark.nomorAyat}`">
            <VersesActionButton>
              <LinkIcon class="w-5 stroke-2" />
            </VersesActionButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VersesActionButton from '@/components/VersesActionButton.vue'
import { QARI_ID_KEY, defaultQariId } from '@/constants/cache-keys'
import { audioStore, shareStore } from '@/stores'
import convertToArabic from '@/utils/convert-arabic'
import storage from '@/utils/storage'
import { PlayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolidIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const bookmarks = ref(storage.get('bookmarks') ?? [])

const removeBookmark = (bookmark) => {
  const findIndex = bookmarks.value.findIndex(
    (item) => item.nomorAyat === bookmark.nomorAyat && item.surahId === bookmark.surahId
  )

  if (findIndex === -1) return

  bookmarks.value.splice(findIndex, 1)

  storage.set('bookmarks', bookmarks.value)
}

const shareHandler = (data) => {
  shareStore.show({
    link: window.location.origin + `/surah/${data.surahId}/verse/${data.nomorAyat}`,
    text: `Q.S ${data.surahName} Ayat ${data.nomorAyat}`
  })
}

const playAudio = (bookmark) => {
  audioStore.setShow(true)

  const qariId = storage.get(QARI_ID_KEY) ?? defaultQariId

  const audio = [bookmark.audio?.[qariId]]

  audioStore.setData({
    id: bookmark.surahId,
    surahName: bookmark.surahName,
    numberOfVerses: 1, // bookmark just play one verse
    sources: audio,
    fixedVerseNumber: bookmark.nomorAyat
  })

  audioStore.setCurrentPlay(1) // bookmark just play one verse
}
</script>
