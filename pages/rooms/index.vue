<template>
  <div class="space-y-5">
    <!-- Header dengan view switcher + status filter -->
    <PageHeader title="Katalog & Status Kamar" :breadcrumb="breadcrumb">
      <template #actions>
        <div class="flex items-center gap-2.5">
          <!-- View switcher -->
          <div class="join border border-border rounded-md overflow-hidden bg-surface">
            <button
              class="btn btn-xs join-item font-semibold"
              :class="view === 'table' ? 'btn-primary' : 'btn-ghost'"
              @click="view = 'table'"
            >
              <Icon name="pi pi-table" :size="12" /> Tabel
            </button>
            <button
              class="btn btn-xs join-item font-semibold"
              :class="view === 'grid' ? 'btn-primary' : 'btn-ghost'"
              @click="view = 'grid'"
            >
              <Icon name="pi pi-th-large" :size="12" /> Grid Foto
            </button>
            <button
              class="btn btn-xs join-item font-semibold"
              :class="view === 'floor_plan' ? 'btn-primary' : 'btn-ghost'"
              @click="view = 'floor_plan'"
            >
              <Icon name="pi pi-sitemap" :size="12" /> Denah Lantai
            </button>
          </div>

          <!-- Status filter -->
          <select v-model="statusFilter" class="select select-bordered select-xs w-40 text-xs font-semibold">
            <option
              v-for="o in statusOptions"
              :key="o.value"
              :value="o.value"
            >
              {{ o.label }}
            </option>
          </select>
        </div>
      </template>
    </PageHeader>

    <!-- ========== TABLE VIEW ========== -->
    <div v-if="view === 'table'" class="rounded-lg border border-border bg-surface overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span class="text-xs font-bold text-text-primary uppercase tracking-wide">
          Daftar Kamar ({{ filteredRooms.length }})
        </span>
        <div class="relative">
          <input
            v-model="search"
            placeholder="Cari nomor kamar..."
            class="input input-bordered input-xs w-48 pl-8 text-xs"
          />
          <Icon name="pi pi-search" :size="12" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-xs">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted border-b border-border">
              <th class="font-bold" style="width: 12%">Nomor Kamar</th>
              <th class="font-bold" style="width: 18%">Tipe Kamar</th>
              <th class="font-bold" style="width: 10%">Lantai</th>
              <th class="font-bold" style="width: 14%">Status Kamar</th>
              <th class="font-bold" style="width: 20%">Tamu Active</th>
              <th class="font-bold" style="width: 14%">Housekeeping</th>
              <th class="font-bold text-right" style="width: 12%">Tarif / Malam</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedRows"
              :key="row.id"
              class="hover:bg-surface-hover transition-colors"
            >
              <td>
                <NuxtLink :to="`/rooms/${row.id}`" class="font-bold text-primary hover:underline">
                  Kamar {{ row.number }}
                </NuxtLink>
              </td>
              <td class="text-text-primary font-medium">{{ resolveType(row.typeId) }}</td>
              <td class="text-text-secondary">Lantai {{ row.floor }}</td>
              <td>
                <StatusBadge :status="row.status" type="room" />
              </td>
              <td>
                <span v-if="row.guestId" class="font-semibold text-text-primary">{{ resolveGuestName(row) }}</span>
                <span v-else class="text-text-muted">—</span>
              </td>
              <td>
                <StatusBadge :status="row.housekeepingStatus" type="room" />
              </td>
              <td class="text-right font-bold tabular text-text-primary">
                {{ formatRupiah(row.price) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="join flex justify-end border-t border-border px-4 py-2">
        <button class="join-item btn btn-xs" :disabled="page<=0" @click="page--">&lt;</button>
        <button v-for="p in pageRange" :key="p" class="join-item btn btn-xs" :class="p===page+1 && 'btn-active'" @click="page=p-1">{{ p }}</button>
        <button class="join-item btn btn-xs" :disabled="page>=totalPages-1" @click="page++">&gt;</button>
      </div>
      <!-- Empty state -->
      <div v-if="filteredRooms.length === 0" class="p-6">
        <EmptyState icon="pi pi-home" title="Tidak ada kamar ditemukan" message="Coba ubah kata kunci atau filter status" />
      </div>
    </div>

    <!-- ========== GRID VIEW (Crisp 8px Cards, Photo Header, No Fluff) ========== -->
    <div v-else-if="view === 'grid'">
      <div v-if="filteredRooms.length" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NuxtLink
          v-for="room in filteredRooms"
          :key="room.id"
          :to="`/rooms/${room.id}`"
          class="group overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-primary/50"
        >
          <!-- Room Photo Thumbnail (No Glassmorphism) -->
          <div class="relative h-28 w-full overflow-hidden bg-surface-hover">
            <img
              :src="resolveRoomImage(room.typeId)"
              :alt="`Kamar ${room.number}`"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span class="absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
              Lantai {{ room.floor }}
            </span>
            <div class="absolute bottom-2 left-3 text-white">
              <p class="text-base font-bold">Kamar {{ room.number }}</p>
              <p class="text-[10px] text-white/80">{{ resolveType(room.typeId) }}</p>
            </div>
          </div>

          <div class="p-3 space-y-2.5">
            <!-- Status indicator -->
            <div class="flex items-center gap-2">
              <span :class="['h-2 w-2 rounded-full', statusDot(room.status)]" />
              <StatusBadge :status="room.status" type="room" />
            </div>

            <!-- Guest info if occupied -->
            <div v-if="room.status === 'occupied' && room.guestId" class="border-t border-border pt-2">
              <p class="text-[9px] uppercase font-bold text-text-muted">Tamu Active</p>
              <p class="text-xs font-bold text-text-primary">{{ resolveGuestName(room) }}</p>
              <p class="text-[10px] text-text-secondary mt-0.5">
                Check-out: {{ resolveCheckOut(room) }}
              </p>
            </div>

            <!-- Housekeeping + price -->
            <div class="flex items-center justify-between border-t border-border pt-2">
              <div class="flex items-center gap-1.5">
                <span :class="['h-1.5 w-1.5 rounded-full', housekeepingDot(room.housekeepingStatus)]" />
                <span class="text-[11px] capitalize text-text-muted">{{ room.housekeepingStatus.replace('_', ' ') }}</span>
              </div>
              <span class="text-xs font-bold tabular text-text-primary">{{ formatRupiah(room.price) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <EmptyState v-else icon="pi pi-th-large" title="Tidak ada kamar ditemukan" message="Coba ubah kata kunci atau filter status" />
    </div>

    <!-- ========== FLOOR PLAN VIEW ========== -->
    <div v-else-if="view === 'floor_plan'" class="space-y-4">
      <!-- Legend -->
      <div class="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs">
        <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide">Keterangan Status:</span>
        <div
          v-for="s in legend"
          :key="s.value"
          class="flex items-center gap-1.5"
        >
          <span :class="['h-2.5 w-2.5 rounded', s.color]" />
          <span class="text-text-secondary font-medium">{{ s.label }}</span>
        </div>
      </div>

      <!-- Floors -->
      <div
        v-for="floor in floors"
        :key="floor"
        class="rounded-lg border border-border bg-surface p-4"
      >
        <h2 class="mb-3 text-xs font-bold text-text-primary uppercase tracking-wide">
          Lantai {{ floor }}
        </h2>
        <div class="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          <NuxtLink
            v-for="room in roomsByFloor(floor)"
            :key="room.id"
            :to="`/rooms/${room.id}`"
            :class="[
              'group relative flex h-14 flex-col items-center justify-center rounded border transition-all hover:scale-105',
              roomTile(room.status)
            ]"
            :title="`Kamar ${room.number}`"
          >
            <span class="text-xs font-bold">Kamar {{ room.number }}</span>
            <span class="mt-0.5 text-[9px] uppercase opacity-80">{{ resolveType(room.typeId, true) }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import { usePagination } from '~/composables/usePagination'
import { mockRooms } from '~/mock/rooms'
import mockRoomTypes from '~/mock/roomTypes'
import { mockGuests } from '~/mock/guests'
import { mockReservations } from '~/mock/reservations'
import type { Room, RoomStatus } from '~/types/index'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import Icon from '~/components/ui/Icon.vue'

import deluxeRoomImg from '~/assets/images/deluxe_room.jpg'
import executiveSuiteImg from '~/assets/images/executive_suite.jpg'
import presidentialSuiteImg from '~/assets/images/presidential_suite.jpg'

const { t } = useI18n()

const view = ref<'table' | 'grid' | 'floor_plan'>('grid')
const search = ref('')
const statusFilter = ref<string>('all')

const breadcrumb = [
  { label: 'Dasbor', path: '/' },
  { label: 'Katalog Kamar' },
]

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Kosong (Tersedia)', value: 'available' },
  { label: 'Terisi (Occupied)', value: 'occupied' },
  { label: 'Kotor (Cleaning)', value: 'dirty' },
  { label: 'Perbaikan', value: 'maintenance' },
]

const legend = [
  { value: 'available', label: 'Kosong (Hijau)', color: 'bg-success' },
  { value: 'occupied', label: 'Terisi (Biru)', color: 'bg-info' },
  { value: 'dirty', label: 'Kotor (Amber)', color: 'bg-warning' },
  { value: 'maintenance', label: 'Perbaikan (Merah)', color: 'bg-danger' },
]

const floors = [1, 2, 3]

function resolveRoomImage(typeId: number): string {
  if (typeId === 2) return executiveSuiteImg
  if (typeId >= 3) return presidentialSuiteImg
  return deluxeRoomImg
}

// Resolve typeId -> name
function resolveType(typeId: number, short = false): string {
  const type = mockRoomTypes.find(rt => rt.id === typeId)
  if (!type) return 'Standard Room'
  if (short) {
    const map: Record<string, string> = {
      'Standard Room': 'STD',
      'Deluxe Room': 'DLX',
      'Family Suite': 'FAM',
      'Deluxe King': 'STD',
      'Executive': 'DLX',
      'Presidential Suite': 'FAM'
    }
    return map[type.name] || type.name.slice(0, 3).toUpperCase()
  }
  return type.name
}

// Find active reservation for a room
function findReservation(room: Room) {
  return mockReservations.find(r => r.roomId === room.id && (r.status === 'checked_in' || r.status === 'confirmed'))
}

function resolveGuestName(room: Room): string {
  const res = findReservation(room)
  if (!res) return '-'
  const guest = mockGuests.find(g => g.id === res.guestId)
  return guest?.fullName ?? '-'
}

function resolveCheckOut(room: Room): string {
  const res = findReservation(room)
  return res?.checkOut ?? '-'
}

// Filtered rooms for table/grid
const filteredRooms = computed(() => {
  let rooms = mockRooms
  if (statusFilter.value !== 'all') {
    rooms = rooms.filter(r => r.status === statusFilter.value)
  }
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    rooms = rooms.filter(r => r.number.toLowerCase().includes(q))
  }
  return rooms
})

const { page, paginatedRows, totalPages, pageRange } = usePagination(() => filteredRooms.value, 15)

function roomsByFloor(floor: number) {
  let rooms = mockRooms.filter(r => r.floor === floor)
  if (statusFilter.value !== 'all') {
    rooms = rooms.filter(r => r.status === statusFilter.value)
  }
  return rooms
}

// Status styling helpers
const statusBorder = (status: RoomStatus) => {
  const map: Record<RoomStatus, string> = {
    available: 'border-l-4 border-l-success',
    occupied: 'border-l-4 border-l-info',
    reserved: 'border-l-4 border-l-warning',
    dirty: 'border-l-4 border-l-warning',
    cleaning: 'border-l-4 border-l-info',
    maintenance: 'border-l-4 border-l-danger',
    out_of_order: 'border-l-4 border-l-danger',
  }
  return map[status] || 'border-l-4 border-l-border'
}

const statusDot = (status: RoomStatus) => {
  const map: Record<RoomStatus, string> = {
    available: 'bg-success',
    occupied: 'bg-info',
    reserved: 'bg-warning',
    dirty: 'bg-warning',
    cleaning: 'bg-info',
    maintenance: 'bg-danger',
    out_of_order: 'bg-danger',
  }
  return map[status] || 'bg-text-muted'
}

const housekeepingDot = (status: string) => {
  const map: Record<string, string> = {
    clean: 'bg-success',
    inspected: 'bg-success',
    dirty: 'bg-warning',
    cleaning: 'bg-info',
    out_of_order: 'bg-danger',
  }
  return map[status] || 'bg-text-muted'
}

const roomTile = (status: RoomStatus) => {
  const map: Record<RoomStatus, string> = {
    available: 'bg-success/10 text-success border border-success/30 font-bold',
    occupied: 'bg-info/10 text-info border border-info/30 font-bold',
    reserved: 'bg-warning/10 text-warning border border-warning/30 font-bold',
    dirty: 'bg-warning/10 text-warning border border-warning/30 font-bold',
    cleaning: 'bg-info/10 text-info border border-info/30 font-bold',
    maintenance: 'bg-danger/10 text-danger border border-danger/30 font-bold',
    out_of_order: 'bg-danger/10 text-danger border border-danger/30 font-bold',
  }
  return map[status] || 'bg-surface-hover text-text-muted border border-border'
}
</script>
