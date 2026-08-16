<template>
  <div v-if="invoice" class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="invoice.invoiceNumber" :breadcrumb="breadcrumb">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="onPrint">
          <Icon name="pi pi-print" :size="14" /> {{ t('print') }} {{ t('invoices') }}
        </button>
        <button class="btn btn-outline btn-sm" @click="onEmail">
          <Icon name="pi pi-envelope" :size="14" /> {{ t('email') }} {{ t('invoices') }}
        </button>
        <button
          v-if="invoice.status !== 'paid'"
          class="btn btn-sm"
          @click="paymentDialog = true"
        >
          <Icon name="pi pi-check" :size="14" /> {{ t('record_payment') || 'Record Payment' }}
        </button>
      </template>
    </PageHeader>

    <!-- Hotel Info Header -->
    <div class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
      <div>
        <h2 class="text-lg font-semibold text-text-primary">Grand Aurora Hotel</h2>
        <p class="text-sm text-text-secondary">
          Jl. Sudirman No. 88, Jakarta Selatan 12190, Indonesia
        </p>
        <p class="text-xs text-text-muted">+62 21 5555 0199 · reservations@grandaurora.id</p>
      </div>
      <div class="text-right">
        <StatusBadge :status="invoice.status" type="payment" />
        <p class="mt-1 text-xs text-text-muted">
          {{ t('due_date') }}: <span class="tabular text-text-secondary">{{ formatDate(invoice.dueDate) }}</span>
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <!-- Guest Info -->
      <div class="card bg-base-100 shadow-sm lg:col-span-1">
        <div class="card-body">
          <div class="card-title mb-2">
            <h3 class="text-sm font-semibold text-text-primary">{{ t('guest') }}</h3>
          </div>
          <div v-if="invoice.guest" class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {{ invoice.guest.initials }}
              </div>
              <div>
                <p class="text-sm font-medium text-text-primary">{{ invoice.guest.fullName }}</p>
                <p class="text-xs text-text-muted">{{ invoice.guest.country }}</p>
              </div>
            </div>
            <dl class="space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <dt class="text-text-muted">{{ t('email') }}</dt>
                <dd class="truncate text-text-secondary">{{ invoice.guest.email }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-text-muted">{{ t('phone') }}</dt>
                <dd class="tabular text-text-secondary">{{ invoice.guest.phone }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-text-muted">{{ t('id_number') || 'ID' }}</dt>
                <dd class="tabular text-text-secondary">{{ invoice.guest.idNumber }}</dd>
              </div>
            </dl>
          </div>
          <p v-else class="text-sm text-text-muted">{{ t('no_guests') }}</p>
        </div>
      </div>

      <!-- Invoice Meta -->
      <div class="card bg-base-100 shadow-sm lg:col-span-2">
        <div class="card-body">
          <div class="card-title mb-2">
            <h3 class="text-sm font-semibold text-text-primary">{{ t('invoice_number') }}</h3>
          </div>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p class="text-xs text-text-muted">{{ t('invoice_number') }}</p>
              <p class="mt-1 text-sm font-medium text-primary">{{ invoice.invoiceNumber }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('reservation') }}</p>
              <p class="mt-1 text-sm text-text-primary">{{ reservation?.bookingId || invoice.reservationId }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('issue_date') }}</p>
              <p class="mt-1 text-sm tabular text-text-primary">{{ formatDate(invoice.issueDate) }}</p>
            </div>
            <div>
              <p class="text-xs text-text-muted">{{ t('due_date') }}</p>
              <p class="mt-1 text-sm tabular text-text-primary">{{ formatDate(invoice.dueDate) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charges Table -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="card-title mb-2">
          <h3 class="text-sm font-semibold text-text-primary">{{ t('charges') }}</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-compact w-full text-sm">
            <thead>
              <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                <th class="font-medium">{{ t('description') || 'Description' }}</th>
                <th class="font-medium text-right">{{ t('amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(charge, i) in invoice.charges" :key="i" class="hover:bg-surface-hover transition-colors">
                <td>
                  <span class="text-sm text-text-primary">{{ charge.description }}</span>
                </td>
                <td class="text-right">
                  <span class="text-sm tabular font-medium text-text-primary">{{ formatRupiah(charge.amount) }}</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">
                  <div class="flex items-center justify-end border-t border-border pt-3">
                    <div class="w-full max-w-xs space-y-1.5">
                      <div class="flex justify-between text-xs">
                        <span class="text-text-muted">{{ t('subtotal') || 'Subtotal' }}</span>
                        <span class="tabular text-text-secondary">{{ formatRupiah(subtotal) }}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <h3 class="text-sm font-semibold text-text-primary">{{ t('summary') || 'Summary' }}</h3>
          </div>
          <dl class="space-y-2.5">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('subtotal') || 'Subtotal' }}</dt>
              <dd class="text-sm tabular text-text-primary">{{ formatRupiah(subtotal) }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('taxes') }} (11%)</dt>
              <dd class="text-sm tabular text-text-primary">{{ formatRupiah(invoice.taxes) }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('service_charge') }} (10%)</dt>
              <dd class="text-sm tabular text-text-primary">{{ formatRupiah(invoice.serviceCharge) }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-text-muted">{{ t('discount') }}</dt>
              <dd class="text-sm tabular text-success">-{{ formatRupiah(invoice.discount) }}</dd>
            </div>
            <div class="border-t border-border pt-2.5" />
            <div class="flex items-center justify-between">
              <dt class="text-sm font-semibold text-text-primary">{{ t('total') }}</dt>
              <dd class="text-lg font-semibold tabular text-text-primary">{{ formatRupiah(invoice.amount) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Payment History -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title mb-2">
            <h3 class="text-sm font-semibold text-text-primary">{{ t('payment_history') }}</h3>
          </div>
          <div v-if="invoice.payments.length === 0" class="rounded-lg border border-border bg-surface-hover p-4 text-center">
            <p class="text-sm text-text-muted">{{ t('no_payments') }}</p>
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="(p, i) in invoice.payments"
              :key="i"
              class="flex items-center justify-between rounded-lg border border-border bg-surface-hover p-3"
            >
              <div>
                <p class="text-sm text-text-primary">{{ formatDate(p.date) }}</p>
                <p class="text-xs text-text-muted">{{ p.method }}</p>
              </div>
              <span
                :class="[
                  'text-sm font-medium tabular',
                  p.amount < 0 ? 'text-danger' : 'text-success'
                ]"
              >
                {{ p.amount < 0 ? '-' : '+' }}{{ formatRupiah(Math.abs(p.amount)) }}
              </span>
            </div>
            <div class="flex items-center justify-between border-t border-border pt-3">
              <span class="text-sm font-semibold text-text-primary">{{ t('paid') }}</span>
              <span class="text-sm font-semibold tabular text-success">
                {{ formatRupiah(totalPaid) }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-text-muted">{{ t('outstanding') }}</span>
              <span class="text-sm font-semibold tabular text-warning">
                {{ formatRupiah(invoice.amount - totalPaid) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Record Payment Dialog -->
    <Modal v-model:visible="paymentDialog" :header="t('record_payment') || 'Record Payment'">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm text-text-secondary">{{ t('amount') }}</label>
          <input v-model="paymentAmount" class="input input-bordered w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-sm text-text-secondary">{{ t('method') }}</label>
          <select v-model="paymentMethod" class="select select-bordered w-full">
            <option :value="null" disabled>{{ t('method') }}</option>
            <option v-for="o in methodOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-sm text-text-secondary">{{ t('date') }}</label>
          <input v-model="paymentDate" class="input input-bordered w-full" />
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="paymentDialog = false">{{ t('cancel') }}</button>
        <button class="btn btn-sm" @click="onRecordPayment">{{ t('record_payment') || 'Record' }}</button>
      </template>
    </Modal>
  </div>

  <!-- Not found -->
  <div v-else class="space-y-6">
    <PageHeader :title="t('invoices')" :breadcrumb="breadcrumb" />
    <EmptyState icon="pi pi-exclamation-circle" :title="t('not_found') || 'Not found'" :message="t('no_invoices') || 'No invoices found'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { formatRupiah, formatDate } from '~/utils/format'
import { mockInvoices } from '~/mock/invoices'
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

const invoiceId = computed(() => Number(route.params.id))

const invoice = computed(() => {
  const found = mockInvoices.find((inv) => inv.id === invoiceId.value)
  if (!found) return null
  return {
    ...found,
    guest: mockGuests.find((g) => g.id === found.guestId),
  }
})

const reservation = computed(() =>
  mockReservations.find((r) => r.id === invoice.value?.reservationId)
)

// Subtotal = sum of charges
const subtotal = computed(() =>
  invoice.value?.charges.reduce((sum: number, c: { amount: number }) => sum + c.amount, 0) || 0
)

// Total paid (sum of positive payments)
const totalPaid = computed(() =>
  invoice.value?.payments.reduce((sum: number, p: { amount: number }) => sum + Math.max(0, p.amount), 0) || 0
)

// Dialog state
const paymentDialog = ref(false)
const paymentAmount = ref('')
const paymentMethod = ref<string | null>(null)
const paymentDate = ref(new Date().toISOString().slice(0, 10))

const methodOptions = [
  { label: t('cash'), value: 'cash' },
  { label: t('credit_card'), value: 'credit_card' },
  { label: t('debit_card'), value: 'debit_card' },
  { label: t('bank_transfer'), value: 'bank_transfer' },
  { label: t('qris'), value: 'qris' },
  { label: t('online'), value: 'online' },
]

// Breadcrumb
const breadcrumb = computed(() => [
  { label: t('dashboard'), path: '/' },
  { label: t('invoices'), path: '/invoices' },
  { label: invoice.value?.invoiceNumber || '' },
])

function onPrint() {
  toast.add({ severity: 'info', summary: t('print'), detail: invoice.value?.invoiceNumber, life: 3000 })
}

function onEmail() {
  toast.add({
    severity: 'success',
    summary: t('email'),
    detail: invoice.value?.guest?.email || '',
    life: 3000,
  })
}

function onRecordPayment() {
  paymentDialog.value = false
  toast.add({
    severity: 'success',
    summary: t('record_payment') || 'Record Payment',
    detail: invoice.value?.invoiceNumber,
    life: 3000,
  })
}
</script>
