<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, default: '' },
  size: { type: [Number, String], default: 16 },
  class: { type: String, default: '' }
})

// Manual aliases for icons whose Lucide name doesn't match kebab-case
const ALIASES = {
  'refresh': 'RefreshCcw',
  'sort': 'ArrowUpDown',
  'sortup': 'ArrowUpNarrowWide',
  'sortdown': 'ArrowDownWideNarrow',
  'chartline': 'ChartLine',
  'chartbar': 'ChartBar',
  'chartcolumn': 'ChartColumn',
  'signin': 'LogIn',
  'signout': 'LogOut',
  'sign-in': 'LogIn',
  'sign-out': 'LogOut',
  'sparkles': 'Sparkles',
  'idcard': 'IdCard',
  'slidershorizontal': 'SlidersHorizontal',
  'thlarge': 'LayoutGrid',
  'chevronright': 'ChevronRight',
  'chevronleft': 'ChevronLeft',
  'chevrondown': 'ChevronDown',
  'chevronup': 'ChevronUp',
  'building2': 'Building2',
  'creditcard': 'CreditCard',
  'checkcircle': 'CheckCircle',
  'piplus': 'Plus',
  'piminus': 'Minus',
}

function toPascalCase(raw) {
  return raw
    .split(/[-_\s]+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('')
}

const key = computed(() => {
  let raw = props.name
  // Strip primeicons prefix
  raw = raw.replace(/^pi pi-/, '').replace(/^pi-/, '')
  const lower = raw.toLowerCase()
  // Check aliases first
  if (ALIASES[lower]) return ALIASES[lower]
  // Convert kebab-case to PascalCase
  return toPascalCase(raw)
})

const IconComp = computed(() => {
  const k = key.value
  if (icons[k]) return icons[k]
  // Try with common suffixes
  if (icons[k + 'Icon']) return icons[k + 'Icon']
  // Try case-insensitive search
  const lower = k.toLowerCase()
  const found = Object.keys(icons).find(key => key.toLowerCase() === lower)
  if (found) return icons[found]
  return icons.HelpCircle
})
</script>

<template>
  <component :is="IconComp" :size="Number(size)" :class="$props.class" />
</template>
