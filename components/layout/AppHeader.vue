<template>
  <header class="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 sm:px-6 z-40 relative">
    <!-- Mobile menu toggle -->
    <button
      class="lg:hidden text-text-secondary hover:text-text-primary"
      aria-label="Open menu"
      @click="uiStore.openMobileDrawer()"
    >
      <Icon name="menu" class="text-lg" />
    </button>

    <!-- Global search button -->
    <button
      class="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs sm:text-sm text-text-muted hover:border-primary/40 transition-colors"
      @click="openSearch"
    >
      <Icon name="search" :size="14" />
      <span class="hidden sm:inline">{{ t('search_placeholder') }}</span>
      <kbd class="ml-auto hidden rounded bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-text-muted sm:inline">⌘K</kbd>
    </button>

    <!-- Quick RFID Card Tap Button (Receptionist) -->
    <button
      v-if="uiStore.activeRole === 'receptionist'"
      class="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-all shadow-sm"
      @click="showRfidGlobalModal = true"
    >
      <Icon name="credit-card" :size="14" class="text-primary" />
      <span class="hidden md:inline">Tap Scan RFID</span>
    </button>

    <div class="flex-1" />

    <!-- Role Account Switcher Badge -->
    <div class="hidden lg:block">
      <details class="dropdown dropdown-end">
        <summary class="btn btn-sm btn-outline border-border text-text-primary gap-1.5 font-normal bg-background hover:bg-surface-hover">
          <Icon name="user-check" :size="14" class="text-accent" />
          <span class="text-xs font-semibold">{{ currentRoleLabel }}</span>
          <Icon name="chevron-down" :size="12" class="text-text-muted" />
        </summary>
        <ul class="dropdown-content menu bg-surface border border-border rounded-lg z-50 w-60 p-1.5 shadow-xl mt-2 space-y-1">
          <li class="menu-title px-2 py-1 text-[10px] font-bold tracking-wider text-text-muted uppercase">
            {{ t('switch_account') }}
          </li>
          <li>
            <a
              :class="['flex items-center justify-between text-xs rounded-lg py-2.5', uiStore.activeRole === 'owner' ? 'bg-primary/10 font-bold text-primary' : 'text-text-secondary']"
              @click="uiStore.setRole('owner')"
            >
              <div>
                <p class="font-semibold leading-tight">Fadhel Ahmad</p>
                <p class="text-[10px] font-normal text-text-muted">Owner Workspace</p>
              </div>
              <Icon v-if="uiStore.activeRole === 'owner'" name="check" :size="14" class="text-primary" />
            </a>
          </li>
          <li>
            <a
              :class="['flex items-center justify-between text-xs rounded-lg py-2.5', uiStore.activeRole === 'receptionist' ? 'bg-primary/10 font-bold text-primary' : 'text-text-secondary']"
              @click="uiStore.setRole('receptionist')"
            >
              <div>
                <p class="font-semibold leading-tight">Aditya Pratama</p>
                <p class="text-[10px] font-normal text-text-muted">Receptionist Desk</p>
              </div>
              <Icon v-if="uiStore.activeRole === 'receptionist'" name="check" :size="14" class="text-primary" />
            </a>
          </li>
          <li>
            <a
              :class="['flex items-center justify-between text-xs rounded-lg py-2.5', uiStore.activeRole === 'housekeeping' ? 'bg-primary/10 font-bold text-primary' : 'text-text-secondary']"
              @click="uiStore.setRole('housekeeping')"
            >
              <div>
                <p class="font-semibold leading-tight">Budi Santoso</p>
                <p class="text-[10px] font-normal text-text-muted">Cleaning Service App</p>
              </div>
              <Icon v-if="uiStore.activeRole === 'housekeeping'" name="check" :size="14" class="text-primary" />
            </a>
          </li>
        </ul>
      </details>
    </div>

    <!-- Language switcher -->
    <div class="flex items-center rounded-lg border border-border overflow-hidden bg-background">
      <button
        :class="['px-2 py-1 text-xs font-medium transition-colors', langStore.lang === 'en' ? 'bg-primary text-text-inverse' : 'text-text-secondary hover:bg-surface-hover']"
        @click="langStore.setLanguage('en')"
      >
        EN
      </button>
      <button
        :class="['px-2 py-1 text-xs font-medium transition-colors', langStore.lang === 'id' ? 'bg-primary text-text-inverse' : 'text-text-secondary hover:bg-surface-hover']"
        @click="langStore.setLanguage('id')"
      >
        ID
      </button>
    </div>

    <!-- Notifications with Actionable items & Mark all read -->
    <details class="dropdown dropdown-end">
      <summary class="btn btn-ghost btn-circle relative text-text-secondary hover:bg-surface-hover">
        <Icon name="bell" :size="18" />
        <span
          v-if="unreadCount > 0"
          class="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white shadow"
        >
          {{ unreadCount }}
        </span>
      </summary>
      <div class="dropdown-content z-50 w-80 sm:w-96 rounded-xl border border-border bg-surface shadow-xl mt-2 p-0 overflow-hidden">
        <div class="flex items-center justify-between border-b border-border bg-surface-hover/50 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-text-primary">{{ t('notifications') }}</span>
            <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{{ unreadCount }} new</span>
          </div>
          <button class="text-[11px] font-medium text-accent hover:underline" @click="markAllAsRead">
            {{ t('mark_all_read') }}
          </button>
        </div>
        <div class="max-h-80 overflow-y-auto divide-y divide-border-light">
          <div
            v-for="item in notifications"
            :key="item.id"
            :class="['p-3 transition-colors hover:bg-surface-hover/80', !item.read ? 'bg-accent-muted/20' : '']"
          >
            <div class="flex items-start gap-2.5">
              <div :class="['mt-0.5 p-1.5 rounded-lg shrink-0', item.bgClass]">
                <Icon :name="item.icon" :size="14" :class="item.iconClass" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-text-primary leading-snug">{{ item.title }}</p>
                <p class="text-[11px] text-text-secondary mt-0.5">{{ item.message }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <button
                    class="btn btn-xs btn-primary px-2 py-0.5 text-[10px] font-normal h-6 min-h-0"
                    @click="handleNotificationAction(item)"
                  >
                    {{ item.actionLabel }}
                  </button>
                  <span class="text-[10px] text-text-muted ml-auto">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-border p-2 text-center bg-surface-hover/30">
          <button class="text-xs font-medium text-primary hover:underline" @click="router.push('/notifications')">
            {{ t('view_all') }}
          </button>
        </div>
      </div>
    </details>

    <!-- User menu -->
    <details class="dropdown dropdown-end">
      <summary class="btn btn-ghost flex items-center gap-2 px-2 hover:bg-surface-hover">
        <span class="w-8 h-8 rounded-full bg-primary text-text-inverse text-xs font-semibold flex items-center justify-center shadow-sm">
          {{ uiStore.currentUser.initials }}
        </span>
        <span class="hidden text-left md:inline">
          <span class="block text-xs font-semibold leading-tight text-text-primary">{{ uiStore.currentUser.name }}</span>
          <span class="block text-[10px] leading-tight text-text-muted">{{ uiStore.currentUser.roleTitle }}</span>
        </span>
        <Icon name="chevron-down" :size="12" class="text-text-muted hidden md:inline" />
      </summary>
      <ul class="dropdown-content menu bg-surface border border-border rounded-lg z-50 w-52 p-1.5 shadow-lg mt-2 space-y-0.5">
        <li class="menu-title px-2 py-1 text-[10px] font-bold text-text-muted uppercase">Active Account</li>
        <li><a class="text-xs py-2 rounded-lg" @click="router.push('/settings')"><Icon name="user" :size="14" /> {{ t('profile') }}</a></li>
        <li><a class="text-xs py-2 rounded-lg" @click="router.push('/settings')"><Icon name="sliders-horizontal" :size="14" /> {{ t('preferences') }}</a></li>
        <li class="menu-divider"><span></span></li>
        <li class="menu-title px-2 py-1 text-[10px] font-bold text-text-muted uppercase">Switch Account</li>
        <li><a class="text-xs py-2 rounded-lg" @click="uiStore.setRole('owner')"><Icon name="shield" :size="14" /> Owner Account</a></li>
        <li><a class="text-xs py-2 rounded-lg" @click="uiStore.setRole('receptionist')"><Icon name="monitor" :size="14" /> Receptionist Account</a></li>
        <li><a class="text-xs py-2 rounded-lg" @click="uiStore.setRole('housekeeping')"><Icon name="sparkles" :size="14" /> Housekeeping Account</a></li>
      </ul>
    </details>

    <!-- Global Search Dialog -->
    <SearchOverlay v-model:visible="searchOpen" />

    <!-- Global RFID Scanner Dialog -->
    <RfidScannerModal
      v-model:visible="showRfidGlobalModal"
      mode="read"
      @cardRead="handleGlobalRfidRead"
    />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '~/stores/ui'
import { useHotelStore } from '~/stores/hotel'
import { useLanguageStore } from '~/stores/language'
import { useI18n } from '~/composables/useI18n'
import SearchOverlay from '~/components/ui/SearchOverlay.vue'
import RfidScannerModal from '~/components/ui/RfidScannerModal.vue'
import Icon from '~/components/ui/Icon.vue'

const uiStore = useUiStore()
const hotelStore = useHotelStore()
const langStore = useLanguageStore()
const { t } = useI18n()
const router = useRouter()

const searchOpen = ref(false)
const showRfidGlobalModal = ref(false)

function handleGlobalRfidRead(cardData) {
  router.push('/front-desk')
}

const currentRoleLabel = computed(() => {
  const map = {
    owner: 'Owner Workspace',
    receptionist: 'Receptionist Desk',
    housekeeping: 'Cleaning Service'
  }
  return map[uiStore.activeRole] || 'Owner Workspace'
})

const notifications = ref([
  {
    id: 1,
    title: 'Room 204 requires housekeeping',
    message: 'Guest checked out. Room status set to Dirty.',
    icon: 'sparkles',
    iconClass: 'text-warning',
    bgClass: 'bg-warning-bg',
    actionLabel: t('assign_housekeeper'),
    targetPath: '/housekeeping',
    time: '5m ago',
    read: false
  },
  {
    id: 2,
    title: '3 Payments pending verification',
    message: 'Bank transfers awaiting Front Desk confirmation.',
    icon: 'credit-card',
    iconClass: 'text-info',
    bgClass: 'bg-info-bg',
    actionLabel: t('collect_payment'),
    targetPath: '/payments',
    time: '12m ago',
    read: false
  },
  {
    id: 3,
    title: 'VIP Guest arrival at 15:30',
    message: 'Mr. Tanaka arriving in Suite 1201.',
    icon: 'star',
    iconClass: 'text-accent',
    bgClass: 'bg-accent-muted',
    actionLabel: t('prepare_welcome'),
    targetPath: '/front-desk',
    time: '25m ago',
    read: false
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function markAllAsRead() {
  notifications.value.forEach(n => { n.read = true })
}

function handleNotificationAction(item) {
  item.read = true
  router.push(item.targetPath)
}

function openSearch() {
  searchOpen.value = true
}

// Global ⌘K / Ctrl+K
if (process.client) {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
  })
}
</script>
