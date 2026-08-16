<template>
  <div class="space-y-6">
    <!-- Page Header dengan Quick Action -->
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-text-primary">
          Front Desk Command Center
        </h1>
        <p class="text-xs sm:text-sm text-text-secondary">
          Pemantauan status kamar real-time & reservasi instan untuk resepsionis
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-primary btn-sm text-xs font-bold shadow-sm" @click="openQuickBookModal(null)">
          <Icon name="plus" :size="14" /> + Reservasi Instan Walk-in
        </button>
      </div>
    </div>

    <!-- Papan Matrix Status Kamar Real-Time (Visual 1-Glance Awareness) -->
    <div class="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-3">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-2.5">
        <div class="flex items-center gap-2">
          <Icon name="layout-grid" :size="16" class="text-info" />
          <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">Live Room Availability Board</h2>
        </div>
        <div class="flex flex-wrap items-center gap-3 text-xs">
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-success" /><strong class="text-success">{{ availableRoomsList.length }} Kosong</strong> (Klik untuk booking instan)</span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-info" /><strong class="text-info">6 Terisi</strong></span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-warning" /><strong class="text-warning">4 Kotor</strong></span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-danger" /><strong class="text-danger">1 Perbaikan</strong></span>
        </div>
      </div>

      <!-- Quick Room Grid Cards -->
      <div class="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2 pt-1">
        <div
          v-for="rm in liveRoomsGrid"
          :key="rm.number"
          :class="[
            'p-2.5 rounded-lg border text-center transition-all cursor-pointer hover:scale-105 shadow-sm flex flex-col justify-between h-20',
            roomStatusClass(rm.status)
          ]"
          @click="onRoomTileClick(rm)"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold">Kamar {{ rm.number }}</span>
            <span :class="['h-2 w-2 rounded-full', roomStatusDot(rm.status)]" />
          </div>
          <div>
            <p class="text-[10px] truncate font-medium opacity-90">{{ rm.type }}</p>
            <p v-if="rm.status === 'available'" class="text-[9px] font-bold text-success uppercase mt-0.5">+ Booking</p>
            <p v-else-if="rm.status === 'occupied'" class="text-[9px] font-bold text-info truncate mt-0.5">{{ rm.guest }}</p>
            <p v-else class="text-[9px] font-bold text-warning capitalize mt-0.5">{{ rm.status }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Operational summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-xs font-bold uppercase tracking-wide text-text-muted">{{ t('todays_arrivals') }}</p>
        <p class="mt-1 text-2xl font-bold text-info">{{ todaysArrivals.length }}</p>
        <p class="text-[11px] text-text-muted">Siap check-in hari ini</p>
      </div>
      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-xs font-bold uppercase tracking-wide text-text-muted">{{ t('todays_departures') }}</p>
        <p class="mt-1 text-2xl font-bold text-warning">{{ todaysDepartures.length }}</p>
        <p class="text-[11px] text-text-muted">Jadwal check-out hari ini</p>
      </div>
      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-xs font-bold uppercase tracking-wide text-text-muted">{{ t('current_guests') }}</p>
        <p class="mt-1 text-2xl font-bold text-primary">{{ currentGuests.length }}</p>
        <p class="text-[11px] text-text-muted">Tamu aktif menginap</p>
      </div>
    </div>

    <!-- Tabbed Operational Sections -->
    <div>
      <div role="tablist" class="tabs tabs-bordered">
        <label class="tab font-semibold"><input type="radio" name="fd-tabs" class="sr-only" :checked="activeTab==='arrivals'" @change="activeTab='arrivals'" />{{ t('todays_arrivals') }} ({{ todaysArrivals.length }})</label>
        <label class="tab font-semibold"><input type="radio" name="fd-tabs" class="sr-only" :checked="activeTab==='departures'" @change="activeTab='departures'" />{{ t('todays_departures') }} ({{ todaysDepartures.length }})</label>
        <label class="tab font-semibold"><input type="radio" name="fd-tabs" class="sr-only" :checked="activeTab==='guests'" @change="activeTab='guests'" />{{ t('current_guests') }} ({{ currentGuests.length }})</label>
      </div>

      <!-- ==================== TODAY'S ARRIVALS ==================== -->
      <div v-show="activeTab==='arrivals'" role="tabpanel" class="tab-content pt-4">
        <div class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
          <div class="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">{{ t('todays_arrivals') }}</h2>
            <span class="rounded-full bg-info/10 px-2.5 py-0.5 text-xs font-bold text-info">
              {{ todaysArrivals.length }} Tamu
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra table-compact w-full text-sm">
              <thead>
                <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                  <th class="font-medium">{{ t('guest') }}</th>
                  <th class="font-medium">No. WhatsApp</th>
                  <th class="font-medium">{{ t('room') }}</th>
                  <th class="font-medium">{{ t('arrival_time') }}</th>
                  <th class="font-medium">{{ t('payment') }}</th>
                  <th class="font-medium">{{ t('status') }}</th>
                  <th class="font-medium text-right">{{ t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in todaysArrivals" :key="row.id" class="hover:bg-surface-hover transition-colors">
                  <td>
                    <div class="flex items-center gap-3">
                      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-info/10 text-xs font-bold text-info">
                        {{ row.guest?.initials }}
                      </span>
                      <div class="min-w-0">
                        <p class="truncate text-sm font-bold text-text-primary">{{ row.guest?.fullName }}</p>
                        <p class="truncate text-xs text-text-muted">{{ row.bookingId }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="text-xs font-medium text-text-secondary">{{ row.guest?.phone || '08123456789' }}</td>
                  <td>
                    <p class="text-sm font-bold text-primary">Kamar {{ row.room?.number ?? '—' }}</p>
                    <p class="text-xs text-text-muted">{{ row.roomType }}</p>
                  </td>
                  <td class="text-xs text-text-secondary">{{ formatDate(row.checkIn) }}</td>
                  <td><StatusBadge :status="row.paymentStatus" type="payment" /></td>
                  <td><StatusBadge :status="row.status" type="reservation" /></td>
                  <td class="text-right">
                    <button class="btn btn-xs bg-success text-white hover:bg-success/90 border-0 font-bold px-3" @click="openCheckIn(row)">
                      {{ t('check_in') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ==================== TODAY'S DEPARTURES ==================== -->
      <div v-show="activeTab==='departures'" role="tabpanel" class="tab-content pt-4">
        <div class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
          <div class="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">{{ t('todays_departures') }}</h2>
            <span class="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-bold text-warning">
              {{ todaysDepartures.length }} Tamu
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra table-compact w-full text-sm">
              <thead>
                <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                  <th class="font-medium">{{ t('guest') }}</th>
                  <th class="font-medium">{{ t('room') }}</th>
                  <th class="font-medium">{{ t('check_out') }}</th>
                  <th class="font-medium">Total Tagihan</th>
                  <th class="font-medium">{{ t('status') }}</th>
                  <th class="font-medium text-right">{{ t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in todaysDepartures" :key="row.id" class="hover:bg-surface-hover transition-colors">
                  <td>
                    <div class="flex items-center gap-3">
                      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">
                        {{ row.guest?.initials }}
                      </span>
                      <div class="min-w-0">
                        <p class="truncate text-sm font-bold text-text-primary">{{ row.guest?.fullName }}</p>
                        <p class="truncate text-xs text-text-muted">{{ row.guest?.phone }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-sm font-bold text-warning">Kamar {{ row.room?.number ?? '—' }}</p>
                    <p class="text-xs text-text-muted">{{ row.roomType }}</p>
                  </td>
                  <td class="text-xs text-text-secondary">{{ formatDate(row.checkOut) }}</td>
                  <td class="text-xs font-bold tabular text-text-primary">{{ formatRupiah(row.amount) }}</td>
                  <td><StatusBadge :status="row.status" type="reservation" /></td>
                  <td class="text-right">
                    <button class="btn btn-xs btn-outline btn-warning font-bold px-3" @click="openCheckOut(row)">
                      {{ t('check_out') }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ==================== CURRENT GUESTS ==================== -->
      <div v-show="activeTab==='guests'" role="tabpanel" class="tab-content pt-4">
        <div class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
          <div class="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">{{ t('current_guests') }}</h2>
            <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {{ currentGuests.length }} Tamu Active
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra table-compact w-full text-sm">
              <thead>
                <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
                  <th class="font-medium">{{ t('guest') }}</th>
                  <th class="font-medium">{{ t('room') }}</th>
                  <th class="font-medium">Durasi Menginap</th>
                  <th class="font-medium">Total Biaya</th>
                  <th class="font-medium">{{ t('status') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in currentGuests" :key="row.id" class="hover:bg-surface-hover transition-colors">
                  <td>
                    <div class="flex items-center gap-3">
                      <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {{ row.guest?.initials }}
                      </span>
                      <div class="min-w-0">
                        <p class="truncate text-sm font-bold text-text-primary">{{ row.guest?.fullName }}</p>
                        <p class="truncate text-xs text-text-muted">{{ row.guest?.phone }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-sm font-bold text-primary">Kamar {{ row.room?.number ?? '—' }}</p>
                    <p class="text-xs text-text-muted">{{ row.roomType }}</p>
                  </td>
                  <td class="text-xs text-text-secondary">
                    {{ formatDate(row.checkIn) }} — {{ formatDate(row.checkOut) }}
                  </td>
                  <td class="text-xs font-bold tabular text-text-primary">{{ formatRupiah(row.amount) }}</td>
                  <td><StatusBadge :status="row.status" type="reservation" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== INSTANT WALK-IN BOOKING MODAL (Cepat In-Place) ==================== -->
    <dialog ref="quickBookModalRef" class="modal">
      <div class="modal-box bg-surface border border-border max-w-lg rounded-xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 class="text-base font-bold text-primary">Reservasi Cepat (Walk-in / Telepon)</h3>
            <p class="text-xs text-text-muted">Input booking cepat dalam bawah 10 detik</p>
          </div>
          <span class="rounded bg-success/10 px-2 py-0.5 text-xs font-bold text-success border border-success/30">
            Kamar {{ quickBookForm.roomNumber }}
          </span>
        </div>

        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Pilih Nomor Kamar *</label>
              <select v-model="quickBookForm.roomNumber" class="select select-bordered select-sm w-full text-xs font-bold" @change="onQuickRoomChange">
                <option v-for="r in availableRoomsList" :key="r.number" :value="r.number">
                  Kamar {{ r.number }} ({{ r.type }})
                </option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Durasi Menginap</label>
              <select v-model="quickBookForm.nights" class="select select-bordered select-sm w-full text-xs font-bold">
                <option :value="1">1 Malam</option>
                <option :value="2">2 Malam</option>
                <option :value="3">3 Malam</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Nama Lengkap Tamu *</label>
              <input
                v-model="quickBookForm.guestName"
                placeholder="Contoh: Budi Santoso"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">No. HP / WhatsApp *</label>
              <input
                v-model="quickBookForm.guestPhone"
                placeholder="081234567890"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Metode Bayar</label>
              <select v-model="quickBookForm.paymentMethod" class="select select-bordered select-sm w-full text-xs">
                <option value="cash">Tunai / Cash</option>
                <option value="qris">QRIS Instant</option>
                <option value="transfer">Transfer Bank</option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Uang Muka / DP (Rp)</label>
              <input
                type="number"
                v-model="quickBookForm.deposit"
                placeholder="0"
                class="input input-bordered input-sm w-full text-xs font-bold"
              />
            </div>
          </div>

          <div class="rounded-lg bg-surface-hover p-3 flex justify-between items-center text-xs border border-border-light">
            <span class="text-text-secondary">Total Tagihan ({{ quickBookForm.nights }} Malam):</span>
            <span class="font-bold text-primary text-sm">{{ formatRupiah(quickBookForm.rate * quickBookForm.nights) }}</span>
          </div>
        </div>

        <div class="flex gap-2 pt-2 border-t border-border">
          <button class="btn btn-ghost btn-sm flex-1 text-xs" @click="closeQuickBookModal">Batal</button>
          <button
            class="btn btn-primary btn-sm flex-1 text-xs font-bold text-white shadow"
            :disabled="!quickBookForm.guestName || !quickBookForm.guestPhone"
            @click="submitQuickBook"
          >
            SIMPAN & CHECK IN
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button @click="closeQuickBookModal">close</button></form>
    </dialog>

    <!-- ==================== CHECK-IN MODAL ==================== -->
    <Modal v-model:visible="checkInVisible" header="Konfirmasi Check-In Tamu">
      <div v-if="selected" class="space-y-4">
        <div class="flex items-center gap-3 rounded-lg border border-border p-3 bg-surface-hover">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {{ selected.guest?.initials }}
          </span>
          <div>
            <p class="text-sm font-bold text-text-primary">{{ selected.guest?.fullName }}</p>
            <p class="text-xs text-text-muted">WhatsApp: {{ selected.guest?.phone }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 rounded-lg border border-border p-3 text-xs">
          <div>
            <p class="text-text-muted">Nomor Kamar</p>
            <p class="font-bold text-primary text-sm">Kamar {{ selected.room?.number ?? '—' }}</p>
          </div>
          <div>
            <p class="text-text-muted">Tipe Kamar</p>
            <p class="font-bold text-text-primary">{{ selected.roomType }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input id="id-verify" type="checkbox" v-model="idVerified" class="checkbox checkbox-sm rounded" />
          <label for="id-verify" class="text-xs font-medium text-text-primary">Identitas tamu telah diverifikasi (KTP/KTA)</label>
        </div>

        <!-- RFID Card Key Pairing Section (UX Step 3 & 4) -->
        <div class="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 text-xs font-bold text-primary">
              <Icon name="credit-card" :size="14" />
              <span>Pairing Kartu Akses RFID</span>
            </div>
            <span v-if="pairedRfidCard" class="text-[10px] font-bold text-success bg-success/20 px-2 py-0.5 rounded">
              TERHUBUNG: {{ pairedRfidCard.uid }}
            </span>
          </div>
          <p class="text-[11px] text-text-muted">
            Resepsionis menempelkan kartu fisik pada scanner, lalu menyerahkan kartu ke tamu untuk akses kamar & login.
          </p>
          <button class="btn btn-outline btn-primary btn-xs w-full font-bold" @click="openRfidPairingModal">
            {{ pairedRfidCard ? 'Ganti / Re-Scan Kartu RFID' : '[ 💳 TAP SCAN KARTU RFID SEKARANG ]' }}
          </button>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="checkInVisible = false">Batal</button>
        <button class="btn btn-success btn-sm text-white font-bold" :disabled="!idVerified || !pairedRfidCard" @click="completeCheckIn">
          SELESAIKAN CHECK-IN & SERAHKAN KARTU
        </button>
      </template>
    </Modal>

    <!-- ==================== CHECK-OUT MODAL ==================== -->
    <Modal v-model:visible="checkOutVisible" header="Konfirmasi Check-Out Kamar">
      <div v-if="selected" class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border p-3">
            <p class="text-xs text-text-muted">Tamu Menginap</p>
            <p class="text-sm font-bold text-text-primary">{{ selected.guest?.fullName }}</p>
          </div>
          <div class="rounded-lg border border-border p-3">
            <p class="text-xs text-text-muted">Nomor Kamar</p>
            <p class="text-sm font-bold text-warning">Kamar {{ selected.room?.number ?? '—' }}</p>
          </div>
        </div>

        <div class="rounded-lg border border-border p-3 text-xs space-y-1.5">
          <div class="flex justify-between text-text-secondary">
            <span>Total Biaya Menginap:</span>
            <span class="font-bold text-text-primary">{{ formatRupiah(selected.amount) }}</span>
          </div>
          <div class="flex justify-between text-text-secondary border-t border-border-light pt-1">
            <span>Status Pembayaran:</span>
            <StatusBadge :status="selected.paymentStatus" type="payment" />
          </div>
        </div>

        <!-- RFID Card Unlink Section -->
        <div class="rounded-lg border border-warning/30 bg-warning/5 p-3 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-warning">
            <span>Pengembalian & Deautorisasi Kartu RFID</span>
            <span class="text-[10px] bg-warning/20 px-2 py-0.5 rounded text-warning">TAP TO RETURN</span>
          </div>
          <p class="text-[11px] text-text-muted">
            Tamu menyerahkan kartu RFID ➔ Resepsionis menempelkan kartu ➔ Otomatis melepas akses & mengirim kamar ke antrean Housekeeping.
          </p>
          <button class="btn btn-outline btn-warning btn-xs w-full font-bold" @click="openRfidReturnModal">
            [ 💳 TAP UNLINK KARTU RFID ]
          </button>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="checkOutVisible = false">Batal</button>
        <button class="btn btn-warning btn-sm font-bold" @click="completeCheckOut">PROSES CHECK-OUT & RELEASE KARTU</button>
      </template>
    </Modal>

    <!-- RFID Scanner Component Modal -->
    <RfidScannerModal
      v-model:visible="rfidModalVisible"
      :mode="rfidMode"
      :room-number="selected?.room?.number || '101'"
      :guest-name="selected?.guest?.fullName || 'Tamu'"
      @cardPaired="onCardPaired"
      @cardRead="onCardRead"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useToast } from '~/composables/useToast'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah, formatDate } from '~/utils/format'
import { mockReservations } from '~/mock/reservations'
import { mockGuests } from '~/mock/guests'
import { mockRooms } from '~/mock/rooms'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import Modal from '~/components/ui/Modal.vue'
import RfidScannerModal from '~/components/ui/RfidScannerModal.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const toast = useToast()

const activeTab = ref('arrivals')

// Live Rooms Grid State
const liveRoomsGrid = ref([
  { number: '101', type: 'Standard', status: 'available', rate: 350000, guest: '' },
  { number: '102', type: 'Standard', status: 'occupied', rate: 350000, guest: 'Budi Santoso' },
  { number: '103', type: 'Deluxe', status: 'dirty', rate: 550000, guest: '' },
  { number: '104', type: 'Deluxe', status: 'dirty', rate: 550000, guest: '' },
  { number: '105', type: 'Deluxe', status: 'maintenance', rate: 550000, guest: '' },
  { number: '106', type: 'Deluxe', status: 'available', rate: 550000, guest: '' },
  { number: '107', type: 'Deluxe', status: 'occupied', rate: 550000, guest: 'Sarah Lee' },
  { number: '108', type: 'Family', status: 'occupied', rate: 850000, guest: 'Yuki Tanaka' },
  { number: '201', type: 'Standard', status: 'dirty', rate: 350000, guest: '' },
  { number: '202', type: 'Standard', status: 'occupied', rate: 350000, guest: 'Andi Pratama' },
  { number: '203', type: 'Standard', status: 'available', rate: 350000, guest: '' },
  { number: '204', type: 'Deluxe', status: 'dirty', rate: 550000, guest: '' },
  { number: '205', type: 'Deluxe', status: 'occupied', rate: 550000, guest: 'Hartono' },
  { number: '206', type: 'Deluxe', status: 'occupied', rate: 550000, guest: 'James' },
  { number: '207', type: 'Family', status: 'available', rate: 850000, guest: '' },
  { number: '208', type: 'Family', status: 'available', rate: 850000, guest: '' }
])

const availableRoomsList = computed(() =>
  liveRoomsGrid.value.filter(r => r.status === 'available')
)

function roomStatusClass(status: string) {
  const map: Record<string, string> = {
    available: 'bg-success/10 border-success/40 text-success font-bold hover:bg-success/20',
    occupied: 'bg-info/10 border-info/40 text-info font-bold',
    dirty: 'bg-warning/10 border-warning/40 text-warning font-bold',
    maintenance: 'bg-danger/10 border-danger/40 text-danger font-bold'
  }
  return map[status] || 'bg-surface-hover border-border text-text-muted'
}

function roomStatusDot(status: string) {
  const map: Record<string, string> = {
    available: 'bg-success',
    occupied: 'bg-info',
    dirty: 'bg-warning',
    maintenance: 'bg-danger'
  }
  return map[status] || 'bg-text-muted'
}

// Quick Booking Modal Handler
const quickBookModalRef = ref<HTMLDialogElement | null>(null)
const quickBookForm = reactive({
  roomNumber: '101',
  rate: 350000,
  nights: 1,
  guestName: '',
  guestPhone: '',
  paymentMethod: 'cash',
  deposit: 0
})

function onRoomTileClick(rm: any) {
  if (rm.status === 'available') {
    openQuickBookModal(rm.number)
  } else {
    toast.add({
      severity: 'info',
      summary: `Kamar ${rm.number}`,
      detail: `Status: ${rm.status.toUpperCase()} ${rm.guest ? '— Guest: ' + rm.guest : ''}`,
      life: 2500
    })
  }
}

function openQuickBookModal(targetRoomNumber: string | null) {
  const room = targetRoomNumber
    ? liveRoomsGrid.value.find(r => r.number === targetRoomNumber)
    : availableRoomsList.value[0]

  if (room) {
    quickBookForm.roomNumber = room.number
    quickBookForm.rate = room.rate
  }
  quickBookForm.guestName = ''
  quickBookForm.guestPhone = ''
  quickBookModalRef.value?.showModal()
}

function closeQuickBookModal() {
  quickBookModalRef.value?.close()
}

function onQuickRoomChange() {
  const room = liveRoomsGrid.value.find(r => r.number === quickBookForm.roomNumber)
  if (room) {
    quickBookForm.rate = room.rate
  }
}

function submitQuickBook() {
  const room = liveRoomsGrid.value.find(r => r.number === quickBookForm.roomNumber)
  if (room) {
    room.status = 'occupied'
    room.guest = quickBookForm.guestName
  }

  toast.add({
    severity: 'success',
    summary: 'Reservasi Instan Berhasil',
    detail: `Kamar ${quickBookForm.roomNumber} atas nama ${quickBookForm.guestName} berhasil di-check in.`,
    life: 3000
  })

  closeQuickBookModal()
}

// ----- Enrich reservations with guest + room lookups -----
const enriched = computed(() =>
  mockReservations.map((r) => ({
    ...r,
    guest: mockGuests.find((g) => g.id === r.guestId),
    room: mockRooms.find((rm) => rm.id === r.roomId),
  }))
)

const todayStr = new Date().toISOString().slice(0, 10)

const todaysArrivals = computed(() =>
  enriched.value.filter(
    (r) =>
      r.checkIn === todayStr &&
      (r.status === 'confirmed' || r.status === 'checked_in')
  )
)

const todaysDepartures = computed(() =>
  enriched.value.filter(
    (r) =>
      r.checkOut === todayStr &&
      (r.status === 'checked_in' || r.status === 'checked_out')
  )
)

const currentGuests = computed(() =>
  enriched.value.filter((r) => r.status === 'checked_in')
)

// ----- RFID Hardware Pairing & Scan Integration -----
const rfidModalVisible = ref(false)
const rfidMode = ref<'pair' | 'read'>('pair')
const pairedRfidCard = ref<any>(null)

function openRfidPairingModal() {
  rfidMode.value = 'pair'
  rfidModalVisible.value = true
}

function openRfidReturnModal() {
  rfidMode.value = 'read'
  rfidModalVisible.value = true
}

function onCardPaired(cardData: any) {
  pairedRfidCard.value = cardData
  toast.add({
    severity: 'success',
    summary: 'Kartu RFID Terhubung!',
    detail: `Kartu ${cardData.uid} berhasil di-pairing dengan Kamar ${cardData.roomNumber}.`,
    life: 3000
  })
}

function onCardRead(cardData: any) {
  pairedRfidCard.value = null
  toast.add({
    severity: 'info',
    summary: 'Kartu RFID Dikembalikan & De-Authorized',
    detail: `Akses kartu ${cardData.uid} dicabut & kamar ${cardData.roomNumber} siap dibersihkan.`,
    life: 3000
  })
}

// ----- Check-in modal -----
const checkInVisible = ref(false)
const selected = ref<(typeof enriched.value)[number] | null>(null)
const idVerified = ref(false)

function openCheckIn(r: (typeof enriched.value)[number]) {
  selected.value = r
  idVerified.value = false
  pairedRfidCard.value = null
  checkInVisible.value = true
}

function completeCheckIn() {
  checkInVisible.value = false
  toast.add({
    severity: 'success',
    summary: 'Check-In & Serah Kartu Berhasil!',
    detail: `Tamu ${selected.value?.guest?.fullName} menerima Kartu RFID ${pairedRfidCard.value?.uid || ''} untuk Kamar ${selected.value?.room?.number}.`,
    life: 4000,
  })
  selected.value = null
}

// ----- Check-out modal -----
const checkOutVisible = ref(false)

function openCheckOut(r: (typeof enriched.value)[number]) {
  selected.value = r
  checkOutVisible.value = true
}

function completeCheckOut() {
  checkOutVisible.value = false
  toast.add({
    severity: 'success',
    summary: 'Check-Out & Unlink RFID Berhasil',
    detail: `Kamar ${selected.value?.room?.number} telah di-checkout, kartu RFID di-unlink, & masuk ke antrean Housekeeping.`,
    life: 4000,
  })
  selected.value = null
}
</script>
