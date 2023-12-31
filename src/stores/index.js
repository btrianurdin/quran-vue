import { reactive } from 'vue'

export const layoutStore = reactive({
  isShow: false,
  show() {
    this.isShow = true
  },
  hide() {
    this.isShow = false
  }
})

export const shareStore = reactive({
  isShow: false,
  data: {
    link: '',
    text: ''
  },
  show(data) {
    this.isShow = true
    this.data = data
  },
  hide() {
    this.isShow = false
    this.data = {
      link: '',
      text: ''
    }
  }
})

/**
 * @type {AudioStoreTypes}
 */
export const audioStore = reactive({
  isShow: false,
  isPlaying: false,
  data: null,
  currentPlay: null,
  setShow(isShow) {
    this.isShow = isShow
  },
  setPlaying(isPlaying) {
    this.isPlaying = isPlaying
  },
  setData(data) {
    this.data = data
  },
  setCurrentPlay(verse) {
    this.currentPlay = verse
  },
  nextVerse() {
    this.currentPlay++
  },
  prevVerse() {
    if (this.currentPlay === 1) return
    this.currentPlay--
  },
  hasNext() {
    return this.currentPlay < this.data.numberOfVerses
  }
})

/**
 * @typedef AudioStoreTypes
 * @property {boolean} isShow
 * @property {boolean} isPlaying
 * @property {AudioTypes} data
 * @property {number} currentPlay
 * @property {(isShow: boolean) => {}} setShow
 * @property {(isPlaying: boolean) => {}} setPlaying
 * @property {(audio: AudioTypes) => {}} setData
 * @property {(verse: number) => {}} setCurrentPlay
 * @property {() => {}} nextVerse
 * @property {() => {}} prevVerse
 */

/**
 * @typedef {Object} AudioTypes
 * @property {number} id
 * @property {string} surahName
 * @property {number} numberOfVerses
 * @property {Array<string>} sources
 * @property {number} fixedVerseNumber
 */
