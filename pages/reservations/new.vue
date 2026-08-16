<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-text-primary">
          Form Reservasi Baru
        </h1>
        <p class="text-xs sm:text-sm text-text-secondary">
          Input pemesanan kamar instan untuk tamu walk-in / telepon (Hotel Merintis)
        </p>
      </div>
      <button class="btn btn-ghost btn-sm text-xs" @click="router.push('/reservations')">
        &larr; Kembali ke Daftar Reservasi
      </button>
    </div>

    <!-- Main Simple 2-Column Grid (No 5-Step Wizard Friction) -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">

      <!-- KOLOM KIRI (7 Cols): Durasi Menginap, Kamar & Data Tamu -->
      <div class="lg:col-span-7 space-y-5">

        <!-- Card 1: Tanggal Menginap & Pilih Kamar -->
        <div class="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
          <div class="flex items-center gap-2 border-b border-border pb-2.5">
            <Icon name="calendar" :size="16" class="text-primary" />
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">1. Tanggal & Pilihan Kamar</h2>
          </div>

          <!-- Input Tanggal -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Tanggal Check-in *</label>
              <input
                type="date"
                v-model="form.stay.checkIn"
                class="input input-bordered input-sm w-full text-xs font-medium"
                @change="calculateNights"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Tanggal Check-out *</label>
              <input
                type="date"
                v-model="form.stay.checkOut"
                class="input input-bordered input-sm w-full text-xs font-medium"
                @change="calculateNights"
              />
            </div>
          </div>

          <div v-if="form.stay.nights > 0" class="rounded-lg bg-surface-hover p-2.5 flex items-center justify-between text-xs border border-border-light">
            <span class="text-text-secondary font-medium">Durasi Menginap:</span>
            <span class="font-bold text-primary">{{ form.stay.nights }} Malam</span>
          </div>

          <!-- Pilihan Jenis Kamar (Sederhana untuk Hotel Merintis) -->
          <div class="space-y-3 pt-2">
            <label class="block text-xs font-semibold text-text-secondary">Pilih Tipe Kamar *</label>

            <div class="grid grid-cols-1 gap-2.5">
              <div
                v-for="rt in simpleRoomTypes"
                :key="rt.id"
                :class="[
                  'p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between',
                  form.room.typeId === rt.id ? 'border-primary bg-primary-light/30 shadow-sm' : 'border-border bg-surface hover:border-primary/40'
                ]"
                @click="selectRoomType(rt)"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-text-primary">{{ rt.name }}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded bg-surface-hover text-text-muted border border-border">Kap: {{ rt.capacity }} Orang</span>
                  </div>
                  <p class="text-[11px] text-text-muted mt-0.5">{{ rt.description }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs font-bold text-primary">{{ formatRupiah(rt.baseRate) }}</p>
                  <p class="text-[10px] text-text-muted">/ malam</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pilih Nomor Kamar Spesifik -->
          <div v-if="form.room.typeId" class="pt-2">
            <label class="mb-1 block text-xs font-semibold text-text-secondary">Pilih Nomor Kamar (Siap Huni) *</label>
            <select v-model="form.room.number" class="select select-bordered select-sm w-full text-xs">
              <option :value="null" disabled>-- Pilih Kamar Kosong --</option>
              <option v-for="r in availableRooms" :key="r.value" :value="r.value">
                Kamar {{ r.value }} (Lantai {{ r.floor }})
              </option>
            </select>
          </div>
        </div>

        <!-- Card 2: Data Tamu (Tanpa Wajib Email) -->
        <div class="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
          <div class="flex items-center gap-2 border-b border-border pb-2.5">
            <Icon name="user" :size="16" class="text-primary" />
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">2. Data Tamu Pemesan</h2>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Nama Lengkap Tamu *</label>
              <input
                v-model="form.guest.fullName"
                placeholder="Contoh: Budi Santoso"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>

            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">No. HP / WhatsApp *</label>
              <input
                v-model="form.guest.phone"
                placeholder="Contoh: 081234567890"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>

            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Kota / Alamat Asal</label>
              <input
                v-model="form.guest.city"
                placeholder="Contoh: Jakarta / Surabaya"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>

            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">No. NIK / KTP (Opsional)</label>
              <input
                v-model="form.guest.idNumber"
                placeholder="No. Identitas KTP"
                class="input input-bordered input-sm w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-text-secondary">Catatan / Permintaan Khusus</label>
            <textarea
              v-model="form.guest.notes"
              rows="2"
              placeholder="Misal: Minta kamar bebas asap rokok, check-in agak malam..."
              class="textarea textarea-bordered textarea-sm w-full text-xs"
            />
          </div>
        </div>

      </div>


      <!-- KOLOM KANAN (5 Cols): Ringkasan Pembayaran & Eksekusi -->
      <div class="lg:col-span-5 space-y-5">
        <div class="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4 sticky top-6">
          <div class="flex items-center gap-2 border-b border-border pb-2.5">
            <Icon name="credit-card" :size="16" class="text-primary" />
            <h2 class="text-sm font-bold text-text-primary uppercase tracking-wide">3. Pembayaran & Rincian</h2>
          </div>

          <!-- Rincian Biaya -->
          <div class="space-y-2 text-xs">
            <div class="flex justify-between text-text-secondary">
              <span>Tipe Kamar:</span>
              <span class="font-bold text-text-primary">{{ selectedRoomType?.name || '-' }}</span>
            </div>
            <div class="flex justify-between text-text-secondary">
              <span>No. Kamar:</span>
              <span class="font-bold text-primary">{{ form.room.number ? 'Kamar ' + form.room.number : '-' }}</span>
            </div>
            <div class="flex justify-between text-text-secondary">
              <span>Tarif per Malam:</span>
              <span class="tabular font-medium text-text-primary">{{ formatRupiah(form.room.rate) }}</span>
            </div>
            <div class="flex justify-between text-text-secondary">
              <span>Durasi Menginap:</span>
              <span class="font-bold text-text-primary">{{ form.stay.nights }} Malam</span>
            </div>

            <div class="border-t border-border pt-2 flex justify-between text-sm font-bold text-text-primary">
              <span>Total Tagihan:</span>
              <span class="tabular text-primary">{{ formatRupiah(totalAmount) }}</span>
            </div>
          </div>

          <!-- Metode Pembayaran -->
          <div class="space-y-3 border-t border-border pt-3">
            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Metode Pembayaran *</label>
              <select v-model="form.payment.method" class="select select-bordered select-sm w-full text-xs">
                <option value="cash">Tunai / Cash (Bayar di Tempat)</option>
                <option value="transfer">Transfer Bank (BCA / Mandiri)</option>
                <option value="qris">QRIS Instant</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-xs font-semibold text-text-secondary">Uang Muka / DP (Rp)</label>
              <input
                type="number"
                v-model="form.payment.deposit"
                placeholder="0"
                class="input input-bordered input-sm w-full text-xs font-bold"
              />
            </div>

            <div class="rounded-lg bg-surface-hover p-3 space-y-1.5 text-xs border border-border-light">
              <div class="flex justify-between text-text-secondary">
                <span>Uang Muka Diterima:</span>
                <span class="font-semibold text-success">{{ formatRupiah(form.payment.deposit || 0) }}</span>
              </div>
              <div class="flex justify-between font-bold text-text-primary border-t border-border-light pt-1">
                <span>Sisa Pelunasan saat Check-in:</span>
                <span class="tabular text-warning">{{ formatRupiah(remainingBalance) }}</span>
              </div>
            </div>
          </div>

          <!-- Tombol Eksekusi Instan -->
          <button
            class="btn btn-primary w-full py-2.5 text-xs font-bold text-white shadow transition-all hover:scale-[1.01]"
            :disabled="!isFormValid"
            @click="saveReservation"
          >
            <Icon name="check" :size="16" /> SIMPAN RESERVASI KAMAR
          </button>

          <p class="text-[10px] text-text-muted text-center">
            Status reservasi langsung aktif & memblokir nomor kamar pilihan Anda.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '~/composables/useToast'
import { formatRupiah, nightsBetween } from '~/utils/format'
import Icon from '~/components/ui/Icon.vue'

const router = useRouter()
const toast = useToast()

// Tipe Kamar Sederhana & Praktis untuk Hotel Perintis
const simpleRoomTypes = [
  {
    id: 1,
    name: "Standard Room",
    description: "Kamar nyaman dengan kasur Queen Bed, AC, & WiFi gratis",
    baseRate: 350000,
    capacity: 2
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Kamar luas dengan kasur King Bed, TV LED, & kamar mandi dalam",
    baseRate: 550000,
    capacity: 2
  },
  {
    id: 3,
    name: "Family Room",
    description: "Kamar keluarga kapasitas 4 orang dengan 2 kasur Queen Bed",
    baseRate: 850000,
    capacity: 4
  }
]

// Data Kamar Siap Huni
const mockAvailableRooms = [
  { number: '101', typeId: 1, floor: 1 },
  { number: '102', typeId: 1, floor: 1 },
  { number: '103', typeId: 1, floor: 1 },
  { number: '201', typeId: 2, floor: 2 },
  { number: '202', typeId: 2, floor: 2 },
  { number: '301', typeId: 3, floor: 3 }
]

// Form State Sederhana (Tanpa Wajib Email)
const form = reactive({
  guest: {
    fullName: '',
    phone: '',
    city: '',
    idNumber: '',
    notes: ''
  },
  room: {
    typeId: 1,
    number: '101',
    rate: 350000
  },
  stay: {
    checkIn: '',
    checkOut: '',
    nights: 1
  },
  payment: {
    method: 'cash',
    deposit: 0
  }
})

// Set Tanggal Default Hari Ini & Besok
onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  form.stay.checkIn = today.toISOString().split('T')[0]
  form.stay.checkOut = tomorrow.toISOString().split('T')[0]
  calculateNights()
})

