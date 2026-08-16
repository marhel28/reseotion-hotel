<template>
  <div class="space-y-6">
    <PageHeader :title="t('audit_logs')" />

    <div class="flex flex-wrap items-center gap-3">
      <select v-model="filterModule" class="select select-bordered w-48">
        <option
          v-for="o in moduleOptions"
          :key="o.value"
          :value="o.value"
        >
          {{ o.label }}
        </option>
      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra table-compact w-full text-sm">
        <thead>
          <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
            <th class="font-medium" style="min-width: 10rem">{{ t('time') }}</th>
            <th class="font-medium">{{ t('user') }}</th>
            <th class="font-medium">{{ t('action') }}</th>
            <th class="font-medium">{{ t('module') }}</th>
            <th class="font-medium" style="min-width: 18rem">{{ t('description') }}</th>
            <th class="font-medium" style="min-width: 8rem">{{ t('ip') }}</th>
            <th class="font-medium">{{ t('status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filtered"
            :key="row.id"
            class="hover:bg-surface-hover transition-colors"
          >
            <td class="tabular text-text-secondary">{{ formatDateTime(row.time) }}</td>
            <td>{{ row.user }}</td>
            <td>
              <span :class="['badge', actionClass(row.action)]">
                {{ row.action }}
              </span>
            </td>
            <td>{{ row.module }}</td>
            <td>{{ row.description }}</td>
            <td class="tabular text-text-muted">{{ row.ip }}</td>
            <td>
              <StatusBadge :status="row.status === 'Success' ? 'paid' : 'failed'" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EmptyState
      v-if="filtered.length === 0"
      icon="pi pi-shield"
      :title="t('no_data')"
      message=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { formatDateTime } from '~/utils/format'
import { auditLogs as mockLogs } from '~/mock/auditLogs'
import type { AuditLog } from '~/types'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

const { t } = useI18n()

const all = ref<AuditLog[]>(mockLogs)
const filterModule = ref<string | 'all'>('all')

const moduleOptions = computed(() => {
  const modules = Array.from(new Set(all.value.map((l) => l.module)))
  return [
    { label: t('all'), value: 'all' },
    ...modules.map((m) => ({ label: m, value: m })),
  ]
})

const filtered = computed(() =>
  filterModule.value === 'all'
    ? all.value
    : all.value.filter((l) => l.module === filterModule.value)
)

function actionClass(action: string): string {
  const map: Record<string, string> = {
    Created: 'badge-success',
    Updated: 'badge-info',
    Deleted: 'badge-error',
    Viewed: 'badge-ghost',
    Exported: 'badge-warning',
    'Logged in': 'badge-ghost',
  }
  return map[action] ?? 'badge-ghost'
}
</script>
