<template>
  <div v-if="room" class="space-y-6">
    <!-- Header -->
    <PageHeader :title="`${t('rooms')} ${room.number}`" :breadcrumb="breadcrumb" :subtitle="resolveType(room.typeId)">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="navigateTo('/rooms')">
          <Icon name="pi pi-arrow-left" :size="14" /> {{ t('back') }}
        </button>
      </template>
    </PageHeader>

    <!-- Status banner -->
    <div :class="['flex items-center justify-between rounded-xl border px-5 py-4', bannerClass(room.status)]">
      <div class="flex items-center gap-3">
        <span :class="['h-3 w-3 rounded-full', statusDot(room.status)]" />
        <div>
          <p class="text-sm font-medium text-text-primary">{{ t('current_status') }}</p>
          <StatusBadge :status="room.status" type="room" />
        </div>
      </div>
      <!-- Change status -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-text-muted">{{ t('change_status') }}</span>
        <select
          :value="room.status"
          class="select select-bordered select-sm w-40"
          @change="onChangeStatus(($event.target as HTMLSelectElement).value as RoomStatus)"
        >
          <option value="" disabled>{{ t('status') }}</option>
          <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
    </div>

    <!-- Detail cards grid -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <!-- Room Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <div class="flex items-center gap-2">
              <Icon name="pi pi-home" :size="16" class="text-text-muted" />
              <span class="text-sm font-medium">{{ t('room_info') }}</span>
            </div>
          </div>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between border-b border-border pb-2">
              <dt class="text-text-muted">{{ t('room_number') }}</dt>
              <dd class="font-semibold text-text-primary">{{ room.number }}</dd>
            </div>
            <div class="flex justify-between border-b border-border pb-2">
              <dt class="text-text-muted">{{ t('type') }}</dt>
              <dd class="font-medium text-text-primary">{{ resolveType(room.typeId) }}</dd>
            </div>
            <div class="flex justify-between border-b border-border pb-2">
              <dt class="text-text-muted">{{ t('floor') }}</dt>
              <dd class="font-medium text-text-primary">{{ room.floor }}</dd>
            </div>
            <div class="flex justify-between border-b border-border pb-2">
              <dt class="text-text-muted">{{ t('capacity') }}</dt>
              <dd class="font-medium text-text-primary">{{ resolveCapacity(room.typeId) }} {{ t('guests') }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-text-muted">{{ t('price') }}</dt>
              <dd class="font-semibold tabular text-primary">{{ formatRupiah(room.price) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Current Status -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <div class="flex items-center gap-2">
              <Icon name="pi pi-info-circle" :size="16" class="text-text-muted" />
              <span class="text-sm font-medium">{{ t('current_status') }}</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <StatusBadge :status="room.status" type="room" />
              <span class="text-sm capitalize text-text-secondary">{{ room.status.replace('_', ' ') }}</span>
            </div>
            <div class="rounded-lg bg-surface-hover p-3">
              <p class="text-xs text-text-muted">{{ t('description') }}</p>
              <p class="mt-1 text-sm text-text-primary">{{ statusDescription(room.status) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Housekeeping Status -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <div class="flex items-center gap-2">
              <Icon name="pi pi-sparkles" :size="16" class="text-text-muted" />
              <span class="text-sm font-medium">{{ t('housekeeping') }}</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span :class="['h-2.5 w-2.5 rounded-full', housekeepingDot(room.housekeepingStatus)]" />
                <StatusBadge :status="room.housekeepingStatus" type="room" />
              </div>
              <span class="text-xs capitalize text-text-muted">{{ room.housekeepingStatus.replace('_', ' ') }}</span>
            </div>
            <button class="btn btn-outline btn-sm w-full" @click="cleaningRequested = true">
              <Icon name="pi pi-broom" :size="14" /> {{ t('assign_cleaning') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Current Guest -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <div class="flex items-center gap-2">
              <Icon name="pi pi-user" :size="16" class="text-text-muted" />
              <span class="text-sm font-medium">{{ t('current_guest') }}</span>
            </div>
          </div>
          <div v-if="room.status === 'occupied' && reservation" class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {{ guestInitials }}
              </div>
              <div>
                <p class="text-sm font-medium text-text-primary">{{ guestName }}</p>
                <p class="text-xs text-text-muted">{{ reservation.bookingId }}</p>
              </div>
            </div>
            <dl class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-border pb-2">
                <dt class="text-text-muted">{{ t('check_in') }}</dt>
                <dd class="tabular text-text-primary">{{ reservation.checkIn }}</dd>
              </div>
              <div class="flex justify-between border-b border-border pb-2">
                <dt class="text-text-muted">{{ t('check_out') }}</dt>
                <dd class="tabular text-text-primary">{{ reservation.checkOut }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-text-muted">{{ t('nights') }}</dt>
                <dd class="text-text-primary">{{ reservation.nights }}</dd>
              </div>
            </dl>
          </div>
          <div v-else class="flex flex-col items-center py-4 text-center">
            <Icon name="pi pi-user-minus" :size="24" class="text-text-muted" />
            <p class="mt-2 text-sm text-text-muted">{{ t('no_guest') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-wrap gap-2 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <button class="btn btn-outline btn-sm" @click="maintenanceRequested = true">
        <Icon name="pi pi-wrench" :size="14" /> {{ t('maintenance_request') }}
      </button>
      <button class="btn btn-outline btn-sm">
        <Icon name="pi pi-clock" :size="14" /> {{ t('view_history') }}
      </button>
      <button class="btn btn-sm" :disabled="room.housekeepingStatus === 'clean'" @click="markClean">
        <Icon name="pi pi-check-circle" :size="14" /> {{ t('mark_as_clean') }}
      </button>
    </div>

    <!-- Confirm dialogs -->
    <Modal v-model:visible="cleaningRequested" :header="t('assign_cleaning')">
      <p class="text-sm text-text-secondary">{{ t('assign_cleaning_confirm') }} <strong class="text-text-primary">{{ room.number }}</strong>?</p>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="cleaningRequested = false">{{ t('cancel') }}</button>
        <button class="btn btn-sm" @click="confirmCleaning">{{ t('confirm') }}</button>
      </template>
    </Modal>

    <Modal v-model:visible="maintenanceRequested" :header="t('maintenance_request')">
      <p class="text-sm text-text-secondary">{{ t('maintenance_confirm') }} <strong class="text-text-primary">{{ room.number }}</strong>?</p>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="maintenanceRequested = false">{{ t('cancel') }}</button>
        <button class="btn btn-error btn-sm" @click="confirmMaintenance">{{ t('confirm') }}</button>
      </template>
    </Modal>
  </div>

  <!-- Not found -->
  <EmptyState
    v-else
    icon="pi pi-exclamation-triangle"
    :title="t('room_not_found')"
    :message="t('room_not_found_msg')"
    :action-label="t('back')"
    @action="navigateTo('/rooms')"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import { mockRooms } from '~/mock/rooms'
import mockRoomTypes from '~/mock/roomTypes'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import type { RoomStatus } from '~/types/index'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'
import Modal from '~/components/ui/Modal.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const id = computed(() => Number(route.params.id))
const room = computed(() => mockRooms.find(r => r.id === id.value) ?? null)

const breadcrumb = computed(() => [
  { label: t('dashboard'), path: '/' },
  { label: t('rooms'), path: '/rooms' },
  { label: room.value ? `${t('rooms')} ${room.value.number}` : '' },
])

// Status options for change-status dropdown
const statusOptions = [
  { label: t('available'), value: 'available' },
  { label: t('occupied'), value: 'occupied' },
  { label: t('reserved'), value: 'reserved' },
  { label: t('dirty'), value: 'dirty' },
  { label: t('cleaning'), value: 'cleaning' },
  { label: t('maintenance'), value: 'maintenance' },
  { label: t('out_of_order'), value: 'out_of_order' },
]

// Find the active reservation for this room
const reservation = computed(() => {
  if (!room.value) return null
  return mockReservations.find(
    r => r.roomId === room.value!.id && (r.status === 'checked_in' || r.status === 'confirmed')
  ) ?? null
})

const guestName = computed(() => {
  if (!reservation.value) return '-'
  const guest = mockGuests.find(g => g.id === reservation.value!.guestId)
  return guest?.fullName ?? '-'
})

const guestInitials = computed(() => {
  return guestName.value
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

// Helpers
function resolveType(typeId: number): string {
  return mockRoomTypes.find(rt => rt.id === typeId)?.name ?? '-'
}

function resolveCapacity(typeId: number): number {
  return mockRoomTypes.find(rt => rt.id === typeId)?.capacity ?? 2
}

const statusDot = (status: RoomStatus) => {
  const map: Record<RoomStatus, string> = {
    available: 'bg-success',
    occupied: 'bg-info',
    reserved: 'bg-warning',
    dirty: 'bg-danger',
    cleaning: 'bg-warning',
    maintenance: 'bg-danger',
    out_of_order: 'bg-danger',
  }
  return map[status] || 'bg-text-muted'
}

const housekeepingDot = (status: string) => {
  const map: Record<string, string> = {
    clean: 'bg-success',
    inspected: 'bg-success',
    dirty: 'bg-danger',
    cleaning: 'bg-warning',
    out_of_order: 'bg-danger',
  }
  return map[status] || 'bg-text-muted'
}

const bannerClass = (status: RoomStatus) => {
  const map: Record<RoomStatus, string> = {
    available: 'bg-success-bg border-success/30',
    occupied: 'bg-info-bg border-info/30',
    reserved: 'bg-warning-bg border-warning/30',
    dirty: 'bg-danger-bg border-danger/30',
    cleaning: 'bg-warning-bg border-warning/30',
    maintenance: 'bg-danger-bg border-danger/30',
    out_of_order: 'bg-danger-bg border-danger/30',
  }
  return map[status] || 'bg-surface border-border'
}

function statusDescription(status: RoomStatus) {
  const map: Record<RoomStatus, string> = {
    available: t('desc_available'),
    occupied: t('desc_occupied'),
    reserved: t('desc_reserved'),
    dirty: t('desc_dirty'),
    cleaning: t('desc_cleaning'),
    maintenance: t('desc_maintenance'),
    out_of_order: t('desc_out_of_order'),
  }
  return map[status] ?? ''
}

// Dialogs
const cleaningRequested = ref(false)
const maintenanceRequested = ref(false)

function onChangeStatus(status: RoomStatus) {
  // In a real app this would persist; here we just surface intent
  cleaningRequested.value = false
  void status
}

function confirmCleaning() {
  cleaningRequested.value = false
}

function confirmMaintenance() {
  maintenanceRequested.value = false
}

function markClean() {
  // intent placeholder
}

function navigateTo(path: string) {
  router.push(path)
}
</script>
