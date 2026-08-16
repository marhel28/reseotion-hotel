<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="reservation?.bookingId || `Reservation #${id}`" :breadcrumb="breadcrumb">
      <template #actions>
        <StatusBadge v-if="reservation" :status="reservation.status" type="reservation" />
      </template>
    </PageHeader>

    <!-- Not Found -->
    <EmptyState
      v-if="!reservation"
      icon="calendar-x"
      :title="t('no_reservations')"
      message="The reservation you are looking for does not exist."
      :action-label="t('back')"
      @action="navigateTo('/reservations')"
    />

    <!-- Reservation Details -->
    <template v-else>
      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button class="btn btn-outline btn-sm">
          <Icon name="pencil" :size="14" /> {{ t('edit') }}
        </button>
        <button
          v-if="reservation.status === 'confirmed' || reservation.status === 'pending'"
          class="btn btn-outline btn-error btn-sm"
          @click="confirmCancel"
        >
          <Icon name="x" :size="14" /> {{ t('cancel') }}
        </button>
        <button
          v-if="reservation.status === 'confirmed'"
          class="btn btn-success btn-sm"
        >
          <Icon name="log-in" :size="14" /> {{ t('check_in') }}
        </button>
        <button
          v-if="reservation.status === 'checked_in'"
          class="btn btn-info btn-sm"
        >
          <Icon name="log-out" :size="14" /> {{ t('check_out') }}
        </button>
      </div>

      <!-- Guest Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <Icon name="user" class="text-text-muted" :size="16" />
            <span class="text-sm font-semibold text-text-primary">{{ t('guest') }} {{ t('info') }}</span>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p class="text-xs text-text-muted">{{ t('full_name') }}</p>
              <p class="mt-0.5 text-sm font-medium text-text-primary">{{ reservation.guest?.fullName || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('phone') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.guest?.phone || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('email') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.guest?.email || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('country') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.guest?.country || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">ID/Passport</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.guest?.idNumber || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">VIP</p>
              <p class="mt-0.5 text-sm text-text-secondary">
                <span v-if="reservation.guest?.vip" class="badge badge-warning text-[10px]">VIP</span>
                <span v-else>-</span>
              </p>
            </div>
            <div v-if="reservation.specialRequests" class="md:col-span-2 lg:col-span-3">
              <p class="text-xs text-text-muted">{{ t('special_requests') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.specialRequests }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Room Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <Icon name="home" class="text-text-muted" :size="16" />
            <span class="text-sm font-semibold text-text-primary">{{ t('room') }} {{ t('info') }}</span>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p class="text-xs text-text-muted">{{ t('room_number') }}</p>
              <p class="mt-0.5 text-sm font-medium text-text-primary">{{ reservation.room?.number || reservation.roomId }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('room_type') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.roomType }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">Floor</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.room?.floor || '-' }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('guests') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.guests }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('rate') }}</p>
              <p class="mt-0.5 text-sm font-medium text-text-primary">{{ formatRupiah(reservation.room?.price || 0) }} / {{ t('nights') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stay Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <Icon name="calendar" class="text-text-muted" :size="16" />
            <span class="text-sm font-semibold text-text-primary">{{ t('stay') }} {{ t('info') }}</span>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p class="text-xs text-text-muted">{{ t('check_in') }}</p>
              <p class="mt-0.5 text-sm font-medium tabular text-text-primary">{{ formatDate(reservation.checkIn) }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('check_out') }}</p>
              <p class="mt-0.5 text-sm font-medium tabular text-text-primary">{{ formatDate(reservation.checkOut) }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('nights') }}</p>
              <p class="mt-0.5 text-sm text-text-secondary">{{ reservation.nights }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('source') }}</p>
              <p class="mt-0.5 text-sm capitalize text-text-secondary">{{ reservation.source?.replace('_', ' ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <Icon name="credit-card" class="text-text-muted" :size="16" />
            <span class="text-sm font-semibold text-text-primary">{{ t('payment') }} {{ t('info') }}</span>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p class="text-xs text-text-muted">{{ t('amount') }}</p>
              <p class="mt-0.5 text-lg font-bold text-primary">{{ formatRupiah(reservation.amount) }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('status') }}</p>
              <p class="mt-0.5">
                <StatusBadge :status="reservation.paymentStatus" type="payment" />
              </p>
            </div>
            <div>
              <p class="text-xs text-text-muted">Created</p>
              <p class="mt-0.5 text-sm tabular text-text-secondary">{{ formatDate(reservation.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { useConfirm } from '~/composables/useConfirm'
import { formatRupiah, formatDate } from '~/utils/format'
import { mockReservations } from '~/mock/reservations'
import { mockGuests } from '~/mock/guests'
import { mockRooms } from '~/mock/rooms'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const confirm = useConfirm()

// Get id from route params
const id = computed(() => Number(route.params.id))

// Find reservation and enrich with related data
const reservation = computed(() => {
  const res = mockReservations.find((r) => r.id === id.value)
  if (!res) return null
  return {
    ...res,
    guest: mockGuests.find((g) => g.id === res.guestId),
    room: mockRooms.find((rm) => rm.id === res.roomId),
  }
})

// Breadcrumb
const breadcrumb = computed(() => [
  { label: t('dashboard'), path: '/' },
  { label: t('reservations'), path: '/reservations' },
  { label: reservation.value?.bookingId || `#${id.value}` },
])

function navigateTo(path) {
  router.push(path)
}

function confirmCancel() {
  confirm.require({
    message: 'Are you sure you want to cancel this reservation?',
    header: 'Cancel Reservation',
    icon: 'alert-triangle',
    rejectLabel: t('cancel'),
    acceptLabel: 'Confirm',
    accept: () => {
      // Handle cancel
    },
  })
}
</script>
