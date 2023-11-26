<template>
  <div class="h-full p-4">
    <div v-if="query.isLoading.value">
      <HomeSkeleton />
    </div>
    <div v-if="query.data">
      <div class="mb-4">
        <div class="relative">
          <TextField
            placeholder="Masukkan nama, nomor atau arti surat"
            class="pl-10"
            :value="search"
            @input="(e) => (search = e.target.value)"
          />
          <MagnifyingGlassIcon
            class="w-5 stroke-2 absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
          />
        </div>
      </div>
      <div class="flex flex-col w-full items-start gap-2 pb-4">
        <RouterLink
          :to="{ path: `/surah/${surah.nomor}` }"
          class="text-lg flex items-center gap-3 w-full hover:bg-gray-200 p-2 rounded-md transition-colors duration-300"
          v-for="surah in filteredSurah"
          :key="surah.nomor"
        >
          <!-- <RouterLink to="/sd"> -->
          <div
            class="tabular-nums w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm flex-shrink-0"
          >
            {{ surah.nomor }}
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
import TextField from '@/components/base/TextField.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref, toRaw, watch } from 'vue'
import removeNonAlphanumeric from '@/utils/remove-non-alphanumeric'

const search = ref('')
const filteredSurah = ref([])

const query = useQuery({
  queryKey: ['surah'],
  queryFn: getAllSurah,
  select: (data) => {
    return data?.data
  }
})

watch(
  [query.data, search],
  ([initialData, value]) => {
    const initial = toRaw(initialData)
    const keyword = removeNonAlphanumeric(value)
    const searchRegex = new RegExp(keyword.split(' ').join('.*'), 'i')

    filteredSurah.value = initial?.filter((surah) => {
      return (
        surah.nomor == keyword ||
        removeNonAlphanumeric(surah.namaLatin).match(searchRegex) ||
        removeNonAlphanumeric(surah.arti).match(searchRegex)
      )
    })
  },
  {
    immediate: true
  }
)
</script>
