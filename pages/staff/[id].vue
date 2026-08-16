<template>
  <div class="space-y-6">
    <PageHeader
      :title="t('staff_profile')"
      :breadcrumb="[
        { label: t('staff'), path: '/staff' },
        { label: staff?.name || '' },
      ]"
    >
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="router.push('/staff')">
          <Icon name="arrow-left" :size="14" /> {{ t('back') }}
        </button>
      </template>
    </PageHeader>

    <div v-if="staff" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Profile Card -->
      <div class="card bg-base-100 shadow-sm lg:col-span-1">
        <div class="card-body">
          <div class="flex flex-col items-center space-y-4 pt-4">
            <div class="avatar">
              <div class="w-20 h-20 rounded-full bg-primary text-2xl font-semibold text-white flex items-center justify-center">
                {{ staff.initials }}
              </div>
            </div>
            <div class="text-center">
              <h2 class="text-lg font-semibold text-text-primary">{{ staff.name }}</h2>
              <p class="text-sm text-text-secondary">{{ staff.role }}</p>
              <div class="mt-2 flex items-center justify-center gap-2">
                <span class="badge badge-ghost">{{ t(staff.department) }}</span>
                <StatusBadge :status="staff.status" type="generic" />
              </div>
            </div>
            <div class="w-full space-y-2 border-t border-border pt-4 text-sm">
              <div class="flex items-center gap-2 text-text-secondary">
                <Icon name="mail" class="text-text-muted" :size="14" />
                <span>{{ staff.email }}</span>
              </div>
              <div class="flex items-center gap-2 text-text-secondary">
                <Icon name="phone" class="text-text-muted" :size="14" />
                <span>{{ staff.phone }}</span>
              </div>
              <div class="flex items-center gap-2 text-text-secondary">
                <Icon name="clock" class="text-text-muted" :size="14" />
                <span>{{ t('shift') }}: {{ t(staff.shift) }}</span>
              </div>
              <div class="flex items-center gap-2 text-text-secondary">
                <Icon name="history" class="text-text-muted" :size="14" />
                <span>{{ t('last_active') }}: {{ staff.lastActive }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div class="card bg-base-100 shadow-sm lg:col-span-2">
        <div class="card-body">
          <div class="card-title mb-4">
            <h3 class="text-sm font-semibold text-text-primary">{{ t('edit_staff') }}</h3>
          </div>
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @submit.prevent="save">
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('full_name') }}</label>
              <input v-model="form.name" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('email') }}</label>
              <input v-model="form.email" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('role') }}</label>
              <input v-model="form.role" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('phone') }}</label>
              <input v-model="form.phone" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('department') }}</label>
              <select v-model="form.department" class="select select-bordered w-full">
                <option v-for="o in deptOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('shift') }}</label>
              <select v-model="form.shift" class="select select-bordered w-full">
                <option v-for="o in shiftOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('status') }}</label>
              <select v-model="form.status" class="select select-bordered w-full">
                <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="flex items-end sm:col-span-2">
              <button type="submit" class="btn btn-primary w-full sm:w-auto">
                <Icon name="check" :size="14" /> {{ t('save') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      icon="user"
      :title="t('no_data')"
      message=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { staff as mockStaff } from '~/mock/staff'
import type { Department, Staff, StaffShift, StaffStatus } from '~/mock/staff'
import PageHeader from '~/components/ui/PageHeader.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const id = computed(() => Number(router.currentRoute.value.params.id))

const staff = computed(() => mockStaff.find((s) => s.id === id.value))

interface DeptOpt { label: string; value: Department }
interface ShiftOpt { label: string; value: StaffShift }
interface StatusOpt { label: string; value: StaffStatus }

const deptOptions = computed<DeptOpt[]>(() => [
  { label: t('front_office'), value: 'front_office' },
  { label: t('housekeeping'), value: 'housekeeping' },
  { label: t('finance'), value: 'finance' },
  { label: t('management'), value: 'management' },
  { label: t('maintenance'), value: 'maintenance' },
  { label: t('food_beverage'), value: 'food_beverage' },
])

const shiftOptions = computed<ShiftOpt[]>(() => [
  { label: t('morning'), value: 'morning' },
  { label: t('afternoon'), value: 'afternoon' },
  { label: t('night'), value: 'night' },
])

const statusOptions = computed<StatusOpt[]>(() => [
  { label: t('active'), value: 'active' },
  { label: t('inactive'), value: 'inactive' },
  { label: t('on_leave'), value: 'on_leave' },
])

const form = reactive({
  name: staff.value?.name ?? '',
  email: staff.value?.email ?? '',
  role: staff.value?.role ?? '',
  phone: staff.value?.phone ?? '',
  department: (staff.value?.department ?? 'front_office') as Department,
  shift: (staff.value?.shift ?? 'morning') as StaffShift,
  status: (staff.value?.status ?? 'active') as StaffStatus,
})

function save() {
  toast.add({
    severity: 'success',
    summary: t('staff'),
    detail: t('settings_saved'),
    life: 3000,
  })
  console.log('Saving staff', id.value, form)
}
</script>
