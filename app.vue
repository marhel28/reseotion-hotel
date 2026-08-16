<template>
  <div class="min-h-screen bg-background">
    <AppLayout>
      <NuxtPage />
    </AppLayout>

    <!-- Global toast & confirm -->
    <ToastHost />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguageStore } from '~/stores/language'
import ToastHost from '~/components/ui/ToastHost.vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'

// Keep <html lang> in sync with the active language
const langStore = useLanguageStore()
useHead({
  htmlAttrs: {
    lang: computed(() => langStore.lang)
  }
})
</script>
