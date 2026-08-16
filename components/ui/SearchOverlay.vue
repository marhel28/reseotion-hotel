<template>
  <dialog ref="dialogRef" class="modal" @close="close">
    <div class="modal-box bg-surface border border-border !p-0 max-w-xl shadow-2xl rounded-2xl overflow-hidden">
      <div class="flex flex-col">
        <!-- Search input header -->
        <div class="flex items-center gap-3 border-b border-border px-4 py-3.5 bg-surface">
          <Icon name="search" class="text-accent" :size="18" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Type a command or search (e.g. 'Room 204', 'Arrivals', 'John Smith')..."
            class="flex-1 bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-muted"
          />
          <span class="text-[10px] font-medium text-text-muted bg-surface-hover px-2 py-0.5 rounded border border-border">ESC</span>
        </div>

        <!-- Command Palette Results -->
        <div class="max-h-96 overflow-y-auto p-3 space-y-4">
          <!-- Filtered Results when typing -->
          <template v-if="query.length > 0">
            <div v-if="filteredResults.length === 0" class="py-8 text-center">
              <Icon name="search" :size="28" class="mx-auto text-text-muted mb-2 opacity-40" />
              <p class="text-sm font-medium text-text-secondary">No matching results found for "{{ query }}"</p>
              <p class="text-xs text-text-muted mt-1">Try searching for room numbers, guest names, or booking IDs.</p>
            </div>
            <div v-else v-for="group in groupedResults" :key="group.category" class="space-y-1">
              <p class="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                {{ group.category }}
              </p>
              <button
                v-for="item in group.items"
                :key="item.id"
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs sm:text-sm hover:bg-surface-hover transition-colors group"
                @click="navigateTo(item.path)"
              >
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-background group-hover:bg-primary/10 transition-colors">
                  <Icon :name="item.icon" class="text-text-secondary group-hover:text-primary transition-colors" :size="16" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-text-primary truncate">{{ item.label }}</p>
                  <p v-if="item.sublabel" class="text-[11px] text-text-muted truncate">{{ item.sublabel }}</p>
                </div>
                <Icon name="chevron-right" :size="14" class="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </template>

          <!-- Default Command Center Suggestions when empty -->
          <template v-else>
            <!-- Quick Actions -->
            <div class="space-y-1">
              <p class="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Quick Actions
              </p>
              <div class="grid grid-cols-2 gap-1.5 px-1">
                <button
                  v-for="action in quickActions"
                  :key="action.label"
                  class="flex items-center gap-2.5 rounded-xl border border-border/80 bg-background p-2.5 text-left hover:border-primary/40 hover:bg-surface-hover transition-all"
                  @click="navigateTo(action.path)"
                >
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon :name="action.icon" :size="14" />
                  </div>
                  <span class="text-xs font-medium text-text-primary truncate">{{ action.label }}</span>
                </button>
              </div>
            </div>

            <!-- Smart Filter Shortcuts -->
            <div class="space-y-1">
              <p class="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Smart Operations Filters
              </p>
              <button
                v-for="item in smartFilters"
                :key="item.label"
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs hover:bg-surface-hover transition-colors"
                @click="navigateTo(item.path)"
              >
                <Icon :name="item.icon" class="text-accent" :size="15" />
                <span class="font-medium text-text-primary">{{ item.label }}</span>
                <span class="ml-auto text-[10px] text-text-muted bg-surface-hover px-2 py-0.5 rounded-full border border-border">Shortcut</span>
              </button>
            </div>
          </template>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between border-t border-border bg-surface-hover/30 px-4 py-2 text-[11px] text-text-muted">
          <div class="flex items-center gap-3">
            <span><kbd class="rounded bg-surface px-1 py-0.5 border border-border text-[10px]">↵</kbd> Select</span>
            <span><kbd class="rounded bg-surface px-1 py-0.5 border border-border text-[10px]">↑↓</kbd> Navigate</span>
          </div>
          <span>HotelOS Command Palette</span>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import { mockRooms } from '~/mock/rooms'
import Icon from './Icon.vue'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['update:visible'])
const router = useRouter()
const { t } = useI18n()

const dialogRef = ref(null)
const query = ref('')
const inputRef = ref()

watch(() => props.visible, (v) => {
  if (v) {
    query.value = ''
    setTimeout(() => {
      dialogRef.value?.showModal()
      inputRef.value?.focus()
    }, 50)
  } else {
    dialogRef.value?.close()
  }
})

function close() {
  emit('update:visible', false)
}

const quickActions = [
  { label: t('new_reservation'), path: '/reservations/new', icon: 'plus' },
  { label: t('check_in'), path: '/front-desk', icon: 'log-in' },
  { label: t('add_guest'), path: '/guests', icon: 'user-plus' },
  { label: t('add_expense'), path: '/expenses', icon: 'wallet' },
]

const smartFilters = [
  { label: 'Today\'s Arrivals & Check-ins', path: '/front-desk', icon: 'arrow-down-right' },
  { label: 'Pending Payments Verification', path: '/payments', icon: 'credit-card' },
  { label: 'Dirty Rooms Housekeeping Queue', path: '/housekeeping', icon: 'sparkles' },
  { label: 'Maintenance & Out of Order Rooms', path: '/rooms', icon: 'wrench' },
]

const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []

  const results = []

  // Check room numbers
  mockRooms.forEach(r => {
    if (r.number.includes(q) || `room ${r.number}`.includes(q)) {
      results.push({
        id: `room-${r.id}`,
        category: t('rooms'),
        label: `Room ${r.number}`,
        sublabel: `${r.type?.name || 'Standard'} • Floor ${r.floor} • Status: ${r.status}`,
        path: `/rooms/${r.id}`,
        icon: 'layout-grid'
      })
    }
  })

  // Check guest names / email / phone
  mockGuests.forEach(g => {
    if (g.fullName.toLowerCase().includes(q) || g.email.toLowerCase().includes(q) || g.phone.includes(q)) {
      results.push({
        id: `guest-${g.id}`,
        category: t('guests'),
        label: g.fullName,
        sublabel: `${g.country} • ${g.totalStays} stays • ${g.email}`,
        path: `/guests/${g.id}`,
        icon: 'user'
      })
    }
  })

  // Check reservations
  mockReservations.forEach(r => {
    if (r.bookingId.toLowerCase().includes(q) || r.roomType.toLowerCase().includes(q)) {
      results.push({
        id: `res-${r.id}`,
        category: t('reservations'),
        label: `Booking ${r.bookingId}`,
        sublabel: `${r.roomType} • Check-in: ${r.checkIn} • ${r.status}`,
        path: `/reservations/${r.id}`,
        icon: 'calendar'
      })
    }
  })

  return results.slice(0, 15)
})

const groupedResults = computed(() => {
  const groups = {}
  filteredResults.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = { category: item.category, items: [] }
    groups[item.category].items.push(item)
  })
  return Object.values(groups)
})

function navigateTo(path) {
  close()
  router.push(path)
}
</script>
