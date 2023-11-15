import { reactive } from 'vue'

export const layoutStore = reactive({
  show: false,
  toggle() {
    this.show = !this.show
  }
})

/**
 * @type {AudioStoreTypes}
 */
export const audioStore = reactive({
  isShow: false,
  isPlaying: false,
  surah: null,
  current: null,
  setShow(isShow) {
    this.isShow = isShow
  },
  setPlaying(isPlaying) {
    this.isPlaying = isPlaying
  },
  setSurah(data) {
    this.surah = data
  },
  setCurrent(audio) {
    this.current = audio
  },
  nextVerse() {
    this.current.verse++
    console.log(this.current)
  },
  prevVerse() {
    if (this.current.verse === 1) return
    this.current.verse--
  },
  hasNext() {
    return this.current.verse < this.surah.numberOfVerses
  }
})

/**
 * @typedef {Object} AudioStoreTypes
 * @property {boolean} isShow
 * @property {boolean} isPlaying
 * @property {SurahTypes} surah
 * @property {AudioItemTypes} current
 * @property {(isShow: boolean) => {}} setShow
 * @property {(isPlaying: boolean) => {}} setPlaying
 * @property {(audio: AudioItemTypes) => {}} setCurrent
 * @property {(data: SurahTypes) => {}} setSurah
 * @property {() => {}} nextVerse
 * @property {() => {}} prevVerse
 */

/**
 * @typedef {Object} SurahTypes
 * @property {number} id
 * @property {string} name
 * @property {number} numberOfVerses
 */

/**
 * @typedef {Object} AudioTypes
 * @property {AudioItemTypes} current
 * @property {AudioItemTypes} next
 * @property {AudioItemTypes} before
 */

/**
 * @typedef {Object} AudioItemTypes
 * @property {Array<string>} sources
 * @property {string} verse
 */
