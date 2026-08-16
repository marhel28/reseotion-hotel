<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantClasses
    ]"
  >
    <span :class="['h-1.5 w-1.5 rounded-full', dotClass]" />
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'

const props = defineProps({
  status: { type: String, required: true },
  type: { type: String, default: 'generic' } // 'reservation' | 'room' | 'payment' | 'generic'
})

const { t } = useI18n()

const config = computed(() => {
  const map = {
    // Reservation statuses
    confirmed: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'confirmed' },
    pending: { classes: 'bg-warning-bg text-warning', dot: 'bg-warning', labelKey: 'pending' },
    checked_in: { classes: 'bg-info-bg text-info', dot: 'bg-info', labelKey: 'checked_in' },
    checked_out: { classes: 'bg-surface-hover text-text-secondary', dot: 'bg-text-muted', labelKey: 'checked_out' },
    cancelled: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'cancelled' },
    no_show: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'no_show' },
    // Room statuses
    available: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'available' },
    occupied: { classes: 'bg-info-bg text-info', dot: 'bg-info', labelKey: 'occupied' },
    reserved: { classes: 'bg-warning-bg text-warning', dot: 'bg-warning', labelKey: 'reserved' },
    dirty: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'dirty' },
    cleaning: { classes: 'bg-warning-bg text-warning', dot: 'bg-warning', labelKey: 'cleaning' },
    maintenance: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'maintenance' },
    out_of_order: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'out_of_order' },
    // Payment statuses
    paid: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'paid' },
    partial: { classes: 'bg-warning-bg text-warning', dot: 'bg-warning', labelKey: 'pending' },
    refunded: { classes: 'bg-surface-hover text-text-secondary', dot: 'bg-text-muted', labelKey: 'refunded' },
    failed: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'failed' },
    overdue: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'overdue' },
    completed: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'paid' },
    // Expense statuses
    approved: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'confirmed' },
    rejected: { classes: 'bg-danger-bg text-danger', dot: 'bg-danger', labelKey: 'cancelled' },
    // Housekeeping
    clean: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'available' },
    inspected: { classes: 'bg-success-bg text-success', dot: 'bg-success', labelKey: 'confirmed' },
  }
  return map[props.status] || { classes: 'bg-surface-hover text-text-secondary', dot: 'bg-text-muted', labelKey: props.status }
})

const variantClasses = computed(() => config.value.classes)
const dotClass = computed(() => config.value.dot)
const label = computed(() => t(config.value.labelKey))
</script>
