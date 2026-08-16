<template>
  <div class="space-y-6">

    <!-- Simple Executive Header -->
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-text-primary">
          Ringkasan Pendapatan & Keuntungan
        </h1>
        <p class="text-xs sm:text-sm text-text-secondary">
          Pantau uang masuk, biaya operasional, dan keuntungan bersih hotel secara sederhana
        </p>
      </div>

      <div class="flex items-center gap-2">
        <select v-model="selectedPeriod" class="select select-bordered select-sm text-xs font-semibold">
          <option value="this_month">Bulan Ini (Agustus 2026)</option>
          <option value="last_month">Bulan Lalu (Juli 2026)</option>
          <option value="ytd">Tahun Ini (2026)</option>
        </select>
        <button class="btn btn-primary btn-sm text-xs font-bold shadow-sm" @click="downloadSimpleReport">
          <Icon name="download" :size="14" /> Cetak Laporan
        </button>
      </div>
    </div>

    <!-- 3 Key High-Clarity Financial Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- 1. Total Uang Masuk -->
      <div class="rounded-lg border border-border bg-surface p-5">
        <p class="text-xs font-bold text-text-muted uppercase tracking-wide">1. Total Uang Masuk (Gross)</p>
        <p class="text-2xl font-bold text-primary mt-1">Rp 850.000.000</p>
        <p class="text-xs text-success font-semibold mt-1">▲ Naam 12.4% dari bulan lalu</p>
      </div>

      <!-- 2. Total Biaya & Komisi -->
      <div class="rounded-lg border border-border bg-surface p-5">
        <p class="text-xs font-bold text-text-muted uppercase tracking-wide">2. Biaya Operasional & Komisi</p>
        <p class="text-2xl font-bold text-warning mt-1">Rp 224.500.000</p>
        <p class="text-xs text-text-muted font-medium mt-1">Komisi OTA + Operasional Hotel</p>
      </div>

      <!-- 3. Keuntungan Bersih -->
      <div class="rounded-lg border border-border bg-surface p-5">
        <p class="text-xs font-bold text-text-muted uppercase tracking-wide">3. Keuntungan Bersih (Net Profit)</p>
        <p class="text-2xl font-bold text-success mt-1">Rp 625.500.000</p>
        <p class="text-xs text-success font-bold mt-1">✓ Profit Margin 73.5%</p>
      </div>
    </div>

    <!-- 2 Simple Columns: Dari Mana Uang Masuk vs Ke Mana Uang Keluar -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <!-- Left Column: Dari Mana Uang Masuk (Sumber Utama) -->
      <div class="rounded-lg border border-border bg-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Dari Mana Uang Masuk?</h2>
            <p class="text-[11px] text-text-muted">Sumber pendapatan bersih hotel</p>
          </div>
          <span class="text-xs font-bold text-success">Total Rp 850M</span>
        </div>

        <div class="space-y-3.5 pt-1">
          <div v-for="s in simpleRevenueSources" :key="s.name" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-semibold text-text-primary">{{ s.name }}</span>
              <span class="font-bold text-primary">{{ formatRupiah(s.amount) }}</span>
            </div>
            <div class="h-2 rounded bg-surface-hover overflow-hidden flex">
              <div class="h-full rounded bg-primary" :style="{ width: `${(s.amount / 850000000) * 100}%` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Ke Mana Uang Keluar (Biaya & Komisi) -->
      <div class="rounded-lg border border-border bg-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Ke Mana Uang Keluar?</h2>
            <p class="text-[11px] text-text-muted">Rincian pengeluaran operasional & komisi</p>
          </div>
          <span class="text-xs font-bold text-warning">Total Rp 224.5M</span>
        </div>

        <div class="space-y-3.5 pt-1">
          <div v-for="e in simpleExpenses" :key="e.name" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-semibold text-text-primary">{{ e.name }}</span>
              <span class="font-bold text-warning">{{ formatRupiah(e.amount) }}</span>
            </div>
            <div class="h-2 rounded bg-surface-hover overflow-hidden flex">
              <div class="h-full rounded bg-warning" :style="{ width: `${(e.amount / 224500000) * 100}%` }" />
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Simple Monthly Recap Table (Tabel Rekap Sederhana) -->
    <div class="rounded-lg border border-border bg-surface overflow-hidden">
      <div class="border-b border-border px-5 py-3.5 flex items-center justify-between">
        <div>
          <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Rekap Keuangan per Bulan (2026)</h2>
          <p class="text-[11px] text-text-muted">Ringkasan bulanan yang mudah dibaca</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-xs">
          <thead>
            <tr class="border-b border-border text-left text-[10px] uppercase tracking-wider text-text-muted">
              <th class="font-bold">Bulan</th>
              <th class="font-bold text-primary">Total Uang Masuk</th>
              <th class="font-bold text-warning">Total Pengeluaran</th>
              <th class="font-bold text-success">Keuntungan Bersih</th>
              <th class="font-bold text-right">Status Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in simpleMonthlyRecap" :key="m.month" class="hover:bg-surface-hover transition-colors">
              <td class="font-bold text-text-primary">{{ m.month }} 2026</td>
              <td class="font-bold text-primary">{{ formatRupiah(m.income) }}</td>
              <td class="font-semibold text-warning">- {{ formatRupiah(m.expense) }}</td>
              <td class="font-bold text-success">{{ formatRupiah(m.income - m.expense) }}</td>
              <td class="text-right">
                <span class="rounded bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success border border-success/30">
                  UNTUNG ({{ Math.round(((m.income - m.expense) / m.income) * 100) }}%)
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatRupiah } from '~/utils/format'
import Icon from '~/components/ui/Icon.vue'

const selectedPeriod = ref('this_month')

const simpleRevenueSources = [
  { name: 'Sewa Kamar (Room Sales)', amount: 640000000 },
  { name: 'Restoran & F&B Room Service', amount: 150000000 },
  { name: 'Direct Booking Website & WA', amount: 40000000 },
  { name: 'Layanan Tambahan (Laundry/Spa)', amount: 20000000 }
]

const simpleExpenses = [
  { name: 'Gaji Karyawan & Staf', amount: 110000000 },
  { name: 'Listrik, Air, & WiFi Internet', amount: 42000000 },
  { name: 'Komisi Agen OTA (Booking.com/Agoda)', amount: 42500000 },
  { name: 'Belanja Bahan Resto & Amenities', amount: 30000000 }
]

const simpleMonthlyRecap = [
  { month: 'Agustus', income: 850000000, expense: 224500000 },
  { month: 'Juli', income: 810000000, expense: 215000000 },
  { month: 'Juni', income: 780000000, expense: 210000000 },
  { month: 'Mei', income: 750000000, expense: 205000000 }
]

function downloadSimpleReport() {
  alert('Laporan Ringkasan Keuangan Sederhana berhasil diunduh.')
}
</script>
