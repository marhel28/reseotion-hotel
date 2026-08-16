import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { translations } from '~/composables/useI18n'

export type Lang = 'en' | 'id'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref<Lang>('id')

  function setLanguage(l: Lang) {
    lang.value = l
    if (import.meta.client) {
      localStorage.setItem('hotosos-lang', l)
    }
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('hotosos-lang') as Lang | null
      if (saved === 'en' || saved === 'id') {
        lang.value = saved
      } else {
        lang.value = 'id'
      }
    }
  }

  const t = computed(() => (key: string) => {
    return translations[key]?.[lang.value] ?? key
  })

  return { lang, setLanguage, init, t }
})
