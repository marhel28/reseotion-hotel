<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-text-primary">
          Analitik Pendapatan & Performa Keuangan
        </h1>
        <p class="text-xs sm:text-sm text-text-secondary">
          Laporan tren pendapatan, imbal hasil per kamar, & pemetaaan channel pemesanan
        </p>
      </div>
      <div class="flex items-center gap-2">
        <span class="rounded bg-surface-hover px-3 py-1.5 text-xs font-semibold text-text-muted border border-border">
          Periode: Sep 2025 – Aug 2026 (12 Bulan)
        </span>
      </div>
    </div>

    <!-- 4 Core Executive Metric Cards -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">Total Revenue (Gross)</p>
        <p class="text-xl font-bold tabular text-primary mt-1">Rp 850M</p>
        <span class="text-[10px] font-semibold text-success">▲ +12.4% vs tahun lalu</span>
      </div>

      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">ADR (Avg Daily Rate)</p>
        <p class="text-xl font-bold tabular text-accent-dark mt-1">Rp 1.245M</p>
        <span class="text-[10px] font-semibold text-success">▲ +5.2% imbal hasil</span>
      </div>

      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">RevPAR (Rev / Available Room)</p>
        <p class="text-xl font-bold tabular text-primary mt-1">Rp 1.025M</p>
        <span class="text-[10px] font-semibold text-success">▲ +8.1% efisiensi</span>
      </div>

      <div class="rounded-lg border border-border bg-surface p-4">
        <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">Occupancy Average</p>
        <p class="text-xl font-bold tabular text-info mt-1">82.4%</p>
        <span class="text-[10px] font-semibold text-success">▲ +4.8% vs target</span>
      </div>
    </div>

    <!-- CHART #1: Revenue Trend (Line / Area Chart with Subtle Fill) -->
    <div class="rounded-lg border border-border bg-surface p-5">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-3 mb-4">
        <div>
          <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Tren Pendapatan Bulanan (Revenue Trend)</h2>
          <p class="text-[11px] text-text-muted">Pergerakan pendapatan total vs pembagian kategori (Sep 2025 - Aug 2026)</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="join border border-border rounded-md bg-surface p-0.5">
            <button
              :class="['btn btn-xs join-item font-semibold', revenueTrendView === 'total' ? 'btn-primary' : 'btn-ghost']"
              @click="revenueTrendView = 'total'"
            >
              Total Revenue
            </button>
            <button
              :class="['btn btn-xs join-item font-semibold', revenueTrendView === 'category' ? 'btn-primary' : 'btn-ghost']"
              @click="revenueTrendView = 'category'"
            >
              Per Kategori
            </button>
          </div>
          <div v-if="revenueTrendView === 'category'" class="hidden sm:flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded bg-primary" /> Kamar</span>
            <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded bg-accent" /> F&B</span>
            <span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded bg-info" /> Lainnya</span>
          </div>
        </div>
      </div>

      <!-- Lightweight Line/Area Chart View -->
      <div class="relative h-56 w-full pt-2">
        <!-- Horizontal Guide Lines (Only 3 subtle lines) -->
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-text-muted/60">
          <div class="border-b border-border/40 pb-0.5">Rp 950M</div>
          <div class="border-b border-border/40 pb-0.5">Rp 825M</div>
          <div class="border-b border-border/40 pb-0.5">Rp 700M</div>
        </div>

        <!-- Total Revenue Smooth Line/Area SVG -->
        <svg v-if="revenueTrendView === 'total'" class="h-full w-full pt-4 pb-6" viewBox="0 0 1100 200" preserveAspectRatio="none">
          <!-- Subtle Thin Area Fill under Line -->
          <polygon points="0,200 0,140 100,120 200,130 300,50 400,110 500,95 600,105 700,80 800,90 900,60 1000,45 1100,10 1100,200" fill="rgba(30, 58, 95, 0.05)" />
          <!-- Crisp Smooth Primary Trend Line -->
          <path d="M 0 140 L 100 120 L 200 130 L 300 50 L 400 110 L 500 95 L 600 105 L 700 80 L 800 90 L 900 60 L 1000 45 L 1100 10" fill="none" stroke="#1E3A5F" stroke-width="2.5" stroke-linecap="round" />
        </svg>

        <!-- Category Breakdown Line/Area SVG -->
        <svg v-else class="h-full w-full pt-4 pb-6" viewBox="0 0 1100 200" preserveAspectRatio="none">
          <!-- Room Line -->
          <path d="M 0 150 L 100 130 L 200 140 L 300 65 L 400 120 L 500 105 L 600 115 L 700 90 L 800 100 L 900 75 L 1000 60 L 1100 25" fill="none" stroke="#1E3A5F" stroke-width="2.5" />
          <!-- F&B Line -->
          <path d="M 0 180 L 100 175 L 200 178 L 300 160 L 400 170 L 500 168 L 600 172 L 700 165 L 800 168 L 900 162 L 1000 160 L 1100 152" fill="none" stroke="#B89B5E" stroke-width="2" />
        </svg>

        <!-- Monthly X-Axis Markers -->
        <div class="absolute bottom-0 inset-x-0 flex justify-between text-[10px] font-semibold text-text-muted pt-2 border-t border-border/50">
          <span v-for="m in monthlyRevenueTrend" :key="m.month" class="hover:text-primary cursor-pointer">{{ m.month }}</span>
        </div>
      </div>
    </div>

    <!-- CHARTS #2 & #3: Horizontal Bar Charts (Sorted Descending) -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <!-- CHART #2: Revenue by Room Type (Horizontal Bars, Descending) -->
      <div class="rounded-lg border border-border bg-surface p-5 space-y-3">
        <div class="flex items-center justify-between border-b border-border pb-2.5">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Pendapatan per Tipe Kamar</h2>
            <p class="text-[10px] text-text-muted">Diurutkan dari pendapatan tertinggi ke terendah</p>
          </div>
          <span class="text-xs font-bold text-success">Total Rp 620M</span>
        </div>

        <div class="space-y-3 pt-1">
          <div v-for="rt in roomTypeRevenueDesc" :key="rt.name" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-medium text-text-primary">{{ rt.name }}</span>
              <span class="font-bold tabular text-primary">{{ rt.formatted }}</span>
            </div>
            <div class="h-2 rounded bg-surface-hover overflow-hidden flex">
              <div class="h-full rounded bg-primary transition-all duration-500" :style="{ width: `${(rt.revenue / 165000000) * 100}%` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- CHART #3: Revenue by Booking Source / Channel (Horizontal Bars, Descending) -->
      <div class="rounded-lg border border-border bg-surface p-5 space-y-3">
        <div class="flex items-center justify-between border-b border-border pb-2.5">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Pendapatan per Sumber Pemesanan (Channel)</h2>
            <p class="text-[10px] text-text-muted">Peringkat kontribusi channel OTA & Direct Booking</p>
          </div>
          <span class="text-xs font-bold text-primary">Direct 40%</span>
        </div>

        <div class="space-y-3 pt-1">
          <div v-for="bs in bookingSourceRevenueDesc" :key="bs.source" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="font-medium text-text-primary">{{ bs.source }}</span>
              <span class="font-bold tabular text-accent-dark">{{ bs.formatted }}</span>
            </div>
            <div class="h-2 rounded bg-surface-hover overflow-hidden flex">
              <div class="h-full rounded bg-accent transition-all duration-500" :style="{ width: `${(bs.revenue / 245000000) * 100}%` }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CHART #4 & #5: Daily Performance (Column Chart with Metric Switcher) & Occupancy Trend Curve -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <!-- CHART #4: Daily Performance (8 Cols with Tab Toggle for Revenue/Occupancy/ADR) -->
      <div class="lg:col-span-8 rounded-lg border border-border bg-surface p-5 flex flex-col justify-between">
        <div>
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-3 mb-4">
            <div>
              <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Performa Harian (Daily Performance)</h2>
              <p class="text-[10px] text-text-muted">Perbandingan harian untuk 7 hari terakhir</p>
            </div>
            <div class="join border border-border rounded-md bg-surface p-0.5">
              <button
                :class="['btn btn-xs join-item font-semibold', dailyMetricTab === 'revenue' ? 'btn-primary' : 'btn-ghost']"
                @click="dailyMetricTab = 'revenue'"
              >
                Revenue
              </button>
              <button
                :class="['btn btn-xs join-item font-semibold', dailyMetricTab === 'occupancy' ? 'btn-primary' : 'btn-ghost']"
                @click="dailyMetricTab = 'occupancy'"
              >
                Occupancy
              </button>
              <button
                :class="['btn btn-xs join-item font-semibold', dailyMetricTab === 'adr' ? 'btn-primary' : 'btn-ghost']"
                @click="dailyMetricTab = 'adr'"
              >
                ADR
              </button>
            </div>
          </div>

          <!-- Dynamic Column Chart -->
          <div class="h-44 flex items-end gap-3 pt-4">
            <div
              v-for="item in dailyPerformanceData"
              :key="item.day"
              class="group relative flex-1 flex flex-col items-center h-full justify-end"
            >
              <!-- Tooltip on hover -->
              <div class="absolute -top-9 z-20 hidden group-hover:flex flex-col items-center bg-primary text-white text-[10px] p-1.5 rounded shadow whitespace-nowrap">
                <span v-if="dailyMetricTab === 'revenue'">{{ formatRupiah(item.revenue) }}</span>
                <span v-else-if="dailyMetricTab === 'occupancy'">{{ item.occupancy }}% Occupancy</span>
                <span v-else>{{ formatRupiah(item.adr) }} ADR</span>
              </div>

              <!-- Column bar -->
              <div class="w-full max-w-[36px] rounded-t overflow-hidden transition-all duration-300">
                <div
                  v-if="dailyMetricTab === 'revenue'"
                  class="w-full bg-primary transition-all group-hover:brightness-110"
                  :style="{ height: `${(item.revenue / 60000000) * 120}px` }"
                />
                <div
                  v-else-if="dailyMetricTab === 'occupancy'"
                  class="w-full bg-info transition-all group-hover:brightness-110"
                  :style="{ height: `${(item.occupancy / 100) * 120}px` }"
                />
                <div
                  v-else
                  class="w-full bg-accent transition-all group-hover:brightness-110"
                  :style="{ height: `${(item.adr / 1500000) * 120}px` }"
                />
              </div>
              <span class="mt-2 text-[10px] font-semibold text-text-muted">{{ item.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CHART #5: Occupancy Trend Mini Sparkline (4 Cols) -->
      <div class="lg:col-span-4 rounded-lg border border-border bg-surface p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-border pb-3 mb-3">
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Tren Okupansi</h2>
            <span class="text-xs font-bold text-info">Rata-rata 82.4%</span>
          </div>
          <p class="text-[11px] text-text-muted mb-2">Konsistensi pengisian kamar sepanjang minggu</p>
          <div class="relative h-32 w-full pt-1">
            <svg class="h-full w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <polygon points="0,90 0,45 50,38 100,42 150,28 200,18 250,12 300,22 300,90" fill="rgba(37, 99, 235, 0.06)" />
              <path d="M 0 45 Q 25 40 50 38 T 100 42 T 150 28 T 200 18 T 250 12 T 300 22" fill="none" stroke="#2563EB" stroke-width="2.5" />
            </svg>
          </div>
        </div>

        <div class="flex justify-between text-[10px] text-text-muted border-t border-border pt-2">
          <span>Minggu 1</span><span>Minggu 2</span><span>Minggu 3</span><span>Minggu 4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'

const { t } = useI18n()

// ----- REVENUE ANALYTICS DATA -----
const revenueTrendView = ref('total') // 'total' | 'category'

const monthlyRevenueTrend = [
  { month: 'Sep', total: 720000000, room: 480000000, fb: 180000000, other: 60000000 },
  { month: 'Okt', total: 760000000, room: 510000000, fb: 190000000, other: 60000000 },
  { month: 'Nov', total: 740000000, room: 490000000, fb: 185000000, other: 65000000 },
  { month: 'Des', total: 890000000, room: 610000000, fb: 215000000, other: 65000000 },
  { month: 'Jan', total: 780000000, room: 520000000, fb: 195000000, other: 65000000 },
  { month: 'Feb', total: 810000000, room: 540000000, fb: 200000000, other: 70000000 },
  { month: 'Mar', total: 790000000, room: 530000000, fb: 190000000, other: 70000000 },
  { month: 'Apr', total: 830000000, room: 560000000, fb: 205000000, other: 65000000 },
  { month: 'Mei', total: 815000000, room: 545000000, fb: 200000000, other: 70000000 },
  { month: 'Jun', total: 860000000, room: 580000000, fb: 210000000, other: 70000000 },
  { month: 'Jul', total: 885000000, room: 595000000, fb: 215000000, other: 75000000 },
  { month: 'Agu', total: 950000000, room: 640000000, fb: 230000000, other: 80000000 },
]

// Revenue by Room Type (Sorted Descending)
const roomTypeRevenueDesc = [
  { name: 'Deluxe Room', revenue: 165000000, formatted: 'Rp 165M', percent: 32 },
  { name: 'Executive Suite', revenue: 145000000, formatted: 'Rp 145M', percent: 28 },
  { name: 'Superior Room', revenue: 125000000, formatted: 'Rp 125M', percent: 24 },
  { name: 'Standard Room', revenue: 95000000, formatted: 'Rp 95M', percent: 18 },
  { name: 'Presidential Suite', revenue: 68000000, formatted: 'Rp 68M', percent: 13 },
  { name: 'Villa Private', revenue: 22000000, formatted: 'Rp 22M', percent: 4 },
]

// Revenue by Booking Source / Channel (Sorted Descending)
const bookingSourceRevenueDesc = [
  { source: 'Direct Booking (Website / WA)', revenue: 245000000, formatted: 'Rp 245M', percent: 40 },
  { source: 'Booking.com OTA', revenue: 165000000, formatted: 'Rp 165M', percent: 27 },
  { source: 'Travel Agents', revenue: 140000000, formatted: 'Rp 140M', percent: 23 },
  { source: 'Agoda OTA', revenue: 120000000, formatted: 'Rp 120M', percent: 20 },
  { source: 'Walk-in Guests', revenue: 95000000, formatted: 'Rp 95M', percent: 15 },
  { source: 'Expedia Group', revenue: 85000000, formatted: 'Rp 85M', percent: 14 },
]

// Daily Performance Selector (Revenue / Occupancy / ADR)
const dailyMetricTab = ref('revenue')

const dailyPerformanceData = [
  { day: '10 Aug', revenue: 38200000, occupancy: 74, adr: 1180000 },
  { day: '11 Aug', revenue: 41500000, occupancy: 78, adr: 1210000 },
  { day: '12 Aug', revenue: 39800000, occupancy: 76, adr: 1195000 },
  { day: '13 Aug', revenue: 43200000, occupancy: 82, adr: 1230000 },
  { day: '14 Aug', revenue: 46800000, occupancy: 85, adr: 1245000 },
  { day: '15 Aug', revenue: 52400000, occupancy: 91, adr: 1280000 },
  { day: '16 Aug', revenue: 48750000, occupancy: 88, adr: 1250000 },
]
</script>
