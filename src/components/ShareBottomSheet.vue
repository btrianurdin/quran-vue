<template>
  <div
    :class="[
      'share-bottom-sheet fixed z-[60] w-full bg-white rounded-t-3xl bottom-0 left-1/2 p-4 md:w-[600px]',
      'transform -translate-x-1/2 translate-y-full transition-transform duration-300',
      shareStore.isShow && '!translate-y-0'
    ]"
  >
    <div class="h-full">
      <div class="relative caret-lime-50">
        <h2 class="text-lg font-normal text-center">Bagikan</h2>
        <button class="absolute right-0 top-1/2 -translate-y-1/2" @click="shareStore.hide()">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="pt-7">
        <div class="flex gap-8">
          <div
            v-for="item in shareItems"
            :key="item.title"
            class="flex flex-col items-center gap-2"
            @click="handleShare(item.key)"
          >
            <button class="text-white bg-cyan-600 hover:bg-cyan-700 rounded-full p-3">
              <component :is="item.icon" class="w-6 h-6" />
            </button>
            <p class="text-sm">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  <div
    :class="[
      'absolute top-0 right-0 bg-black bg-opacity-40 w-full h-screen hidden backdrop z-20',
      shareStore.isShow && '!block'
    ]"
  ></div>
</template>

<script setup>
import { ClipboardIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import IconFacebookVue from './icons/IconFacebook.vue'
import IconTwitter from './icons/IconTwitter.vue'
import IconWhatsapp from './icons/IconWhatsapp.vue'
import { shareStore } from '@/stores'
import { useToast } from 'vue-toastification'

const $toast = useToast()

const shareItems = [
  {
    key: 'facebook',
    title: 'Facebook',
    icon: IconFacebookVue
  },
  {
    key: 'twitter',
    title: 'Twitter',
    icon: IconTwitter
  },
  {
    key: 'whatsapp',
    title: 'WhatsApp',
    icon: IconWhatsapp
  },
  {
    key: 'copy',
    title: 'Salin',
    icon: ClipboardIcon
  }
]

const handleShare = (key) => {
  switch (key) {
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${shareStore.data.link}`,
        'facebook-share-dialog',
        'width=626,height=436'
      )
      break
    case 'twitter':
      window.open(
        `https://twitter.com/intent/tweet?text=${shareStore.data.text}&url=${shareStore.data.link}`,
        'twitter-share-dialog',
        'width=626,height=436'
      )
      break
    case 'whatsapp':
      window.open(
        `https://api.whatsapp.com/send?text=${shareStore.data.text} ${shareStore.data.link}`,
        'whatsapp-share-dialog',
        'width=626,height=436'
      )
      break
    case 'copy':
      navigator.clipboard.writeText(shareStore.data.link)
      $toast.success('Tautan berhasil disalin')
      break
    default:
      break
  }
  console.log('share', key)
}
</script>

<style scoped>
.share-bottom-sheet {
  box-shadow: 0 -10px 21px -8px rgba(0, 0, 0, 0.1);
}
</style>
