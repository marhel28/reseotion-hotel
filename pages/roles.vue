<template>
  <div class="space-y-6">
    <PageHeader :title="t('roles')" />

    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span class="flex items-center gap-1.5 text-xs text-text-secondary">
            <Icon name="pi pi-check" :size="14" class="text-success" /> {{ t('permission') }} granted
          </span>
          <span class="flex items-center gap-1.5 text-xs text-text-secondary">
            <Icon name="pi pi-minus" :size="14" class="text-text-muted" /> {{ t('permission') }} denied
          </span>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full text-sm">
            <thead>
              <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                <th class="font-medium" style="min-width: 10rem">{{ t('module') }}</th>
                <th
                  v-for="role in roles"
                  :key="role"
                  class="font-medium"
                  style="min-width: 7rem"
                >
                  {{ role }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in matrix"
                :key="row.module"
                class="hover:bg-surface-hover transition-colors"
              >
                <td class="font-medium text-text-primary">{{ row.module }}</td>
                <td
                  v-for="role in roles"
                  :key="role"
                >
                  <div class="flex flex-col gap-1">
                    <span
                      v-for="perm in permissions"
                      :key="perm"
                      class="flex items-center justify-center"
                    >
                      <Icon
                        v-if="(row[role] as Record<Permission, boolean>)[perm]"
                        name="pi pi-check"
                        :size="14"
                        class="text-success"
                      />
                      <Icon
                        v-else
                        name="pi pi-minus"
                        :size="14"
                        class="text-text-muted"
                      />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Permission legend -->
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div v-for="role in roles" :key="role" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="card-title">
            <h2 class="text-sm font-semibold text-text-primary">{{ role }}</h2>
          </div>
          <div class="space-y-1.5">
            <div
              v-for="perm in permissions"
              :key="perm"
              class="flex items-center gap-2 text-xs text-text-secondary"
            >
              <Icon
                :name="roleGrantsAll(role, perm) ? 'pi pi-check' : 'pi pi-minus'"
                :size="14"
                :class="roleGrantsAll(role, perm) ? 'text-success' : 'text-text-muted'"
              />
              <span class="capitalize">{{ perm }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import PageHeader from '~/components/ui/PageHeader.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()

const roles = [
  'Super Admin',
  'General Manager',
  'Front Desk',
  'Housekeeping',
  'Finance',
  'Staff',
]

const permissions = ['view', 'create', 'edit', 'delete'] as const
type Permission = (typeof permissions)[number]

interface ModuleRow {
  module: string
  [role: string]: string | Record<Permission, boolean>
}

const matrix = computed<ModuleRow[]>(() => {
  const grants: Record<string, Record<string, Record<Permission, boolean>>> = {
    Reservations: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: true, create: true, edit: true, delete: false },
      Housekeeping: { view: true, create: false, edit: false, delete: false },
      Finance: { view: true, create: false, edit: false, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
    Guests: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: true, create: true, edit: true, delete: false },
      Housekeeping: { view: true, create: false, edit: false, delete: false },
      Finance: { view: true, create: false, edit: false, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
    Rooms: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: true, create: false, edit: true, delete: false },
      Housekeeping: { view: true, create: false, edit: true, delete: false },
      Finance: { view: true, create: false, edit: false, delete: false },
      Staff: { view: true, create: false, edit: false, delete: false },
    },
    Payments: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: true, create: true, edit: false, delete: false },
      Housekeeping: { view: false, create: false, edit: false, delete: false },
      Finance: { view: true, create: true, edit: true, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
    Reports: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: true, create: false, edit: false, delete: false },
      Housekeeping: { view: false, create: false, edit: false, delete: false },
      Finance: { view: true, create: true, edit: false, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
    Staff: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: true, edit: true, delete: true },
      'Front Desk': { view: false, create: false, edit: false, delete: false },
      Housekeeping: { view: true, create: false, edit: false, delete: false },
      Finance: { view: false, create: false, edit: false, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
    Settings: {
      'Super Admin': { view: true, create: true, edit: true, delete: true },
      'General Manager': { view: true, create: false, edit: true, delete: false },
      'Front Desk': { view: false, create: false, edit: false, delete: false },
      Housekeeping: { view: false, create: false, edit: false, delete: false },
      Finance: { view: false, create: false, edit: false, delete: false },
      Staff: { view: false, create: false, edit: false, delete: false },
    },
  }

  return Object.entries(grants).map(([module, roleMap]) => ({
    module,
    ...roleMap,
  }))
})

function roleGrantsAll(role: string, perm: Permission): boolean {
  return matrix.value.every((row) => (row[role] as Record<Permission, boolean>)[perm])
}
</script>
