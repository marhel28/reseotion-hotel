<template>
  <div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
    <div class="flex items-start justify-between">
      <p class="text-xs font-medium uppercase tracking-wide text-text-muted">{{ label }}</p>
      <span
        v-if="trend !== undefined"
        :class="['inline-flex items-center gap-0.5 text-xs font-medium', trend >= 0 ? 'text-success' : 'text-danger']"
      >
        <Icon :name="trend >= 0 ? 'arrow-up' : 'arrow-down'" :size="10" />
        {{ Math.abs(trend) }}%
      </span>
    </div>
    <p class="mt-2 text-2xl font-semibold tabular text-text-primary">{{ value }}</p>
    <p v-if="hint" class="mt-1 text-xs text-text-muted">{{ hint }}</p>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: Number, default: undefined },
  hint: { type: String, default: '' }
})
</script>
