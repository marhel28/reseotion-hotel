<template>
  <div class="space-y-6">
    <PageHeader :title="t('notifications')">
      <template #actions>
        <button
          class="btn btn-outline btn-sm"
          :disabled="unreadCount === 0"
          @click="markAllRead"
        >
          <Icon name="pi pi-check-circle" :size="14" /> {{ t('mark_all_read') }}
        </button>
      </template>
    </PageHeader>

    <!-- Type filter -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tp in typeOptions"
        :key="tp.value"
        :class="[
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
          filterType === tp.value
            ? 'bg-primary text-white'
            : 'bg-surface-hover text-text-secondary hover:bg-border',
        ]"
        @click="filterType = tp.value"
      >
        <Icon :name="tp.icon" :size="12" />
        {{ tp.label }}
      </button>
    </div>

    <!-- Notification list grouped by type -->
    <div class="space-y-4">
      <div v-for="group in grouped" :key="group.type" class="space-y-2">
        <h2 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
          <Icon :name="typeIcon(group.type)" :size="14" />
          {{ t(group.type) }}
          <span class="rounded-full bg-surface-hover px-2 py-0.5 text-[10px] normal-case text-text-secondary">
            {{ group.items.length }}
          </span>
        </h2>
        <div class="space-y-1.5">
          <div
            v-for="n in group.items"
            :key="n.id"
            :class="[
              'cursor-pointer rounded-lg border border-border p-3 transition-colors',
              !n.read ? 'bg-primary/5 font-semibold' : 'bg-surface hover:bg-surface-hover'
            ]"
            @click="markRead(n.id)"
          >
            <div class="flex items-start gap-3">
              <div
                :class="[
                  'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                  typeBg(n.type),
                ]"
              >
                <Icon :name="typeIcon(n.type)" :size="14" :class="typeIconColor(n.type)" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 :class="['truncate text-sm', !n.read ? 'font-semibold text-text-primary' : 'font-medium text-text-secondary']">
                    {{ n.title }}
                  </h3>
                  <span class="flex-shrink-0 text-[10px] text-text-muted">
                    {{ timeAgo(n.createdAt) }}
                  </span>
                </div>
                <p :class="['mt-0.5 text-xs', !n.read ? 'text-text-secondary' : 'text-text-muted']">
                  {{ n.message }}
                </p>
              </div>
              <span
                v-if="!n.read"
                class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <EmptyState
      v-if="filtered.length === 0"
      icon="pi pi-bell"
      :title="t('no_data')"
      message=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { notifications as mockNotifications } from '~/mock/notifications'
import type { Notification, NotificationType } from '~/mock/notifications'
import PageHeader from '~/components/ui/PageHeader.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const toast = useToast()

const all = ref<Notification[]>(mockNotifications.map((n) => ({ ...n })))
const filterType = ref<NotificationType | 'all'>('all')

interface TypeOption {
  value: NotificationType | 'all'
  label: string
  icon: string
}

const typeOptions = computed<TypeOption[]>(() => [
  { value: 'all', label: t('all_types'), icon: 'pi-bars' },
  { value: 'reservation', label: t('reservations'), icon: 'pi-calendar' },
  { value: 'payment', label: t('payments'), icon: 'pi-credit-card' },
  { value: 'housekeeping', label: t('housekeeping'), icon: 'pi-home' },
  { value: 'maintenance', label: t('maintenance'), icon: 'pi-wrench' },
  { value: 'system', label: t('system'), icon: 'pi-cog' },
])

const filtered = computed(() =>
  filterType.value === 'all'
    ? all.value
    : all.value.filter((n) => n.type === filterType.value)
)

const grouped = computed(() => {
  const map = new Map<NotificationType, Notification[]>()
  for (const n of filtered.value) {
    if (!map.has(n.type)) map.set(n.type, [])
    map.get(n.type)!.push(n)
  }
  return Array.from(map.entries()).map(([type, items]) => ({ type, items }))
})

const unreadCount = computed(() => all.value.filter((n) => !n.read).length)

function typeIcon(type: NotificationType): string {
  const map: Record<NotificationType, string> = {
    reservation: 'pi-calendar',
    payment: 'pi-credit-card',
    housekeeping: 'pi-home',
    maintenance: 'pi-wrench',
    system: 'pi-cog',
  }
  return map[type]
}

function typeBg(type: NotificationType): string {
  const map: Record<NotificationType, string> = {
    reservation: 'bg-info-bg',
    payment: 'bg-success-bg',
    housekeeping: 'bg-warning-bg',
    maintenance: 'bg-danger-bg',
    system: 'bg-surface-hover',
  }
  return map[type]
}

function typeIconColor(type: NotificationType): string {
  const map: Record<NotificationType, string> = {
    reservation: 'text-info',
    payment: 'text-success',
    housekeeping: 'text-warning',
    maintenance: 'text-danger',
    system: 'text-text-muted',
  }
  return map[type]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function markRead(id: number) {
  const n = all.value.find((x) => x.id === id)
  if (n && !n.read) {
    n.read = true
    toast.add({
      severity: 'info',
      summary: t('notifications'),
      detail: t('notifications_marked'),
      life: 2000,
    })
  }
}

function markAllRead() {
  all.value.forEach((n) => (n.read = true))
  toast.add({
    severity: 'success',
    summary: t('notifications'),
    detail: t('all_marked'),
    life: 3000,
  })
}
</script>
