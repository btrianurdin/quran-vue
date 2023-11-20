<template>
  <div ref="wrapper" class="flex flex-col h-full">
    <h2 class="text-xl font-medium text-center p-4">Doa-doa Harian</h2>

    <div class="border-t border-t-gray-300">
      <div
        v-for="prayer in dailyPrayers"
        :data-pid="prayer.id"
        :key="prayer.id"
        class="border-b border-b-gray-300 p-4"
      >
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
        <p class="mt-3">{{ prayer.artinya }}</p>
        <div class="mt-5 flex gap-3">
          <VersesActionButton @click="handleShare(prayer)">
            <ShareIcon class="w-5 stroke-2" />
          </VersesActionButton>
          <RouterLink :to="`/prayers/${prayer.id}`">
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
import dailyPrayers from '@/assets/data/daily-prayers'
import VersesActionButton from '@/components/VersesActionButton.vue'
import { VERSE_FONT_SIZE_KEY, defaultVerseFontSize } from '@/constants/cache-keys'
import { shareStore } from '@/stores'
import storage from '@/utils/storage'
import { LinkIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const wrapper = ref(null)

const verseFontSize = ref(storage.get(VERSE_FONT_SIZE_KEY) ?? defaultVerseFontSize)

const handleShare = (prayer) => {
  shareStore.show({
    link: window.location.href + `/${prayer.id}`,
    text: `${prayer.doa} - Quran`
  })
}

// onMounted(() => {
//   setTimeout(() => {
//     if (prayerId.value) {
//       wrapper.value
//         ?.querySelector(`[data-pid="${prayerId.value}"]`)
//         ?.scrollIntoView({ behavior: 'smooth' })
//     }
//   }, 300)
// })
</script>
