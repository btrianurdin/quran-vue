<template>
  <div v-if="audioStore.isShow" class="w-full z-40 relative p-4 shadow-up flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-cyan-600 animate-pulse rounded-full" />
        <p class="text-sm text-gray-600">
          Memutar Q.S {{ audioData.surahName }} Ayat
          {{ audioData?.fixedVerseNumber ?? verseNumberPlay }}
        </p>
      </div>
      <button @click="audioStore.setShow(false)">
        <XMarkIcon class="h-6 text-cyan-600" />
      </button>
    </div>
    <div class="flex flex-col w-full gap-3 items-center">
      <div class="relative bg-gray-300 w-full h-2 rounded-full overflow-hidden">
        <div class="w-1/2 bg-cyan-600 h-full" :style="{ width: `${current.percent}%` }"></div>
      </div>
      <div class="flex justify-between items-center w-full">
        <div class="flex-shrink-0 text-gray-600">{{ convertTimeDuration(current.time) }}</div>
        <div class="flex items-center gap-4">
          <button @click="audioNavigation('prev')">
            <BackwardIcon class="h-7 text-cyan-600" />
          </button>
          <button @click="audioPlayButton">
            <PlayIcon v-if="paused" class="h-7 text-cyan-600" />
            <PauseIcon v-if="!paused" class="h-7 text-cyan-600" />
          </button>
          <button @click="audioNavigation('next')">
            <ForwardIcon class="h-7 text-cyan-600" />
          </button>
        </div>
        <div class="flex-shrink-0 text-gray-600">{{ convertTimeDuration(duration) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import convertTimeDuration from '@/utils/convert-time-duration'
import { audioStore } from '@/stores'

/**
 * @type {import('vue').Ref<HTMLAudioElement>}
 */
const player = ref(new Audio())

const paused = ref(true)
const duration = ref(0)
const current = ref({
  time: 0,
  percent: 0
})

const audioData = computed(() => audioStore.data)
const verseNumberPlay = computed(() => audioStore.currentPlay)

/**
 * watch every changes on audioData and verseNumberPlay
 */
watch([audioData, verseNumberPlay], ([data, verse]) => {
  if (verse) {
    player.value.src = data.sources[verse - 1]
    player.value.load()

    autoPlay()
  }
})

const audioNavigation = (type) => {
  if (type === 'next' && audioStore.hasNext()) {
    audioStore.nextVerse()
  }
  if (type === 'prev') {
    audioStore.prevVerse()
  }
}

const autoPlay = () => {
  resetAudioState()
  player.value.volume = 1

  player.value.play()
  paused.value = false

  player.value.addEventListener('timeupdate', handleTimeUpdate)
  player.value.addEventListener('loadedmetadata', handleLoadedMetadata)
  player.value.addEventListener('pause', handlePause)
  player.value.addEventListener('playing', handlePlay)
  player.value.addEventListener('ended', handleEnded)
}

const audioPlayButton = () => {
  if (paused.value) {
    player.value.play()
  } else {
    player.value.pause()
  }
}

const handlePause = () => {
  paused.value = true
}

const handlePlay = () => {
  paused.value = false
}

const handleTimeUpdate = (e) => {
  const percent = (e.target.currentTime / e.target.duration) * 100
  current.value.percent = percent
  current.value.time = e.target.currentTime
}

const handleLoadedMetadata = (e) => {
  if (!isNaN(e.target.duration)) {
    duration.value = e.target.duration
  }
}

const handleEnded = () => {
  if (audioStore.hasNext()) return audioStore.nextVerse()

  paused.value = true
}

const resetAudioState = () => {
  if (player.value) {
    player.value.pause()
    player.value.currentTime = 0
    current.value.percent = 0
    current.value.time = 0
    duration.value = 0
  }
}

watch(
  () => audioStore.isShow,
  (show) => {
    if (!show) {
      resetAudioState()
      cleanUpListener()
    }
  }
)

const cleanUpListener = () => {
  player.value.removeEventListener('timeupdate', handleTimeUpdate)
  player.value.removeEventListener('loadedmetadata', handleLoadedMetadata)
  player.value.removeEventListener('pause', handlePause)
  player.value.removeEventListener('playing', handlePlay)
  player.value.removeEventListener('ended', handleEnded)
}

onBeforeUnmount(() => cleanUpListener())
</script>

<style scoped>
.shadow-up {
  box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.1);
}
</style>
