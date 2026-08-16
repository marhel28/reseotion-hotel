<template>
  <div class="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-12 text-center">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover">
      <Icon :name="icon" class="text-text-muted" :size="20" />
    </div>
    <h3 class="text-sm font-medium text-text-primary">{{ title }}</h3>
    <p class="mt-1 max-w-sm text-xs text-text-muted">{{ message }}</p>
    <button
      v-if="actionLabel"
      class="btn btn-sm mt-4"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps({
  icon: { type: String, default: 'inbox' },
  title: { type: String, required: true },
  message: { type: String, default: '' },
  actionLabel: { type: String, default: '' }
})

defineEmits(['action'])
</script>
