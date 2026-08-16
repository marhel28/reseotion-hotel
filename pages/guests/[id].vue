<template>
  <div v-if="!guest" class="space-y-6">
    <PageHeader title="Guest Not Found" :breadcrumb="breadcrumb" />
    <EmptyState icon="user" title="Guest not found" message="The requested guest could not be found." />
  </div>

  <div v-else class="space-y-6">
    <!-- Page Header with Actions -->
    <PageHeader :title="guest.fullName" :breadcrumb="breadcrumb">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="handleNewReservation">
          <Icon name="plus" :size="14" /> {{ t('new_reservation') }}
        </button>
        <button class="btn btn-outline btn-sm" @click="handleSendMessage">
          <Icon name="mail" :size="14" /> {{ t('send_message') }}
        </button>
        <button class="btn btn-outline btn-sm" @click="notesTabActive = true">
          <Icon name="file-edit" :size="14" /> {{ t('add_note') }}
        </button>
        <button class="btn btn-outline btn-sm" @click="handleViewInvoice">
          <Icon name="receipt" :size="14" /> {{ t('view_invoice') }}
        </button>
      </template>
    </PageHeader>

    <!-- Header Card -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <!-- Avatar -->
          <div class="avatar">
            <div class="w-20 h-20 rounded-full bg-primary text-2xl text-white flex items-center justify-center">
              {{ guest.initials }}
            </div>
          </div>

          <!-- Guest Info -->
          <div class="flex-1 space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-2xl font-semibold text-text-primary">{{ guest.fullName }}</h2>
              <span v-if="guest.vip" class="badge badge-warning font-medium">VIP Guest</span>
              <StatusBadge :status="guest.status" type="generic" />
            </div>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
              <span class="inline-flex items-center gap-1.5">
                <Icon name="map-pin" class="text-text-muted" :size="14" />
                {{ guest.country }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Icon name="mail" class="text-text-muted" :size="14" />
                {{ guest.email }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Icon name="phone" class="text-text-muted" :size="14" />
                {{ guest.phone }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <p class="text-xs uppercase tracking-wide text-text-muted">{{ t('total_stays') }}</p>
          <p class="mt-1 text-2xl font-semibold tabular text-text-primary">{{ guest.totalStays }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <p class="text-xs uppercase tracking-wide text-text-muted">Total Nights</p>
          <p class="mt-1 text-2xl font-semibold tabular text-text-primary">{{ guest.totalStays * 2 }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <p class="text-xs uppercase tracking-wide text-text-muted">{{ t('lifetime_spend') }}</p>
          <p class="mt-1 text-2xl font-semibold tabular text-text-primary">{{ formatRupiah(guest.totalSpent) }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <p class="text-xs uppercase tracking-wide text-text-muted">{{ t('average_stay') }}</p>
          <p class="mt-1 text-2xl font-semibold tabular text-text-primary">2 {{ t('nights') }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div>
      <div role="tablist" class="tabs tabs-bordered">
        <label class="tab"><input type="radio" name="guest-tabs" class="sr-only" :checked="activeTab==='overview'" @change="activeTab='overview'" />{{ t('overview') }}</label>
        <label class="tab"><input type="radio" name="guest-tabs" class="sr-only" :checked="activeTab==='stay_history'" @change="activeTab='stay_history'" />{{ t('stay_history') }}</label>
        <label class="tab"><input type="radio" name="guest-tabs" class="sr-only" :checked="activeTab==='payments'" @change="activeTab='payments'" />{{ t('payments') }}</label>
        <label class="tab"><input type="radio" name="guest-tabs" class="sr-only" :checked="activeTab==='notes'" @change="activeTab='notes'" />{{ t('notes') }}</label>
      </div>

      <!-- Overview Tab -->
      <div v-show="activeTab==='overview'" role="tabpanel" class="tab-content pt-4 space-y-4">
        <!-- Preferences -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-title mb-2">
              <h3 class="text-sm font-medium text-text-primary">{{ t('preferences') }}</h3>
            </div>
            <div v-if="hasPreferences" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div v-if="guest.preferences?.roomType">
                <p class="text-xs text-text-muted">Room Type</p>
                <p class="text-sm font-medium text-text-primary">{{ guest.preferences.roomType }}</p>
              </div>
              <div v-if="guest.preferences?.floor">
                <p class="text-xs text-text-muted">Floor</p>
                <p class="text-sm font-medium text-text-primary">{{ guest.preferences.floor }}</p>
              </div>
              <div>
                <p class="text-xs text-text-muted">Smoking</p>
                <p class="text-sm font-medium text-text-primary">{{ guest.preferences?.smoking ? 'Yes' : 'No' }}</p>
              </div>
              <div v-if="guest.preferences?.notes" class="sm:col-span-2 lg:col-span-3">
                <p class="text-xs text-text-muted">Notes</p>
                <p class="text-sm text-text-secondary">{{ guest.preferences.notes }}</p>
              </div>
            </div>
            <p v-else class="text-sm text-text-muted">No preferences set.</p>
          </div>
        </div>

        <!-- ID Number -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-title mb-2">
              <h3 class="text-sm font-medium text-text-primary">ID Number</h3>
            </div>
            <p class="font-mono text-sm text-text-primary">{{ guest.idNumber }}</p>
          </div>
        </div>

        <!-- Notes List -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-title mb-2">
              <h3 class="text-sm font-medium text-text-primary">{{ t('notes') }}</h3>
            </div>
            <ul v-if="guest.notes.length" class="space-y-2">
              <li
                v-for="(note, i) in guest.notes"
                :key="i"
                class="rounded-lg border border-border bg-surface-hover px-3 py-2 text-sm text-text-secondary"
              >
                {{ note }}
              </li>
            </ul>
            <p v-else class="text-sm text-text-muted">No notes for this guest.</p>
          </div>
        </div>
      </div>

      <!-- Stay History Tab -->
      <div v-show="activeTab==='stay_history'" role="tabpanel" class="tab-content pt-4">
        <EmptyState
          v-if="!guestReservations.length"
          icon="calendar"
          :title="`No ${t('stay_history').toLowerCase()}`"
          message="This guest has no past or upcoming reservations."
        />
        <div v-else class="overflow-x-auto">
          <table class="table table-zebra table-compact w-full text-sm">
            <thead>
              <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                <th class="font-medium">Booking ID</th>
                <th class="font-medium">Room</th>
                <th class="font-medium">Check-in</th>
                <th class="font-medium">Check-out</th>
                <th class="font-medium">Amount</th>
                <th class="font-medium">{{ t('status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in guestReservations" :key="row.id" class="hover:bg-surface-hover transition-colors">
                <td class="font-medium text-primary">{{ row.bookingId }}</td>
                <td class="text-text-secondary">{{ row.roomType }}</td>
                <td class="tabular text-text-secondary">{{ row.checkIn }}</td>
                <td class="tabular text-text-secondary">{{ row.checkOut }}</td>
                <td class="tabular font-medium text-text-primary">{{ formatRupiah(row.amount) }}</td>
                <td><StatusBadge :status="row.status" type="reservation" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Payments Tab -->
      <div v-show="activeTab==='payments'" role="tabpanel" class="tab-content pt-4">
        <EmptyState
          v-if="!guestPayments.length"
          icon="credit-card"
          :title="`No ${t('payments').toLowerCase()}`"
          message="This guest has no payment records."
        />
        <div v-else class="overflow-x-auto">
          <table class="table table-zebra table-compact w-full text-sm">
            <thead>
              <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                <th class="font-medium">Payment ID</th>
                <th class="font-medium">Date</th>
                <th class="font-medium">Description</th>
                <th class="font-medium">Method</th>
                <th class="font-medium">Amount</th>
                <th class="font-medium">{{ t('status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in guestPayments" :key="row.id" class="hover:bg-surface-hover transition-colors">
                <td class="font-medium text-primary">{{ row.paymentId }}</td>
                <td class="tabular text-text-secondary">{{ row.date }}</td>
                <td class="text-text-secondary">{{ row.description }}</td>
                <td class="capitalize text-text-secondary">{{ row.method?.replace('_', ' ') }}</td>
                <td class="tabular font-medium text-text-primary">{{ formatRupiah(row.amount) }}</td>
                <td><StatusBadge :status="row.status" type="payment" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Notes Tab -->
      <div v-show="activeTab==='notes'" role="tabpanel" class="tab-content pt-4 space-y-4">
        <!-- Add Note -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-title mb-2">
              <h3 class="text-sm font-medium text-text-primary">{{ t('add_note') }}</h3>
            </div>
            <textarea v-model="newNote" rows="3" class="textarea textarea-bordered w-full" placeholder="Write a note about this guest..." />
            <div class="mt-3 flex justify-end">
              <button class="btn btn-primary" :disabled="!newNote.trim()" @click="addNote">
                <Icon name="plus" :size="14" /> Add Note
              </button>
            </div>
          </div>
        </div>

        <!-- Notes List -->
        <div v-if="guest.notes.length" class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-title mb-2">
              <h3 class="text-sm font-medium text-text-primary">{{ t('notes') }} ({{ guest.notes.length }})</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="(note, i) in guest.notes"
                :key="i"
                class="rounded-lg border border-border bg-surface-hover px-3 py-2 text-sm text-text-secondary"
              >
                {{ note }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import { mockGuests, type Guest } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import { mockPayments } from '~/mock/payments'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// Get guest by route param id
const guestId = computed(() => Number(route.params.id))
const guest = computed<Guest | undefined>(() => mockGuests.find((g) => g.id === guestId.value))

// Tabs
const activeTab = ref('overview')
const notesTabActive = ref(false)
watch(notesTabActive, (val) => {
  if (val) activeTab.value = 'notes'
  notesTabActive.value = false
})

// Filter reservations and payments for this guest
const guestReservations = computed(() => mockReservations.filter((r) => r.guestId === guestId.value))
const guestPayments = computed(() => mockPayments.filter((p) => p.guestId === guestId.value))

// Preferences check
const hasPreferences = computed(() => {
  const p = guest.value?.preferences
  return p && (p.roomType || p.floor || p.notes)
})

// Notes
const newNote = ref('')
function addNote() {
  if (!newNote.value.trim() || !guest.value) return
  guest.value.notes.push(newNote.value.trim())
  newNote.value = ''
}

// Breadcrumb
const breadcrumb = computed(() => [
  { label: t('dashboard'), path: '/' },
  { label: t('guests'), path: '/guests' },
  { label: guest.value?.fullName || t('guest') },
])

// Action handlers
function handleNewReservation() {
  router.push('/reservations/new')
}
function handleSendMessage() {
  // Placeholder
}
function handleViewInvoice() {
  // Placeholder
}
</script>