const selectedRoomType = computed(() =>
  simpleRoomTypes.find(rt => rt.id === form.room.typeId)
)

const availableRooms = computed(() => {
  if (!form.room.typeId) return []
  return mockAvailableRooms
    .filter(r => r.typeId === form.room.typeId)
    .map(r => ({ value: r.number, floor: r.floor }))
})

const totalAmount = computed(() => (form.stay.nights || 1) * (form.room.rate || 0))
const remainingBalance = computed(() => Math.max(0, totalAmount.value - (form.payment.deposit || 0)))

const isFormValid = computed(() => {
  return form.guest.fullName.trim() !== '' &&
         form.guest.phone.trim() !== '' &&
         form.room.typeId !== null &&
         form.room.number !== null &&
         form.stay.nights > 0
})

function selectRoomType(rt) {
  form.room.typeId = rt.id
  form.room.rate = rt.baseRate
  const rooms = availableRooms.value
  if (rooms.length > 0) {
    form.room.number = rooms[0].value
  } else {
    form.room.number = null
  }
}

function calculateNights() {
  if (form.stay.checkIn && form.stay.checkOut) {
    const n = nightsBetween(form.stay.checkIn, form.stay.checkOut)
    form.stay.nights = n > 0 ? n : 1
  } else {
    form.stay.nights = 1
  }
}

function saveReservation() {
  toast.add({
    severity: 'success',
    summary: 'Reservasi Berhasil Disimpan',
    detail: `Kamar ${form.room.number} atas nama ${form.guest.fullName} berhasil dipesan.`,
    life: 3000
  })
  setTimeout(() => {
    router.push('/reservations')
  }, 1000)
}
</script>
