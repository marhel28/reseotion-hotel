<script setup>
import { useToastState } from '~/composables/useToast'

const toasts = useToastState()

const variantClass = {
  success: 'alert-success',
  info: 'alert-info',
  warning: 'alert-warning',
  error: 'alert-error'
}
</script>

<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="alert shadow-lg w-80 pointer-events-auto"
        :class="variantClass[t.severity] || 'alert-info'"
      >
        <div>
          <span class="font-semibold">{{ t.summary }}</span>
          <p v-if="t.detail" class="text-sm opacity-80">{{ t.detail }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
