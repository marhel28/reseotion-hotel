<template>
  <aside
    :class="[
      'flex flex-col border-r border-border bg-surface transition-all duration-200',
      'fixed inset-y-0 left-0 z-40 lg:relative',
      uiStore.sidebarCollapsed ? 'w-16' : 'w-60',
      uiStore.mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo & Active Role Badge -->
    <div class="flex h-16 items-center gap-2.5 border-b border-border px-4">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-text-inverse shadow-sm">
        H
      </div>
      <div v-show="!uiStore.sidebarCollapsed" class="flex flex-col min-w-0">
        <span class="text-sm font-bold text-primary tracking-wide leading-none">
          Hotel Test
        </span>
        <span class="mt-1 text-[10px] font-semibold text-accent uppercase tracking-wider truncate">
          {{ activeRoleTitle }}
        </span>
      </div>
    </div>

    <!-- Navigation List (Role Specific) -->
    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-4">
      <template v-for="section in currentNav" :key="section.label">
        <div>
          <!-- Section label -->
          <p
            v-show="!uiStore.sidebarCollapsed"
            class="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted"
          >
            {{ t(section.label) }}
          </p>
          <!-- Items -->
          <div class="space-y-0.5">
            <NuxtLink
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              :title="uiStore.sidebarCollapsed ? t(item.label) : undefined"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-colors',
                $route.path === item.path || ($route.path.startsWith(item.path + '/') && item.path !== '/dashboard')
                  ? 'bg-primary text-text-inverse shadow-sm'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              ]"
            >
              <Icon :name="item.icon" class="shrink-0" :size="16" />
              <span v-show="!uiStore.sidebarCollapsed" class="truncate">{{ t(item.label) }}</span>
            </NuxtLink>
          </div>
        </div>
      </template>
    </nav>

    <!-- Quick Role Context Switcher footer info -->
    <div v-show="!uiStore.sidebarCollapsed" class="px-4 py-3 border-t border-border bg-background/50 text-[11px] text-text-muted">
      <p class="font-semibold text-text-primary truncate">{{ uiStore.currentUser.name }}</p>
      <p class="text-[10px] text-text-muted truncate">{{ uiStore.currentUser.email }}</p>
    </div>

    <!-- Collapse toggle -->
    <div class="hidden border-t border-border p-3 lg:block">
      <button
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover"
        @click="uiStore.toggleSidebar()"
      >
        <Icon :name="uiStore.sidebarCollapsed ? 'chevron-right' : 'chevron-left'" :size="16" />
        <span v-show="!uiStore.sidebarCollapsed">{{ t('collapse') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '~/stores/ui'
import { useI18n } from '~/composables/useI18n'
import Icon from '~/components/ui/Icon.vue'

const uiStore = useUiStore()
const { t } = useI18n()

const activeRoleTitle = computed(() => {
  const titles = {
    owner: 'Owner Workspace',
    receptionist: 'Receptionist Desk',
    housekeeping: 'Housekeeping App'
  }
  return titles[uiStore.activeRole] || 'HotelOS'
})

// 1. OWNER Sidebar Navigation
const ownerNav = [
  {
    label: 'overview',
    items: [
      { label: 'dashboard', path: '/dashboard', icon: 'home' }
    ]
  },
  {
    label: 'business',
    items: [
      { label: 'revenue', path: '/revenue', icon: 'chart-line' },
      { label: 'expenses', path: '/expenses', icon: 'wallet' },
      { label: 'payments', path: '/payments', icon: 'credit-card' },
      { label: 'invoices', path: '/invoices', icon: 'file' },
      { label: 'reports', path: '/reports', icon: 'chart-bar' }
    ]
  },
  {
    label: 'operations',
    items: [
      { label: 'reservations', path: '/reservations', icon: 'calendar' },
      { label: 'rooms', path: '/rooms', icon: 'layout-grid' },
      { label: 'guests', path: '/guests', icon: 'users' }
    ]
  },
  {
    label: 'people',
    items: [
      { label: 'staff', path: '/staff', icon: 'id-card' },
      { label: 'roles', path: '/roles', icon: 'shield' }
    ]
  },
  {
    label: 'system',
    items: [
      { label: 'notifications', path: '/notifications', icon: 'bell' },
      { label: 'audit_logs', path: '/audit-logs', icon: 'list' },
      { label: 'settings', path: '/settings', icon: 'settings' }
    ]
  }
]

// 2. RECEPTIONIST Sidebar Navigation
const receptionistNav = [
  {
    label: 'front_desk',
    items: [
      { label: 'dashboard', path: '/dashboard', icon: 'home' },
      { label: 'front_desk', path: '/front-desk', icon: 'monitor' },
      { label: 'reservations', path: '/reservations', icon: 'calendar' },
      { label: 'guests', path: '/guests', icon: 'users' },
      { label: 'rooms', path: '/rooms', icon: 'layout-grid' }
    ]
  },
  {
    label: 'finance',
    items: [
      { label: 'payments', path: '/payments', icon: 'credit-card' },
      { label: 'invoices', path: '/invoices', icon: 'file' }
    ]
  },
  {
    label: 'housekeeping',
    items: [
      { label: 'housekeeping', path: '/housekeeping', icon: 'sparkles' }
    ]
  },
  {
    label: 'system',
    items: [
      { label: 'notifications', path: '/notifications', icon: 'bell' },
      { label: 'settings', path: '/settings', icon: 'settings' }
    ]
  }
]

// 3. HOUSEKEEPING (Cleaning Service) Sidebar Navigation
const housekeepingNav = [
  {
    label: 'my_work',
    items: [
      { label: 'dashboard', path: '/dashboard', icon: 'home' },
      { label: 'my_tasks', path: '/housekeeping', icon: 'sparkles' },
      { label: 'rooms', path: '/rooms', icon: 'layout-grid' }
    ]
  },
  {
    label: 'system',
    items: [
      { label: 'notifications', path: '/notifications', icon: 'bell' },
      { label: 'profile', path: '/settings', icon: 'user' }
    ]
  }
]

const currentNav = computed(() => {
  if (uiStore.activeRole === 'receptionist') return receptionistNav
  if (uiStore.activeRole === 'housekeeping') return housekeepingNav
  return ownerNav
})
</script>
