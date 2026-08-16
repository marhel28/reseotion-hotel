<template>
  <div class="mb-6">
    <!-- Breadcrumb -->
    <nav v-if="breadcrumb?.length" class="mb-2 flex items-center gap-1.5 text-xs text-text-muted">
      <template v-for="(item, i) in breadcrumb" :key="i">
        <NuxtLink
          v-if="item.path && i < breadcrumb.length - 1"
          :to="item.path"
          class="hover:text-accent transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-text-secondary">{{ item.label }}</span>
        <Icon v-if="i < breadcrumb.length - 1" name="chevron-right" :size="10" />
      </template>
    </nav>

    <!-- Title row -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-semibold text-text-primary">{{ title }}</h1>
        <p v-if="subtitle" class="mt-0.5 text-sm text-text-secondary">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  breadcrumb: { type: Array, default: () => [] }
})
</script>
