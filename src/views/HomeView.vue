<template>
  <div class="h-full p-4">
    <div v-if="query.isLoading.value">
      <HomeSkeleton />
    </div>
    <div v-if="query.data">
      <div class="flex flex-col w-full items-start gap-2 pb-4">
        <RouterLink
          :to="{ path: `/surah/${surah.nomor}` }"
          class="text-lg flex items-center gap-3 w-full hover:bg-gray-200 p-2 rounded-md transition-colors duration-300"
          v-for="(surah, idx) in query.data.value"
          :key="surah.nomor"
        >
          <!-- <RouterLink to="/sd"> -->
          <div
            class="tabular-nums w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm flex-shrink-0"
          >
            {{ idx + 1 }}
          </div>
          <div class="flex justify-between w-full items-center">
            <div class="flex flex-col items-start">
              <p>{{ surah.namaLatin }}</p>
              <p class="text-xs">{{ surah.arti }}</p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <p class="text-xs">{{ surah.jumlahAyat }} ayat</p>
              <p class="text-xs">{{ surah.tempatTurun }}</p>
            </div>
          </div>
          <!-- </RouterLink> -->
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import getAllSurah from '@/services/repositories/get-all-surah'
import { RouterLink } from 'vue-router'
import HomeSkeleton from '@/components/skeletons/HomeSkeleton.vue'

const query = useQuery({
  queryKey: ['surah'],
  queryFn: getAllSurah,
  select: (data) => {
    return data?.data
  }
})
</script>
