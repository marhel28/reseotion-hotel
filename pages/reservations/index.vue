<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="t('reservations')" :breadcrumb="breadcrumb">
      <template #actions>
        <Button
          :label="t('new_reservation')"
          icon="pi pi-plus"
          @click="navigateTo('/reservations/new')"
        />
        <Button :label="t('export')" icon="pi pi-download" variant="outlined" />
        <Button :label="t('filter')" icon="pi pi-filter" variant="outlined" />
      </template>
    </PageHeader>

    <!-- Tabs -->
    <Tabs :value="activeTab" @update:value="activeTab = $event">
      <TabList>
        <Tab
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
        >
          {{ t(tab.labelKey) }}
          <span
            class="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-surface-hover px-1.5 text-[10px] font-medium text-text-muted tabular"
          >
            {{ tabCounts[tab.value] || 0 }}
          </span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="!p-0 !pt-4"
        >
          <!-- Search -->
          <div class="mb-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-search text-text-muted" />
              </InputGroupAddon>
              <InputText
                v-model="searchQuery"
                placeholder="Cari nama tamu atau ID reservasi..."
                class="w-full"
              />
            </InputGroup>
          </div>

          <!-- Data Table -->
          <DataTable
            :value="filteredReservations"
            :paginator="true"
            :rows="10"
            responsive-layout="scroll"
            class="p-datatable-sm"
          >
            <Column field="bookingId" :header="t('booking_id')" sortable>
              <template #body="{ data }">
                <span class="font-medium text-primary">{{ data.bookingId }}</span>
              </template>
            </Column>
            <Column field="guest" :header="t('guest')" sortable>
              <template #body="{ data }">
                <span class="text-text-primary">{{ data.guest?.fullName || data.guestId }}</span>
              </template>
            </Column>
            <Column field="room" :header="t('rooms')">
              <template #body="{ data }">
                <span class="text-text-secondary">{{ data.room?.number || data.roomId }}</span>
              </template>
            </Column>
            <Column field="roomType" :header="t('room_type')">
              <template #body="{ data }">
                <span class="text-text-secondary">{{ data.roomType }}</span>
              </template>
            </Column>
            <Column field="checkIn" :header="t('check_in')" sortable>
              <template #body="{ data }">
                <span class="tabular text-text-secondary">{{ data.checkIn }}</span>
              </template>
            </Column>
            <Column field="checkOut" :header="t('check_out')" sortable>
              <template #body="{ data }">
                <span class="tabular text-text-secondary">{{ data.checkOut }}</span>
              </template>
            </Column>
            <Column field="guests" :header="t('guests')">
              <template #body="{ data }">
                <span class="text-text-secondary">{{ data.guests }}</span>
              </template>
            </Column>
            <Column field="source" :header="t('source')">
              <template #body="{ data }">
                <span class="text-text-secondary capitalize">{{ data.source?.replace('_', ' ') }}</span>
              </template>
            </Column>
            <Column field="amount" :header="t('amount')" sortable>
              <template #body="{ data }">
                <span class="tabular font-medium text-text-primary">{{ formatRupiah(data.amount) }}</span>
              </template>
            </Column>
            <Column field="status" :header="t('status')">
              <template #body="{ data }">
                <StatusBadge :status="data.status" type="reservation" />
              </template>
            </Column>
            <Column :header="t('actions')">
              <template #body="{ data }">
                <div class="flex items-center gap-1">
                  <Button
                    icon="pi pi-eye"
                    variant="text"
                    size="small"
                    @click="navigateTo(`/reservations/${data.id}`)"
                  />
                  <Button icon="pi pi-pencil" variant="text" size="small" />
                  <Button icon="pi pi-trash" variant="text" size="small" severity="danger" />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import { mockReservations } from '~/mock/reservations'
import { mockGuests } from '~/mock/guests'
import { mockRooms } from '~/mock/rooms'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'

const { t } = useI18n()
const router = useRouter()

// Enrich reservations with guest and room data
const reservations = computed(() =>
  mockReservations.map((r) => ({
    ...r,
    guest: mockGuests.find((g) => g.id === r.guestId),
    room: mockRooms.find((rm) => rm.id === r.roomId),
  }))
)

// Tabs definition
const tabs = [
  { value: 'all', labelKey: 'all' },
  { value: 'confirmed', labelKey: 'confirmed' },
  { value: 'pending', labelKey: 'pending' },
  { value: 'checked_in', labelKey: 'checked_in' },
  { value: 'checked_out', labelKey: 'checked_out' },
  { value: 'cancelled', labelKey: 'cancelled' },
  { value: 'no_show', labelKey: 'no_show' },
]

const activeTab = ref('all')
const searchQuery = ref('')

// Count per status
const tabCounts = computed(() => {
  const counts = { all: reservations.value.length }
  for (const r of reservations.value) {
    counts[r.status] = (counts[r.status] || 0) + 1
  }
  return counts
})

// Filtered reservations
const filteredReservations = computed(() => {
  let list = reservations.value

  // Filter by tab
  if (activeTab.value !== 'all') {
    list = list.filter((r) => r.status === activeTab.value)
  }

  // Filter by search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      (r) =>
        r.bookingId.toLowerCase().includes(q) ||
        (r.guest?.fullName || '').toLowerCase().includes(q)
    )
  }

  return list
})

// Breadcrumb
const breadcrumb = [
  { label: t('dashboard'), path: '/' },
  { label: t('reservations') },
]

function navigateTo(path) {
  router.push(path)
}
</script>
