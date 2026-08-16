<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="t('invoices')" :breadcrumb="breadcrumb">
      <template #actions>
        <button class="btn btn-outline" @click="onExport">
          <Icon name="pi pi-download" :size="14" /> {{ t('export') }}
        </button>
      </template>
    </PageHeader>

    <!-- Filters + Search -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="join">
        <span class="join-item bg-base-200 px-3 flex items-center">
          <Icon name="pi pi-search" :size="14" class="text-text-muted" />
        </span>
        <input
          v-model="searchQuery"
          :placeholder="t('search') + ' guest or invoice number'"
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
      v-if="filteredInvoices.length === 0"
      icon="pi pi-file-invoice"
      :title="t('no_invoices') || 'No invoices found'"
      :message="t('no_data')"
    />

    <!-- Data Table -->
    <div v-else class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-sm">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
              <th class="font-medium">{{ t('invoice_number') }}</th>
              <th class="font-medium">{{ t('guest') }}</th>
              <th class="font-medium">{{ t('reservation') }}</th>
              <th class="font-medium">{{ t('amount') }}</th>
              <th class="font-medium">{{ t('issue_date') }}</th>
              <th class="font-medium">{{ t('due_date') }}</th>
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
              <td class="font-medium text-primary">{{ row.invoiceNumber }}</td>
              <td class="text-text-primary">{{ row.guest?.fullName || row.guestId }}</td>
              <td class="text-text-secondary">{{ getReservationId(row.reservationId) }}</td>
              <td class="tabular font-medium text-text-primary">{{ formatRupiah(row.amount) }}</td>
              <td class="tabular text-text-secondary">{{ formatDate(row.issueDate) }}</td>
              <td class="tabular text-text-secondary">{{ formatDate(row.dueDate) }}</td>
              <td>
                <StatusBadge :status="row.status" type="payment" />
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-ghost btn-sm" @click="navigateTo(`/invoices/${row.id}`)">
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
import { mockInvoices } from '~/mock/invoices'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const router = useRouter()
const toast = useToast()

// Enrich invoices with guest data
const invoices = computed(() =>
  mockInvoices.map((inv) => ({
    ...inv,
    guest: mockGuests.find((g) => g.id === inv.guestId),
  }))
)

// Status filter options
const statusOptions = [
  { label: t('paid'), value: 'paid' },
  { label: t('pending'), value: 'pending' },
  { label: t('overdue'), value: 'overdue' },
  { label: t('refunded'), value: 'refunded' },
]

const statusFilter = ref<string | null>(null)
const searchQuery = ref('')

// Filtered invoices
const filteredInvoices = computed(() => {
  let list = invoices.value

  if (statusFilter.value) {
    list = list.filter((inv) => inv.status === statusFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      (inv) =>
        inv.invoiceNumber.toLowerCase().includes(q) ||
        (inv.guest?.fullName || '').toLowerCase().includes(q)
    )
  }

  return list
})

const { page, paginatedRows, totalPages, pageRange } = usePagination(() => filteredInvoices.value, 10)

// Resolve reservation bookingId from reservationId
function getReservationId(reservationId: number): string {
  const reservation = mockReservations.find((r) => r.id === reservationId)
  return reservation?.bookingId || String(reservationId)
}

// Breadcrumb
const breadcrumb = [
  { label: t('dashboard'), path: '/' },
  { label: t('invoices') },
]

function navigateTo(path: string) {
  router.push(path)
}

function onExport() {
  toast.add({ severity: 'success', summary: t('export'), detail: t('invoices'), life: 3000 })
}
</script>
