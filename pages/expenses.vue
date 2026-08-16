<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="t('expenses')">
      <template #actions>
        <button class="btn btn-primary btn-sm">
          <Icon name="pi pi-plus" :size="14" /> {{ t('add_expense') }}
        </button>
      </template>
    </PageHeader>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <KpiCard
        :label="t('monthly_expenses')"
        :value="formatRupiah(monthlyExpenses)"
        :trend="8.2"
        hint="vs last month"
      />
      <KpiCard
        :label="t('operating_cost')"
        :value="formatRupiah(operatingCost)"
        :trend="3.5"
        hint="approved expenses"
      />
      <KpiCard
        :label="t('pending_approval')"
        :value="formatRupiah(pendingApproval)"
        :hint="`${pendingCount} expenses`"
      />
    </div>

    <!-- Filters -->
    <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <label class="text-xs font-medium text-text-muted">{{ t('category') }}</label>
          <select v-model="categoryFilter" class="select select-bordered w-44 select-sm">
            <option :value="null">{{ t('all') }}</option>
            <option v-for="o in categoryOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-xs font-medium text-text-muted">{{ t('status') }}</label>
          <select v-model="statusFilter" class="select select-bordered w-40 select-sm">
            <option :value="null">{{ t('all') }}</option>
            <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>
        <button class="btn btn-ghost btn-sm" @click="resetFilters">
          <Icon name="pi pi-filter-slash" :size="14" /> {{ t('reset') }}
        </button>
      </div>
    </div>

    <!-- Expenses Table -->
    <div class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-sm">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
              <th class="font-medium">{{ t('expense_id') }}</th>
              <th class="font-medium">{{ t('category') }}</th>
              <th class="font-medium">{{ t('description') }}</th>
              <th class="font-medium text-right">{{ t('amount') }}</th>
              <th class="font-medium">{{ t('date') }}</th>
              <th class="font-medium">{{ t('submitted_by') }}</th>
              <th class="font-medium">{{ t('status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedRows"
              :key="row.expenseId"
              class="hover:bg-surface-hover transition-colors"
            >
              <td class="font-medium text-primary">{{ row.expenseId }}</td>
              <td>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    categoryClasses(row.category)
                  ]"
                >
                  {{ t(row.category) }}
                </span>
              </td>
              <td class="text-text-secondary">{{ row.description }}</td>
              <td class="text-right font-medium tabular text-text-primary">
                {{ formatRupiah(row.amount) }}
              </td>
              <td class="tabular text-text-secondary">{{ formatDate(row.date) }}</td>
              <td class="text-text-secondary">{{ row.submittedBy }}</td>
              <td>
                <StatusBadge :status="row.status" />
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
import { useI18n } from '~/composables/useI18n'
import { formatRupiah, formatDate } from '~/utils/format'
import { usePagination } from '~/composables/usePagination'
import { mockExpenses } from '~/mock/expenses'
import type { Expense, ExpenseCategory, ExpenseStatus } from '~/types'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import KpiCard from '~/components/ui/KpiCard.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()

// Category color mapping
const categoryColorMap: Record<ExpenseCategory, string> = {
  utilities: 'bg-info-bg text-info',
  payroll: 'bg-purple-100 text-purple-700',
  maintenance: 'bg-warning-bg text-warning',
  supplies: 'bg-teal-100 text-teal-700',
  food_beverage: 'bg-success-bg text-success',
  marketing: 'bg-pink-100 text-pink-700',
  ota_commission: 'bg-danger-bg text-danger',
  other: 'bg-surface-hover text-text-secondary',
}

function categoryClasses(category: ExpenseCategory): string {
  return categoryColorMap[category] || 'bg-surface-hover text-text-secondary'
}

// KPI computations
const monthlyExpenses = computed(() =>
  mockExpenses.reduce((sum, e) => sum + e.amount, 0)
)
const operatingCost = computed(() =>
  mockExpenses
    .filter((e) => e.status === 'approved')
    .reduce((sum, e) => sum + e.amount, 0)
)
const pendingApproval = computed(() =>
  mockExpenses
    .filter((e) => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)
)
const pendingCount = computed(
  () => mockExpenses.filter((e) => e.status === 'pending').length
)

// Filters
const categoryFilter = ref<ExpenseCategory | null>(null)
const statusFilter = ref<ExpenseStatus | null>(null)

const categoryOptions = [
  { label: t('utilities'), value: 'utilities' },
  { label: t('payroll'), value: 'payroll' },
  { label: t('maintenance'), value: 'maintenance' },
  { label: t('supplies'), value: 'supplies' },
  { label: t('food_beverage'), value: 'food_beverage' },
  { label: t('marketing'), value: 'marketing' },
  { label: t('ota_commission'), value: 'ota_commission' },
  { label: t('other'), value: 'other' },
]

const statusOptions = [
  { label: t('approved'), value: 'approved' },
  { label: t('pending'), value: 'pending' },
  { label: t('rejected'), value: 'rejected' },
]

const filteredExpenses = computed(() => {
  return mockExpenses.filter((e) => {
    if (categoryFilter.value && e.category !== categoryFilter.value) return false
    if (statusFilter.value && e.status !== statusFilter.value) return false
    return true
  })
})

const { page, paginatedRows, totalPages, pageRange } = usePagination(() => filteredExpenses.value, 10)

function resetFilters() {
  categoryFilter.value = null
  statusFilter.value = null
}
</script>
