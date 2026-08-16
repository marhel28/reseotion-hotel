<template>
  <div class="space-y-6">
    <PageHeader :title="t('staff')">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showAdd = true">
          <Icon name="pi pi-plus" :size="14" /> {{ t('add_staff') }}
        </button>
      </template>
    </PageHeader>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <select v-model="filterDept" class="select select-bordered w-48">
        <option v-for="o in deptOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <select v-model="filterStatus" class="select select-bordered w-44">
        <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra table-compact w-full text-sm">
        <thead>
          <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
            <th class="font-medium" style="min-width: 14rem">{{ t('staff') }}</th>
            <th class="font-medium">{{ t('role') }}</th>
            <th class="font-medium" style="min-width: 9rem">{{ t('department') }}</th>
            <th class="font-medium">{{ t('shift') }}</th>
            <th class="font-medium">{{ t('status') }}</th>
            <th class="font-medium">{{ t('last_active') }}</th>
            <th class="font-medium" style="width: 6rem">{{ t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filtered"
            :key="row.id"
            class="hover:bg-surface-hover transition-colors"
          >
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                    {{ row.initials }}
                  </div>
                </div>
                <span class="font-medium text-text-primary">{{ row.name }}</span>
              </div>
            </td>
            <td>{{ row.role }}</td>
            <td>
              <span class="badge badge-ghost px-2 py-0.5 text-[10px] font-medium">
                {{ t(row.department) }}
              </span>
            </td>
            <td class="text-text-secondary">{{ t(row.shift) }}</td>
            <td>
              <StatusBadge :status="row.status" type="generic" />
            </td>
            <td>{{ row.lastActive }}</td>
            <td>
              <div class="flex items-center gap-1">
                <button class="btn btn-ghost btn-sm btn-circle" @click="viewStaff(row.id)">
                  <Icon name="pi pi-eye" :size="14" />
                </button>
                <button class="btn btn-ghost btn-sm btn-circle" @click="editStaff(row.id)">
                  <Icon name="pi pi-pencil" :size="14" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EmptyState
      v-if="filtered.length === 0"
      icon="pi pi-users"
      :title="t('no_data')"
      message=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { staff as mockStaff } from '~/mock/staff'
import type { Staff, Department, StaffStatus } from '~/mock/staff'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const router = useRouter()

const allStaff = ref<Staff[]>(mockStaff)
const filterDept = ref<Department | 'all'>('all')
const filterStatus = ref<StaffStatus | 'all'>('all')
const showAdd = ref(false)

const deptOptions = computed(() => [
  { label: t('all'), value: 'all' },
  { label: t('front_office'), value: 'front_office' },
  { label: t('housekeeping'), value: 'housekeeping' },
  { label: t('finance'), value: 'finance' },
  { label: t('management'), value: 'management' },
  { label: t('maintenance'), value: 'maintenance' },
  { label: t('food_beverage'), value: 'food_beverage' },
])

const statusOptions = computed(() => [
  { label: t('all'), value: 'all' },
  { label: t('active'), value: 'active' },
  { label: t('inactive'), value: 'inactive' },
  { label: t('on_leave'), value: 'on_leave' },
])

const filtered = computed(() => {
  return allStaff.value.filter((s) => {
    const matchDept = filterDept.value === 'all' || s.department === filterDept.value
    const matchStatus = filterStatus.value === 'all' || s.status === filterStatus.value
    return matchDept && matchStatus
  })
})

function viewStaff(id: number) {
  router.push(`/staff/${id}`)
}

function editStaff(id: number) {
  router.push(`/staff/${id}`)
}
</script>
