<template>
  <div
    :class="[
      'fixed w-full md:w-[350px] text-white h-screen z-[100] -translate-x-full transition-transform duration-300',
      'flex',
      layoutStore.isShow && 'translate-x-0'
    ]"
  >
    <div class="p-3 w-full bg-cyan-600 h-full">
      <div class="relative">
        <h1 class="text-xl font-normal text-center text-white">Quran</h1>
        <button
          class="absolute top-1/2 -translate-y-1/2 right-0 text-2xl"
          @click="layoutStore.hide()"
        >
          <IconTimes />
        </button>
      </div>

      <div>
        <ul class="siderbar-lists">
          <li>
            <RouterLink to="/" :class="[activeLink === '/' && 'bg-black bg-opacity-10']">
              <i><HomeIcon class="w-5 stroke-2" /></i>
              <span class="mt-1 leading-none">Halaman Awal</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/prayers"
              :class="[activeLink === '/prayers' && 'bg-black bg-opacity-10']"
            >
              <i><DocumentIcon class="w-5 stroke-2" /></i>
              <span class="mt-1 leading-none">Doa Pendek</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/bookmarks"
              :class="[activeLink === '/bookmarks' && 'bg-black bg-opacity-10']"
            >
              <i><BookmarkIcon class="w-5 stroke-2" /></i>
              <span class="mt-1 leading-none">Markah</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/settings"
              :class="[activeLink === '/settings' && 'bg-black bg-opacity-10']"
            >
              <i><Cog6ToothIcon class="w-5 stroke-2" /></i>
              <span class="mt-1 leading-none">Pengaturan</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/about" :class="[activeLink === '/about' && 'bg-black bg-opacity-10']">
              <i><InformationCircleIcon class="w-5 stroke-2" /></i>
              <span class="mt-1 leading-none">Tentang</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  <div
    :class="[
      'backdrop absolute top-0 right-0 bg-black bg-opacity-40 w-full h-screen hidden z-50',
      layoutStore.isShow && '!block'
    ]"
  ></div>
</template>

<script setup>
import { layoutStore } from '@/stores'
import IconTimes from '@/components/icons/IconTimes.vue'
import {
  BookmarkIcon,
  Cog6ToothIcon,
  DocumentIcon,
  HomeIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const activeLink = computed(() => {
  return router.currentRoute.value.path
})
</script>

<style lang="postcss" scoped>
.siderbar-lists {
  @apply flex flex-col gap-2 mt-10 [&_i]:flex-shrink-0;
}

.siderbar-lists li a {
  @apply w-full p-4 hover:bg-black hover:bg-opacity-10 rounded-md flex items-center gap-3;
}
</style>
