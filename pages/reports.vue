<template>
  <div class="space-y-6">
    <PageHeader :title="t('reports')" />

    <div v-for="cat in categories" :key="cat.key" class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-text-muted">
        {{ t(cat.key) }}
      </h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="report in cat.reports" :key="report.id" class="card bg-base-100 shadow-sm">
          <div class="card-body space-y-3">
            <div>
              <h3 class="text-sm font-semibold text-text-primary">{{ report.title }}</h3>
              <p class="mt-1 text-xs text-text-muted">{{ report.description }}</p>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-text-secondary">
                {{ t('last_generated') }}: {{ report.lastGenerated }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
              <span
                v-for="fmt in report.format"
                :key="fmt"
                class="badge badge-ghost px-2 py-0.5 text-[10px] font-medium uppercase"
              >
                {{ t(fmt) }}
              </span>
            </div>
            <button
              class="btn btn-primary btn-sm w-full"
              @click="generateReport(report)"
            >
              <Icon name="pi pi-file-export" :size="14" /> {{ t('generate_report') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <EmptyState
      v-if="reports.length === 0"
      icon="pi pi-chart-bar"
      :title="t('no_data')"
      message=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { reports as mockReports } from '~/mock/reports'
import type { Report, ReportCategory } from '~/mock/reports'
import PageHeader from '~/components/ui/PageHeader.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const toast = useToast()

const reports = computed(() => mockReports)

interface CategoryGroup {
  key: ReportCategory
  reports: Report[]
}

const categories = computed<CategoryGroup[]>(() => {
  const order: ReportCategory[] = ['operations', 'finance', 'guests', 'housekeeping']
  return order.map((key) => ({
    key,
    reports: reports.value.filter((r) => r.category === key),
  }))
})

function generateReport(report: Report) {
  toast.add({
    severity: 'success',
    summary: t('reports'),
    detail: t('report_generated'),
    life: 3000,
  })
  console.log('Generating report:', report.title)
}
</script>
