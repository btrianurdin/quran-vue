import { reactive } from 'vue'

export const layoutStore = reactive({
  show: false,
  toggle() {
    this.show = !this.show
  }
})

export const settingsStore = reactive({})
