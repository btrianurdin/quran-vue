<template>
  <div class="relative p-4">
    <div v-if="surahData?.suratSebelumnya" class="absolute top-1/2 -translate-y-1/2">
      <RouterLink
        :to="{
          path: `/surah/${surahData.suratSebelumnya.nomor}`
        }"
        class="flex items-center gap-2"
      >
        <IconChevronLeft class="text-gray-800" />
        <span class="mt-0.5">{{ surahData.suratSebelumnya?.namaLatin }}</span>
      </RouterLink>
    </div>
    <div v-if="surahData?.suratSelanjutnya" class="absolute right-4 top-1/2 -translate-y-1/2">
      <RouterLink
        :to="{ path: `/surah/${surahData.suratSelanjutnya.nomor}` }"
        class="flex items-center gap-2"
      >
        <span class="mt-0.5">{{ surahData.suratSelanjutnya?.namaLatin }}</span>
        <IconChevronLeft class="text-gray-800 rotate-180" />
      </RouterLink>
    </div>

    <div class="text-center">
      <p class="text-sm">Surat</p>
      <div v-if="query.isLoading.value">
        <div
          class="w-[100px] h-6 bg-gray-300 rounded-md animate-pulse mt-1 text-center mx-auto"
        ></div>
      </div>
      <h1 v-else class="text-xl font-normal">
        {{ surahData?.namaLatin }}
      </h1>
    </div>
  </div>

  <div v-if="query.isLoading.value">
    <SurahSkeleton />
  </div>

  <div v-if="isAyahsExist">
    <div
      v-for="item in surahData?.ayat"
      :key="item.nomorAyat"
      class="border-b border-gray-300 first:border-t py-5 px-4 hover:bg-gray-100 transition-colors"
    >
      <VerseLists
        :surahId="Number(surahId)"
        :verse="item"
        :isBookmarked="isBookmarked(item.nomorAyat)"
        :showTranslate="showTranslate"
        :showLatin="showLatin"
        :verseFontSize="verseFontSize"
        @share-click="(data) => shareHandler(data)"
        @bookmark-click="(data) => bookmarkHandler(data)"
        @play-click="(data) => playHandler(data)"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import getDetailsSurah from '../services/repositories/get-details-surah'
import { computed, ref, watch, watchEffect } from 'vue'
import SurahSkeleton from '@/components/skeletons/SurahSkeleton.vue'
import storage from '@/utils/storage'
import { audioStore, shareStore } from '@/stores'
import VerseLists from '@/components/VerseLists.vue'
import {
  QARI_ID_KEY,
  SHOW_LATIN_KEY,
  SHOW_TRANSLATION_KEY,
  VERSE_FONT_SIZE_KEY,
  defaultQariId,
  defaultVerseFontSize
} from '@/constants/cache-keys'

const showTranslate = ref(storage.get(SHOW_TRANSLATION_KEY) ?? true)
const showLatin = ref(storage.get(SHOW_LATIN_KEY) ?? true)
const verseFontSize = ref(storage.get(VERSE_FONT_SIZE_KEY) ?? defaultVerseFontSize)

const $toast = useToast()

const bookmarks = ref(storage.get('bookmarks') ?? [])

const router = useRouter()
const surahData = ref(null)

const isAyahsExist = computed(() => {
  return surahData.value?.ayat?.length > 0
})

const surahId = computed(() => {
  return router.currentRoute.value.params.id
})

const queryKey = computed({
  get() {
    return ['surah', surahId.value]
  },
  set(val) {
    return val
  }
})

const query = useQuery({
  queryKey,
  queryFn: () => getDetailsSurah({ id: surahId.value }),
  enabled: Boolean(surahId.value),
  select: (data) => {
    return data?.data
  }
})

watch(surahId, () => {
  queryKey.value = ['surah', surahId.value]
  query.refetch()
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
  shareStore.show({
    link: window.location.origin + `/surah/${surahId.value}/verse/${data.nomorAyat}`,
    text: `Q.S ${surahData.value.namaLatin} Ayat ${data.nomorAyat}`
  })
}

const playHandler = (verse) => {
  audioStore.setShow(true)

  const qariId = storage.get(QARI_ID_KEY) ?? defaultQariId

  const fullAudio = surahData.value.ayat?.map((item) => item.audio?.[qariId])

  audioStore.setData({
    id: Number(surahId.value),
    surahName: surahData.value.namaLatin,
    numberOfVerses: surahData.value.jumlahAyat,
    sources: fullAudio
  })

  audioStore.setCurrentPlay(verse.nomorAyat)
}
</script>
