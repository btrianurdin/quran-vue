<template>
  <div class="relative p-4">
    <div class="text-center">
      <div v-if="query.isLoading.value">
        <div
          class="w-[100px] h-6 bg-gray-300 rounded-md animate-pulse mt-1 text-center mx-auto"
        ></div>
        <div
          class="w-[140px] h-3 bg-gray-300 rounded-md animate-pulse mt-1 text-center mx-auto"
        ></div>
        <div
          class="w-[80px] h-3 bg-gray-300 rounded-md animate-pulse mt-2 text-center mx-auto"
        ></div>
      </div>
      <div v-else>
        <h1 class="text-xl font-normal">
          {{ surahData?.namaLatin }}
        </h1>
        <p class="text-sm mb-1">
          {{ surahData?.arti }} • {{ surahData?.tempatTurun }} • {{ surahData?.jumlahAyat }} Ayat
        </p>
        <p>Ayat {{ surahData?.ayat?.nomorAyat }}</p>
      </div>
    </div>
  </div>

  <div v-if="query.isLoading.value" class="border-b border-b-gray-300">
    <SurahSkeleton count="1" />
    <div class="border-t border-t-gray-300 p-4">
      <div class="w-[200px] mb-2 h-5 bg-gray-300 animate-pulse rounded-md"></div>
      <div class="w-full mb-1 h-3 bg-gray-300 animate-pulse rounded-md"></div>
      <div class="w-full mb-1 h-3 bg-gray-300 animate-pulse rounded-md"></div>
      <div class="w-full mb-1 h-3 bg-gray-300 animate-pulse rounded-md"></div>
      <div class="w-1/2 h-3 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  </div>

  <div v-if="!query.isLoading.value && isAyahsExist">
    <div
      class="border-b border-gray-300 first:border-t py-5 px-4 hover:bg-gray-100 transition-colors"
    >
      <VerseLists
        :surahId="Number(surahId)"
        :verse="surahData?.ayat"
        :isBookmarked="isBookmarked(surahData?.ayat?.nomorAyat)"
        :showTranslate="true"
        :showLatin="true"
        :verseFontSize="verseFontSize"
        :withLinkVerse="false"
        @share-click="(data) => shareHandler(data)"
        @bookmark-click="(data) => bookmarkHandler(data)"
        @play-click="(data) => playHandler(data)"
      />
    </div>
  </div>

  <div v-if="!query.isLoading.value && isAyahsExist" class="p-4 border-b border-gray-300">
    <h3 class="mb-2 text-lg">Deskripsi</h3>
    <p v-html="surahData?.deskripsi"></p>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import getDetailVerse from '../services/repositories/get-detail-verse'
import { computed, ref, watchEffect } from 'vue'
import SurahSkeleton from '@/components/skeletons/SurahSkeleton.vue'
import storage from '@/utils/storage'
import { audioStore } from '@/stores'
import VerseLists from '@/components/VerseLists.vue'
import {
  QARI_ID_KEY,
  VERSE_FONT_SIZE_KEY,
  defaultQariId,
  defaultVerseFontSize
} from '@/constants/cache-keys'

const verseFontSize = ref(storage.get(VERSE_FONT_SIZE_KEY) ?? defaultVerseFontSize)

const $toast = useToast()

const bookmarks = ref(storage.get('bookmarks') ?? [])

const router = useRouter()
const surahData = ref(null)

const isAyahsExist = computed(() => {
  return surahData.value?.ayat
})

const surahId = computed(() => {
  return router.currentRoute.value.params.id
})

const verseId = computed(() => {
  return router.currentRoute.value.params.verseId
})

const query = useQuery({
  queryKey: ['surah', surahId.value, 'verse', verseId.value],
  queryFn: () => getDetailVerse({ surahId: surahId.value, verseId: verseId.value }),
  enabled: Boolean(surahId.value)
})

watchEffect(() => {
  if (query.data.value) {
    surahData.value = query.data.value
    document.title = query.data.value.namaLatin + ' - Quran'
  }
})

const isBookmarked = (verseId) => {
  const isExist = bookmarks.value.find(
    (item) => item.nomorAyat === Number(verseId) && item.surahId === Number(surahId.value)
  )

  return Boolean(isExist)
}

const bookmarkHandler = (verse) => {
  const existingIndex = bookmarks.value.findIndex(
    (item) => item.nomorAyat === verse.nomorAyat && item.surahId === Number(surahId.value)
  )

  if (existingIndex !== -1) {
    // Hapus item yang sudah ada
    bookmarks.value.splice(existingIndex, 1)
  } else {
    if (bookmarks.value.length >= 10) {
      $toast.error('Bookmark maksimal 10 item')
      return
    }

    const create = {
      surahId: Number(surahId.value),
      surahName: surahData.value.namaLatin,
      ...verse
    }

    bookmarks.value.push(create)
  }

  // Simpan ke local storage setelah setiap operasi perubahan bookmark
  storage.set('bookmarks', bookmarks.value)
}

const shareHandler = async (data) => {
  try {
    const shareData = {
      title: `Q.S. ${surahData.value.namaLatin} ayat ${data.nomorAyat} - Quran`,
      text: `${data.teksArab} (${data.teksIndonesia})`,
      url: window.location.href
    }
    await navigator.share(shareData)
  } catch (error) {
    $toast.error('Terjadi kesalahan.')
  }
}

const playHandler = (verse) => {
  audioStore.setShow(true)

  const qariId = storage.get(QARI_ID_KEY) ?? defaultQariId

  const audio = [verse.audio?.[qariId]]

  audioStore.setData({
    id: surahId.value,
    surahName: surahData.value.namaLatin,
    numberOfVerses: 1, // bookmark just play one verse
    sources: audio,
    fixedVerseNumber: verse.nomorAyat
  })

  audioStore.setCurrentPlay(1) // bookmark
}
</script>
