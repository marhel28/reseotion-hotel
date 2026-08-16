<template>
  <div v-if="payment" class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="payment.paymentId" :breadcrumb="breadcrumb">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="onPrint">
          <Icon name="pi pi-print" :size="14" /> {{ (t('print') + ' ' + t('receipt')) || 'Print Receipt' }}
        </button>
        <button
          v-if="payment.status === 'completed'"
          class="btn btn-outline btn-error btn-sm"
          @click="refundDialog = true"
        >
          <Icon name="pi pi-undo" :size="14" /> {{ t('refund') }}
        </button>
      </template>
    </PageHeader>

    <!-- Status Banner -->
    <div class="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
      <StatusBadge :status="payment.status" type="payment" />
      <span class="text-sm text-text-secondary">
        {{ payment.description }}
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <!-- Payment Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <h2 class="text-sm font-semibold text-text-primary">{{ t('payment_info') || 'Payment Info' }}</h2>
          </div>
          <dl class="space-y-3">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('payment_id') }}</dt>
              <dd class="text-sm font-medium text-text-primary">{{ payment.paymentId }}</dd>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('date') }}</dt>
              <dd class="text-sm tabular text-text-primary">{{ formatDate(payment.date) }}</dd>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('method') }}</dt>
              <dd class="text-sm text-text-primary">{{ methodLabel(payment.method) }}</dd>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('status') }}</dt>
              <dd><StatusBadge :status="payment.status" type="payment" /></dd>
            </div>
            <div class="border-t border-border" />
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('amount') }}</dt>
              <dd class="text-lg font-semibold tabular text-text-primary">{{ formatRupiah(payment.amount) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Guest Info -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <h2 class="text-sm font-semibold text-text-primary">{{ t('guest_info') || 'Guest Info' }}</h2>
          </div>
          <div v-if="payment.guest" class="flex items-start gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {{ payment.guest.initials }}
            </div>
            <div class="flex-1 space-y-2">
              <p class="text-sm font-medium text-text-primary">{{ payment.guest.fullName }}</p>
              <dl class="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                <div class="flex items-center gap-2">
                  <dt class="text-xs text-text-muted">{{ t('email') }}</dt>
                  <dd class="text-xs text-text-secondary truncate">{{ payment.guest.email }}</dd>
                </div>
                <div class="flex items-center gap-2">
                  <dt class="text-xs text-text-muted">{{ t('phone') }}</dt>
                  <dd class="text-xs tabular text-text-secondary">{{ payment.guest.phone }}</dd>
                </div>
                <div class="flex items-center gap-2">
                  <dt class="text-xs text-text-muted">{{ t('country') || 'Country' }}</dt>
                  <dd class="text-xs text-text-secondary">{{ payment.guest.country }}</dd>
                </div>
                <div class="flex items-center gap-2">
                  <dt class="text-xs text-text-muted">{{ t('id_number') || 'ID' }}</dt>
                  <dd class="text-xs tabular text-text-secondary">{{ payment.guest.idNumber }}</dd>
                </div>
              </dl>
            </div>
          </div>
          <p v-else class="text-sm text-text-muted">{{ t('no_guests') }}</p>
        </div>
      </div>
    </div>

    <!-- Reservation Info -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="card-title mb-2">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('reservation_info') || 'Reservation Info' }}</h2>
        </div>
        <div v-if="reservation" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p class="text-xs text-text-muted">{{ t('reservation_id') || 'Reservation ID' }}</p>
            <p class="mt-1 text-sm font-medium text-primary">{{ reservation.bookingId }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted">{{ t('room_type') }}</p>
            <p class="mt-1 text-sm text-text-primary">{{ reservation.roomType }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted">{{ t('check_in') }}</p>
            <p class="mt-1 text-sm tabular text-text-primary">{{ formatDate(reservation.checkIn) }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted">{{ t('check_out') }}</p>
            <p class="mt-1 text-sm tabular text-text-primary">{{ formatDate(reservation.checkOut) }}</p>
          </div>
        </div>
        <div v-else class="flex items-center justify-between rounded-lg border border-border bg-surface-hover p-4">
          <div>
            <p class="text-sm text-text-muted">{{ t('reservation') }} #{{ payment.reservationId }}</p>
            <p class="text-xs text-text-muted">{{ payment.description }}</p>
          </div>
          <span class="text-sm font-medium tabular text-text-primary">{{ formatRupiah(payment.amount) }}</span>
        </div>
      </div>
    </div>

    <!-- Line Items / Description -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="card-title mb-2">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('line_items') || 'Line Items' }}</h2>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between rounded-lg border border-border bg-surface-hover p-3">
            <div>
              <p class="text-sm text-text-primary">{{ payment.description }}</p>
              <p class="text-xs text-text-muted">{{ payment.paymentId }} · {{ methodLabel(payment.method) }}</p>
            </div>
            <span class="text-sm font-medium tabular text-text-primary">{{ formatRupiah(payment.amount) }}</span>
          </div>
          <div class="flex items-center justify-between border-t border-border pt-3">
            <span class="text-sm font-semibold text-text-primary">{{ t('total') }}</span>
            <span class="text-lg font-semibold tabular text-text-primary">{{ formatRupiah(payment.amount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Refund Dialog -->
    <Modal v-model:visible="refundDialog" :header="t('refund')">
      <div class="space-y-4">
        <p class="text-sm text-text-secondary">
          {{ t('refund_confirm') || 'Process a refund for' }} <span class="font-medium text-text-primary">{{ payment.paymentId }}</span>?
        </p>
        <div class="rounded-lg border border-border bg-surface-hover p-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-text-muted">{{ t('amount') }}</span>
            <span class="text-sm font-semibold tabular text-text-primary">{{ formatRupiah(payment.amount) }}</span>
          </div>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-sm text-text-muted">{{ t('guest') }}</span>
            <span class="text-sm text-text-primary">{{ payment.guest?.fullName || payment.guestId }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="refundDialog = false">{{ t('cancel') }}</button>
        <button class="btn btn-error btn-sm" @click="onRefund">{{ t('refund') }}</button>
      </template>
    </Modal>
  </div>

  <!-- Not found -->
  <div v-else class="space-y-6">
    <PageHeader :title="t('payments')" :breadcrumb="breadcrumb" />
    <EmptyState icon="pi pi-exclamation-circle" :title="t('not_found') || 'Not found'" :message="t('no_payments')" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { formatRupiah, formatDate } from '~/utils/format'
import { mockPayments } from '~/mock/payments'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'
import Modal from '~/components/ui/Modal.vue'

const { t } = useI18n()
const route = useRoute()
const toast = useToast()

const paymentId = computed(() => Number(route.params.id))

const payment = computed(() => {
  const found = mockPayments.find((p) => p.id === paymentId.value)
  if (!found) return null
  return {
    ...found,
    guest: mockGuests.find((g) => g.id === found.guestId),
  }
})

const reservation = computed(() =>
  mockReservations.find((r) => r.id === payment.value?.reservationId)
)

const refundDialog = ref(false)

// Format payment method → label
function methodLabel(method: string): string {
  const map: Record<string, string> = {
    cash: t('cash'),
    credit_card: t('credit_card'),
    debit_card: t('debit_card'),
    bank_transfer: t('bank_transfer'),
    qris: t('qris'),
    online: t('online'),
  }
  return map[method] || method
}

// Breadcrumb
const breadcrumb = computed(() => [
  { label: t('dashboard'), path: '/' },
  { label: t('payments'), path: '/payments' },
  { label: payment.value?.paymentId || '' },
])

function onPrint() {
  toast.add({ severity: 'info', summary: t('print'), detail: payment.value?.paymentId, life: 3000 })
}

function onRefund() {
  refundDialog.value = false
  toast.add({
    severity: 'success',
    summary: t('refund'),
    detail: `${payment.value?.paymentId} → ${t('refunded')}`,
    life: 3000,
  })
}
</script>
