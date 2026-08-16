<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="t('payments')" :breadcrumb="breadcrumb">
      <template #actions>
        <button class="btn btn-outline" @click="onExport">
          <Icon name="pi pi-download" :size="14" /> {{ t('export') }}
        </button>
      </template>
    </PageHeader>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <KpiCard :label="t('todays_collection')" :value="formatRupiah(kpis.todaysCollection)" />
      <KpiCard :label="t('pending')" :value="formatRupiah(kpis.pending)" />
      <KpiCard :label="t('refunded')" :value="formatRupiah(kpis.refunded)" />
      <KpiCard :label="t('failed')" :value="String(kpis.failed)" />
      <KpiCard :label="t('outstanding')" :value="formatRupiah(kpis.outstanding)" />
    </div>

    <!-- Filters + Search -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="join">
        <span class="join-item bg-base-200 px-3 flex items-center">
          <Icon name="pi pi-search" :size="14" class="text-text-muted" />
        </span>
        <input
          v-model="searchQuery"
          :placeholder="t('search') + ' guest or payment ID'"
          class="join-item input input-bordered w-64"
        />
      </div>
      <select v-model="statusFilter" class="select select-bordered w-48">
        <option :value="null">{{ t('status') }}</option>
        <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <!-- Empty state -->
    <EmptyState
      v-if="filteredPayments.length === 0"
      icon="pi pi-credit-card"
      :title="t('no_payments')"
      :message="t('no_data')"
    />

    <!-- Data Table -->
    <div v-else class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-sm">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
              <th class="font-medium">{{ t('payment_id') }}</th>
              <th class="font-medium">{{ t('guest') }}</th>
              <th class="font-medium">{{ t('reservation') }}</th>
              <th class="font-medium">{{ t('amount') }}</th>
              <th class="font-medium">{{ t('method') }}</th>
              <th class="font-medium">{{ t('date') }}</th>
              <th class="font-medium">{{ t('status') }}</th>
              <th class="font-medium">{{ t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedRows"
              :key="row.id"
              class="hover:bg-surface-hover transition-colors"
            >
              <td class="font-medium text-primary">{{ row.paymentId }}</td>
              <td class="text-text-primary">{{ row.guest?.fullName || row.guestId }}</td>
              <td class="text-text-secondary">{{ getReservationId(row.reservationId) }}</td>
              <td class="tabular font-medium text-text-primary">{{ formatRupiah(row.amount) }}</td>
              <td class="text-text-secondary">{{ methodLabel(row.method) }}</td>
              <td class="tabular text-text-secondary">{{ formatDate(row.date) }}</td>
              <td>
                <StatusBadge :status="row.status" type="payment" />
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-ghost btn-sm" @click="navigateTo(`/payments/${row.id}`)">
                    <Icon name="pi pi-eye" :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="join flex justify-end border-t border-border px-4 py-2">
        <button class="join-item btn btn-sm" :disabled="page<=0" @click="page--">&lt;</button>
        <button v-for="p in pageRange" :key="p" class="join-item btn btn-sm" :class="p===page+1 && 'btn-active'" @click="page=p-1">{{ p }}</button>
        <button class="join-item btn btn-sm" :disabled="page>=totalPages-1" @click="page++">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { formatRupiah, formatDate } from '~/utils/format'
import { usePagination } from '~/composables/usePagination'
import { mockPayments } from '~/mock/payments'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import KpiCard from '~/components/ui/KpiCard.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const router = useRouter()
const toast = useToast()

// Enrich payments with guest data
const payments = computed(() =>
  mockPayments.map((p) => ({
    ...p,
    guest: mockGuests.find((g) => g.id === p.guestId),
  }))
)

// Today's date (matches mock data date for "today")
const today = '2026-08-16'

// KPI calculations
const kpis = computed(() => {
  const todaysCollection = payments.value
    .filter((p) => p.status === 'completed' && p.date === today)
    .reduce((sum, p) => sum + p.amount, 0)

  const pending = payments.value
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const refunded = payments.value
    .filter((p) => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0)

  const failed = payments.value.filter((p) => p.status === 'failed').length

  const outstanding = payments.value
    .filter((p) => p.status === 'pending' || p.status === 'failed')
    .reduce((sum, p) => sum + p.amount, 0)

  return { todaysCollection, pending, refunded, failed, outstanding }
})

// Status filter options
const statusOptions = [
  { label: t('completed') || 'Completed', value: 'completed' },
  { label: t('pending'), value: 'pending' },
  { label: t('refunded'), value: 'refunded' },
  { label: t('failed'), value: 'failed' },
]

const statusFilter = ref<string | null>(null)
const searchQuery = ref('')

// Filtered payments
const filteredPayments = computed(() => {
  let list = payments.value

  if (statusFilter.value) {
    list = list.filter((p) => p.status === statusFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      (p) =>
        p.paymentId.toLowerCase().includes(q) ||
        (p.guest?.fullName || '').toLowerCase().includes(q)
    )
  }

  return list
})

const { page, paginatedRows, totalPages, pageRange } = usePagination(() => filteredPayments.value, 10)

// Resolve reservation ID (bookingId) from reservationId
function getReservationId(reservationId: number): string {
  const reservation = mockReservations.find((r) => r.id === reservationId)
  return reservation?.bookingId || String(reservationId)
}

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
const breadcrumb = [
  { label: t('dashboard'), path: '/' },
  { label: t('payments') },
]

function navigateTo(path: string) {
  router.push(path)
}

function onExport() {
  toast.add({ severity: 'success', summary: t('export'), detail: t('payments'), life: 3000 })
}
</script>
