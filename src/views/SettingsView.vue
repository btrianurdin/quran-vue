<template>
  <div class="flex flex-col h-full">
    <h2 class="text-xl font-medium text-center p-4">Pengaturan</h2>

    <div class="p-4">
      <div class="mb-4">
        <h2 class="text-lg mb-2">Ukuran Font Ayat</h2>
        <div class="flex gap-4 w-1/3">
          <Button @click="handleFontSize('decrease')">
            <MinusIcon class="w-5 stroke-2 text-white" />
          </Button>
          <TextField class="text-center" :value="verseFontSize" readonly />
          <Button @click="handleFontSize('increase')">
            <PlusIcon class="w-5 stroke-2 text-white" />
          </Button>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-lg mb-2">Fitur Teks</h2>
        <div class="flex flex-col gap-2">
          <label>
            <input type="checkbox" v-model="showLatin" class="mr-2" />
            Tampilkan teks latin
          </label>
          <label>
            <input type="checkbox" v-model="showTranslate" class="mr-2" />
            Tampilkan terjemahan
          </label>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="mb-2 text-lg">Preview</h2>
        <div class="border border-gray-300 rounded-md">
          <div
            v-for="sample in samples"
            :key="sample.nomorAyat"
            class="border-b border-gray-300 last:border-b-0 py-5 px-4"
          >
            <div class="w-full flex justify-between items-start gap-4">
              <div class="text-lg tabular-nums font-semibold">{{ sample.nomorAyat }}.</div>
              <div
                dir="rtl"
                class="leading-normal-sans"
                :style="{
                  fontSize: verseFontSize + 'px',
                  lineHeight: verseFontSize * 1.5 + 'px'
                }"
              >
                {{ sample.teksArab }}
                <span
                  class="border inline-flex items-center justify-center w-10 h-10 border-gray-800 rounded-full"
                  :style="{
                    fontSize: verseFontSize / 2 + 'px',
                    width: verseFontSize * 1 + 'px',
                    height: verseFontSize * 1 + 'px'
                  }"
                >
                  {{ convertToArabic(sample.nomorAyat) }}
                </span>
              </div>
            </div>
            <div class="mt-5 text-gray-500" v-if="showLatin">
              {{ sample.teksLatin }}
            </div>
            <div class="mt-3" v-if="showTranslate">
              {{ sample.teksIndonesia }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-lg mb-2">Fitur Audio</h2>
        <div class="mb-3">
          <h3 class="text-base mb-2">Pilih Qari (Pembaca al-quran)</h3>
          <select
            v-model="selectedQari"
            class="relative h-10 px-3 rounded-md border border-gray-300"
          >
            <option
              v-for="qari in murottalAudio"
              :key="qari.id"
              :value="qari.id"
              :selected="qari.id === selectedQari"
            >
              {{ qari.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from '@/components/base/Button.vue'
import TextField from '@/components/base/TextField.vue'
import {
  QARI_ID_KEY,
  SHOW_LATIN_KEY,
  SHOW_TRANSLATION_KEY,
  VERSE_FONT_SIZE_KEY,
  defaultQariId,
  defaultVerseFontSize
} from '@/constants/cache-keys'
import murottalAudio from '@/constants/murottal-audio'
import { audioStore } from '@/stores'
import convertToArabic from '@/utils/convert-arabic'
import storage from '@/utils/storage'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { ref, watch, watchEffect } from 'vue'

const samples = ref([
  {
    nomorAyat: 1,
    teksArab: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    teksLatin: 'bismillāhir-raḥmānir-raḥīm(i).',
    teksIndonesia: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.'
  },
  {
    nomorAyat: 2,
    teksArab: 'اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ',
    teksLatin: 'al-ḥamdu lillāhi rabbil-‘ālamīn(a).',
    teksIndonesia: 'Segala puji bagi Allah, Tuhan seluruh alam,'
  },
  {
    nomorAyat: 234,
    teksArab: 'الرَّحْمٰنِ الرَّحِيْمِۙ',
    teksLatin: 'ar-raḥmānir-raḥīm(i).',
    teksIndonesia: 'Yang Maha Pengasih, Maha Penyayang,'
  }
])

const showTranslate = ref(storage.get(SHOW_TRANSLATION_KEY) ?? true)
const showLatin = ref(storage.get(SHOW_LATIN_KEY) ?? true)
const verseFontSize = ref(storage.get(VERSE_FONT_SIZE_KEY) ?? defaultVerseFontSize)
const selectedQari = ref(storage.get(QARI_ID_KEY) ?? defaultQariId)

watchEffect(() => {
  storage.set(SHOW_TRANSLATION_KEY, showTranslate.value)
  storage.set(SHOW_LATIN_KEY, showLatin.value)
  storage.set(VERSE_FONT_SIZE_KEY, verseFontSize.value)
})

watch(selectedQari, () => {
  audioStore.setShow(false)
  storage.set(QARI_ID_KEY, selectedQari.value)
})

const handleFontSize = (type) => {
  if (type === 'decrease') {
    if (verseFontSize.value === 24) return
    verseFontSize.value -= 1
  } else {
    if (verseFontSize.value === 45) return
    verseFontSize.value += 1
  }
}
</script>
