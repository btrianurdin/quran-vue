<template>
  <div class="flex flex-col h-full">
    <div class="relative">
      <RouterLink to="/prayers" class="absolute top-1/2 -translate-y-1/2 left-4 flex gap-2">
        <ChevronLeftIcon class="text-gray-800 w-5 h-5" />
        <span class="hidden sm:block">Kembali</span>
      </RouterLink>
      <h2 class="text-xl font-medium text-center p-4">Doa-doa Harian</h2>
    </div>

    <div class="p-4 border-t border-b border-gray-300">
      <h3 class="text-center font-normal capitalize mb-5">{{ prayer.doa }}</h3>
      <div
        dir="rtl"
        class="font-sans"
        :style="{
          fontSize: verseFontSize + 'px',
          lineHeight: verseFontSize * 1.7 + 'px'
        }"
      >
        {{ prayer.ayat }}
      </div>
      <p class="mt-5 text-gray-500">{{ prayer.latin }}</p>
      <p class="mt-3">Artinya:</p>
      <p class="mt-1">{{ prayer.artinya }}</p>
      <div class="mt-5">
        <VersesActionButton @click="handleShare(prayer)">
          <ShareIcon class="w-5 stroke-2" />
        </VersesActionButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import dailyPrayers from '@/assets/data/daily-prayers'
import VersesActionButton from '@/components/VersesActionButton.vue'
import { VERSE_FONT_SIZE_KEY, defaultVerseFontSize } from '@/constants/cache-keys'
import { shareStore } from '@/stores'
import storage from '@/utils/storage'
import { ChevronLeftIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const verseFontSize = ref(storage.get(VERSE_FONT_SIZE_KEY) ?? defaultVerseFontSize)

const router = useRouter()

const prayer = ref(null)

const prayerId = computed(() => {
  return router.currentRoute.value.params.id
})

watch(
  prayerId,
  (id) => {
    const searchId = dailyPrayers.find((prayer) => prayer.id === id)

    if (searchId) {
      prayer.value = searchId
    }
  },
  {
    immediate: true
  }
)

const handleShare = (prayer) => {
  shareStore.show({
    link: window.location.href,
    text: `${prayer.doa} - Quran`
  })
}
</script>
