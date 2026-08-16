<template>
  <div class="space-y-6">

    <!-- ============================================
         1. OWNER WORKSPACE DASHBOARD (Executive Blueprint)
         ============================================ -->
    <template v-if="uiStore.activeRole === 'owner'">
      <!-- Clean Executive Header -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20 uppercase tracking-wider">
              OWNER EXECUTIVE
            </span>
            <span class="text-xs text-text-muted">Grand Aurora Hotel & Resort</span>
          </div>
          <h1 class="text-lg sm:text-xl font-bold text-text-primary mt-1">
            Analitik Pendapatan & Performa Bisnis
          </h1>
          <p class="text-xs text-text-secondary">
            Ringkasan tren pendapatan, imbal hasil per kategori, & performa harian hotel
          </p>
        </div>

        <div class="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
          <button
            v-for="p in ['today', '7days', '30days', '12months']"
            :key="p"
            :class="['rounded px-2.5 py-1 text-xs font-semibold transition-colors', ownerPeriod === p ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover']"
            @click="ownerPeriod = p"
          >
            {{ p === 'today' ? 'Hari Ini' : p === '7days' ? '7D' : p === '30days' ? '30D' : '12 Bulan' }}
          </button>
        </div>
      </div>

      <!-- Owner High-Level KPI Summary (4 Core Business Metrics) -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <!-- 1. Total Revenue -->
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">Total Revenue (Gross)</p>
          <p class="text-xl font-bold tabular text-primary mt-1">Rp 850M</p>
          <span class="text-[10px] font-semibold text-success">▲ +12.4% vs tahun lalu</span>
        </div>

        <!-- 2. ADR -->
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">ADR (Avg Daily Rate)</p>
          <p class="text-xl font-bold tabular text-accent-dark mt-1">Rp 1.245M</p>
          <span class="text-[10px] font-semibold text-success">▲ +5.2% imbal hasil</span>
        </div>

        <!-- 3. RevPAR -->
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-[10px] font-bold uppercase tracking-wider text-text-muted">RevPAR (Rev / Available Room)</p>
          <p class="text-xl font-bold tabular text-primary mt-1">Rp 1.025M</p>
          <span class="text-[10px] font-semibold text-success">▲ +8.1% efisiensi</span>
        </div>

        <!-- 4. Occupancy -->
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

        <!-- Lightweight Line/Area Chart View (Subtle SVG Line Guide, No Heavy Gridlines) -->
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

      <!-- CHARTS #2 & #3: Horizontal Bar Charts (Sorted Descending for Immediate Decision-Making) -->
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
    </template>


    <!-- ============================================
         2. RECEPTIONIST WORKSPACE DASHBOARD
         ============================================ -->
    <template v-else-if="uiStore.activeRole === 'receptionist'">
      <!-- Clean Operational Header (No Gradient, Crisp Typography) -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="rounded bg-info/10 px-2 py-0.5 text-[10px] font-bold text-info border border-info/20 uppercase tracking-wider">
              FRONT DESK COMMAND CENTER
            </span>
            <span class="text-xs text-text-muted">Senin, 17 Agustus 2026</span>
          </div>
          <h1 class="text-lg sm:text-xl font-bold text-text-primary mt-1">
            Selamat pagi, {{ uiStore.currentUser.name }}
          </h1>
          <p class="text-xs text-text-secondary">
            Pusat operasional kedatangan, keberangkatan, & matriks status kamar
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary btn-sm text-xs font-bold" @click="router.push('/reservations/new')">
            <Icon name="plus" :size="14" /> + Reservasi Baru
          </button>
          <button class="btn btn-outline btn-sm text-xs font-semibold" @click="router.push('/front-desk')">
            <Icon name="log-in" :size="14" /> Check In
          </button>
          <button class="btn btn-outline btn-sm text-xs font-semibold" @click="router.push('/front-desk')">
            <Icon name="log-out" :size="14" /> Check Out
          </button>
        </div>
      </div>

      <!-- Receptionist Operational Stats Grid (Crisp 8px Cards & 70/20/10 Colors) -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div class="rounded-lg border border-border bg-surface p-4">
          <div class="flex items-center justify-between text-text-muted">
            <span class="text-[10px] font-bold uppercase tracking-wider">Kedatangan Hari Ini</span>
            <Icon name="log-in" :size="16" class="text-info" />
          </div>
          <p class="text-xl font-bold text-info mt-1">32</p>
          <span class="text-[10px] font-semibold text-text-muted">8 Sisa Kedatangan</span>
        </div>

        <div class="rounded-lg border border-border bg-surface p-4">
          <div class="flex items-center justify-between text-text-muted">
            <span class="text-[10px] font-bold uppercase tracking-wider">Keberangkatan Hari Ini</span>
            <Icon name="log-out" :size="16" class="text-warning" />
          </div>
          <p class="text-xl font-bold text-warning mt-1">27</p>
          <span class="text-[10px] font-semibold text-text-muted">11 Sisa Check-out</span>
        </div>

        <div class="rounded-lg border border-border bg-surface p-4">
          <div class="flex items-center justify-between text-text-muted">
            <span class="text-[10px] font-bold uppercase tracking-wider">Tamu Menginap</span>
            <Icon name="users" :size="16" class="text-primary" />
          </div>
          <p class="text-xl font-bold text-primary mt-1">139</p>
          <span class="text-[10px] font-semibold text-success">91 Tamu Lanjutan</span>
        </div>

        <div class="rounded-lg border border-border bg-surface p-4">
          <div class="flex items-center justify-between text-text-muted">
            <span class="text-[10px] font-bold uppercase tracking-wider">Kamar Kosong</span>
            <Icon name="check-circle" :size="16" class="text-success" />
          </div>
          <p class="text-xl font-bold text-success mt-1">41</p>
          <span class="text-[10px] font-semibold text-success">Bersih & Siap Huni</span>
        </div>
      </div>

      <!-- Visual Room Category Quick Cards -->
      <div>
        <div class="flex items-center justify-between mb-2.5">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Visual Kategori Kamar</h2>
            <p class="text-[11px] text-text-muted">Ketersediaan kamar & tarif instan untuk resepsionis</p>
          </div>
          <button class="text-xs font-semibold text-info hover:underline" @click="router.push('/rooms')">
            Lihat Semua Kamar &rarr;
          </button>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <!-- Deluxe Category Card -->
          <div class="group overflow-hidden rounded-lg border border-border bg-surface flex flex-col justify-between">
            <div>
              <div class="relative h-32 w-full overflow-hidden bg-surface-hover">
                <img
                  :src="deluxeRoomImg"
                  alt="Deluxe Room"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span class="absolute top-2 right-2 rounded bg-success px-2 py-0.5 text-[10px] font-bold text-white">
                  12 Kosong
                </span>
                <div class="absolute bottom-2 left-3 text-white">
                  <p class="text-xs font-bold">Standard & Deluxe Room</p>
                  <p class="text-[9px] text-white/80">Lantai 1-3 • 50 Kamar Total</p>
                </div>
              </div>

              <div class="p-3 space-y-1.5">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-text-secondary">Tarif: <strong class="text-text-primary">Rp 350.000</strong>/malam</span>
                  <span class="font-bold text-info">76% Terisi</span>
                </div>
                <div class="h-1.5 rounded bg-surface-hover overflow-hidden">
                  <div class="h-full rounded bg-info" style="width: 76%" />
                </div>
              </div>
            </div>

            <div class="px-3 pb-3">
              <button class="btn btn-outline btn-info btn-xs w-full font-semibold" @click="router.push('/rooms?type=deluxe')">
                Lihat 12 Kamar Kosong
              </button>
            </div>
          </div>

          <!-- Executive Suite Card -->
          <div class="group overflow-hidden rounded-lg border border-border bg-surface flex flex-col justify-between">
            <div>
              <div class="relative h-32 w-full overflow-hidden bg-surface-hover">
                <img
                  :src="executiveSuiteImg"
                  alt="Executive Suite"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span class="absolute top-2 right-2 rounded bg-success px-2 py-0.5 text-[10px] font-bold text-white">
                  8 Kosong
                </span>
                <div class="absolute bottom-2 left-3 text-white">
                  <p class="text-xs font-bold">Deluxe Room</p>
                  <p class="text-[9px] text-white/80">Lantai 4-6 • 30 Kamar Total</p>
                </div>
              </div>

              <div class="p-3 space-y-1.5">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-text-secondary">Tarif: <strong class="text-text-primary">Rp 550.000</strong>/malam</span>
                  <span class="font-bold text-accent-dark">73% Terisi</span>
                </div>
                <div class="h-1.5 rounded bg-surface-hover overflow-hidden">
                  <div class="h-full rounded bg-accent-dark" style="width: 73%" />
                </div>
              </div>
            </div>

            <div class="px-3 pb-3">
              <button class="btn btn-outline border-accent text-accent-dark hover:bg-accent hover:text-white btn-xs w-full font-semibold" @click="router.push('/rooms?type=executive')">
                Lihat 8 Kamar Kosong
              </button>
            </div>
          </div>

          <!-- Presidential Suite Card -->
          <div class="group overflow-hidden rounded-lg border border-border bg-surface flex flex-col justify-between">
            <div>
              <div class="relative h-32 w-full overflow-hidden bg-surface-hover">
                <img
                  :src="presidentialSuiteImg"
                  alt="Family Room"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span class="absolute top-2 right-2 rounded bg-success px-2 py-0.5 text-[10px] font-bold text-white">
                  3 Kosong
                </span>
                <div class="absolute bottom-2 left-3 text-white">
                  <p class="text-xs font-bold">Family Suite</p>
                  <p class="text-[9px] text-white/80">Lantai 7 • 10 Kamar Total</p>
                </div>
              </div>

              <div class="p-3 space-y-1.5">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-text-secondary">Tarif: <strong class="text-text-primary">Rp 850.000</strong>/malam</span>
                  <span class="font-bold text-success">70% Terisi</span>
                </div>
                <div class="h-1.5 rounded bg-surface-hover overflow-hidden">
                  <div class="h-full rounded bg-success" style="width: 70%" />
                </div>
              </div>
            </div>

            <div class="px-3 pb-3">
              <button class="btn btn-outline btn-xs w-full font-semibold" @click="router.push('/rooms?type=presidential')">
                Lihat 3 Family Suite Kosong
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Receptionist Operations & Streamlined Quick Actions (Requested Priority List) -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <!-- Room Status Matrix (8 Cols) -->
        <div class="lg:col-span-8 rounded-lg border border-border bg-surface p-4">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-2.5 mb-3">
            <div>
              <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">Matriks Status Kamar</h2>
              <p class="text-[10px] text-text-muted">Klik pada nomor kamar untuk aksi cepat</p>
            </div>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="f in ['all', 'available', 'occupied', 'dirty', 'maintenance']"
                :key="f"
                :class="['px-2 py-0.5 text-[10px] font-bold rounded capitalize transition-colors', boardFilter === f ? 'bg-info text-white' : 'bg-surface-hover text-text-secondary hover:text-text-primary']"
                @click="boardFilter = f"
              >
                {{ f }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            <div
              v-for="rm in filteredBoardGrid"
              :key="rm.num"
              :class="['p-2 rounded border text-center transition-all cursor-pointer hover:scale-105', roomBadgeClass(rm.status)]"
              @click="openRoomQuickModal(rm)"
            >
              <p class="text-xs font-bold">Kamar {{ rm.num }}</p>
              <p class="text-[9px] capitalize truncate mt-0.5">{{ rm.status }}</p>
            </div>
          </div>
        </div>

        <!-- RECEPTIONIST ESSENTIAL QUICK ACTIONS (Prioritized as requested by User) -->
        <div class="lg:col-span-4 rounded-lg border border-border bg-surface p-4 flex flex-col justify-between">
          <div>
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide mb-3">AKSI CEPAT</h2>

            <div class="space-y-2.5">
              <!-- 1. + New Reservation (Primary Action) -->
              <button
                class="btn btn-primary btn-sm w-full justify-start text-xs font-bold shadow-sm"
                @click="router.push('/reservations/new')"
              >
                <Icon name="plus" :size="14" /> + Reservasi Baru
              </button>

              <!-- 2. Check-in Guest -->
              <button
                class="btn btn-outline btn-sm w-full justify-start text-xs font-semibold"
                @click="router.push('/front-desk')"
              >
                <Icon name="log-in" :size="14" class="text-success" /> Check-in Tamu
              </button>

              <!-- 3. Check-out Guest -->
              <button
                class="btn btn-outline btn-sm w-full justify-start text-xs font-semibold"
                @click="router.push('/front-desk')"
              >
                <Icon name="log-out" :size="14" class="text-warning" /> Check-out Tamu
              </button>

              <!-- 4. Find Guest -->
              <button
                class="btn btn-outline btn-sm w-full justify-start text-xs font-semibold"
                @click="router.push('/guests')"
              >
                <Icon name="users" :size="14" class="text-info" /> Cari Data Tamu
              </button>
            </div>
          </div>

          <p class="text-[10px] text-text-muted mt-4 border-t border-border pt-2">
            Pintasan keyboard: Tekan <kbd class="px-1 py-0.5 bg-surface-hover rounded text-[9px] font-bold border border-border">Ctrl + K</kbd> untuk pencarian global instan.
          </p>
        </div>
      </div>

      <!-- Quick Room Detail Modal Card for Receptionist -->
      <dialog ref="roomModalRef" class="modal">
        <div class="modal-box bg-surface border border-border max-w-md rounded-lg p-0 overflow-hidden">
          <div class="relative h-40 w-full bg-surface-hover">
            <img :src="activeSelectedRoom?.img || deluxeRoomImg" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span :class="['absolute top-3 right-3 rounded px-2.5 py-0.5 text-xs font-bold text-white uppercase', roomBadgeClass(activeSelectedRoom?.status || 'available')]">
              {{ activeSelectedRoom?.status }}
            </span>
            <div class="absolute bottom-3 left-4 text-white">
              <p class="text-lg font-bold">Kamar {{ activeSelectedRoom?.num }}</p>
              <p class="text-xs text-white/80">{{ activeSelectedRoom?.type || 'Deluxe Room' }} • Lantai 2</p>
            </div>
          </div>

          <div class="p-4 space-y-3">
            <div class="flex justify-between items-center text-xs border-b border-border pb-2">
              <span class="text-text-muted">Tarif per Malam:</span>
              <span class="font-bold text-text-primary">Rp 350.000</span>
            </div>
            <div class="flex justify-between items-center text-xs border-b border-border pb-2">
              <span class="text-text-muted">Tamu Menginap:</span>
              <span class="font-bold text-primary">{{ activeSelectedRoom?.guest || 'Kosong (Bersih & Siap Huni)' }}</span>
            </div>

            <div class="pt-1 flex gap-2">
              <button class="btn btn-ghost btn-sm flex-1 text-xs" @click="closeRoomQuickModal">Tutup</button>
              <button v-if="activeSelectedRoom?.status === 'available'" class="btn btn-primary btn-sm flex-1 text-xs font-bold" @click="closeRoomQuickModal(); router.push('/front-desk')">
                CHECK IN TAMU
              </button>
              <button v-else-if="activeSelectedRoom?.status === 'occupied'" class="btn btn-warning btn-sm flex-1 text-xs font-bold" @click="closeRoomQuickModal(); router.push('/front-desk')">
                CHECK OUT TAMU
              </button>
              <button v-else class="btn btn-outline btn-sm flex-1 text-xs font-bold" @click="closeRoomQuickModal(); router.push('/housekeeping')">
                TUGASKAN CLEANING
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop"><button @click="closeRoomQuickModal">close</button></form>
      </dialog>
    </template>


    <!-- ============================================
         3. HOUSEKEEPING (CLEANING SERVICE) DASHBOARD
         ============================================ -->
    <template v-else-if="uiStore.activeRole === 'housekeeping'">
      <!-- Clean Housekeeping Header -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="rounded bg-teal-600/10 px-2 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-600/20 uppercase tracking-wider">
              CLEANING SERVICE APP
            </span>
            <span class="text-xs text-text-muted">Tugas Pembersihan Kamar Harian</span>
          </div>
          <h1 class="text-lg sm:text-xl font-bold text-text-primary mt-1">
            Selamat pagi, {{ uiStore.currentUser.name }}
          </h1>
          <p class="text-xs text-text-secondary">
            Daftar tugas pembersihan kamar & checklist inspeksi lapangan
          </p>
        </div>
      </div>

      <!-- Task Status Cards (Strict Radius 8px) -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="rounded-lg border border-border bg-surface p-3.5 text-center">
          <p class="text-2xl font-bold text-warning">{{ cleaningTasksToClean.length }}</p>
          <p class="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-0.5">TO CLEAN</p>
        </div>

        <div class="rounded-lg border border-border bg-surface p-3.5 text-center">
          <p class="text-2xl font-bold text-info">2</p>
          <p class="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-0.5">CLEANING</p>
        </div>

        <div class="rounded-lg border border-border bg-surface p-3.5 text-center">
          <p class="text-2xl font-bold text-purple">3</p>
          <p class="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-0.5">INSPECTION</p>
        </div>

        <div class="rounded-lg border border-border bg-surface p-3.5 text-center">
          <p class="text-2xl font-bold text-success">14</p>
          <p class="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-0.5">COMPLETED</p>
        </div>
      </div>

      <!-- Assigned Room Cleaning Queue Cards -->
      <div class="space-y-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-text-primary">Antrean Tugas Pembersihan Kamar</h2>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="task in cleaningTasksToClean"
            :key="task.room"
            class="rounded-lg border border-border bg-surface p-4 flex flex-col justify-between space-y-3 hover:border-warning transition-all"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="text-base font-bold text-primary">Kamar {{ task.room }}</span>
                <span :class="['rounded px-2 py-0.5 text-[9px] font-bold uppercase', task.priority === 'HIGH' ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning']">
                  PRIORITAS {{ task.priority }}
                </span>
              </div>
              <p class="text-xs font-semibold text-text-secondary mt-1">{{ task.type }} • {{ task.reason }}</p>
              <p class="text-[11px] text-text-muted mt-0.5">Est. Durasi: 25 Menit</p>
            </div>

            <button
              class="btn bg-warning hover:bg-warning/90 border-0 w-full text-xs font-bold text-white shadow-sm"
              @click="openCleaningModal(task)"
            >
              <Icon name="sparkles" :size="14" /> MULAI CLEANING
            </button>
          </div>
        </div>
      </div>

      <!-- Recently Completed Tasks -->
      <div class="rounded-lg border border-border bg-surface p-4">
        <h2 class="text-xs font-bold uppercase tracking-wider text-text-primary mb-2.5">Selesai Dibersihkan Hari Ini</h2>
        <div class="divide-y divide-border-light">
          <div v-for="comp in completedCleaningTasks" :key="comp.room" class="flex items-center justify-between py-2 text-xs">
            <div class="flex items-center gap-2">
              <Icon name="check-circle" :size="14" class="text-success" />
              <span class="font-bold text-primary">Kamar {{ comp.room }}</span>
              <span class="text-text-muted">({{ comp.type }})</span>
            </div>
            <span class="text-[10px] font-medium text-text-muted">Selesai jam {{ comp.time }}</span>
          </div>
        </div>
      </div>

      <!-- Interactive Cleaning Checklist Modal -->
      <dialog ref="cleaningModalRef" class="modal">
        <div class="modal-box bg-surface border border-border max-w-md rounded-lg p-5">
          <h3 class="text-base font-bold text-primary">Checklist Cleaning — Kamar {{ activeCleaningTask?.room }}</h3>
          <p class="text-xs text-text-muted mt-0.5">Prosedur Standar Pembersihan {{ activeCleaningTask?.type }}</p>

          <div class="mt-3 space-y-2.5 border-t border-b border-border py-3">
            <label v-for="(chk, i) in activeChecklist" :key="i" class="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" v-model="chk.done" class="checkbox checkbox-primary checkbox-sm rounded" />
              <span :class="['text-xs font-medium', chk.done ? 'line-through text-text-muted' : 'text-text-primary']">{{ chk.label }}</span>
            </label>
          </div>

          <div class="mt-4 flex gap-2">
            <button class="btn btn-ghost btn-sm flex-1 text-xs" @click="closeCleaningModal">Batal</button>
            <button
              class="btn btn-success btn-sm flex-1 text-xs font-bold text-white shadow-sm"
              :disabled="!allChecklistDone"
              @click="finishCleaning"
            >
              SELESAIKAN CLEANING
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop"><button @click="closeCleaningModal">close</button></form>
      </dialog>
    </template>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '~/stores/ui'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import Icon from '~/components/ui/Icon.vue'

import deluxeRoomImg from '~/assets/images/deluxe_room.jpg'
import executiveSuiteImg from '~/assets/images/executive_suite.jpg'
import presidentialSuiteImg from '~/assets/images/presidential_suite.jpg'

const uiStore = useUiStore()
const { t } = useI18n()
const router = useRouter()

const ownerPeriod = ref('12months')
const boardFilter = ref('all')

// ----- OWNER DASHBOARD ANALYTICAL DATA -----
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

// Receptionist Data
const receptionistArrivals = ref([
  { resId: 'RES-2048', time: '08:30', guest: 'Ahmad Fauzi', roomType: 'Standard (204)', vip: false },
  { resId: 'RES-2049', time: '10:00', guest: 'John Smith', roomType: 'Deluxe (501)', vip: true },
  { resId: 'RES-2050', time: '14:30', guest: 'Maria Garcia', roomType: 'Deluxe (302)', vip: false },
  { resId: 'RES-2051', time: '15:30', guest: 'Yuki Tanaka', roomType: 'Family (1201)', vip: true }
])

const receptionistDepartures = ref([
  { room: '201', time: '11:00', guest: 'Ahmad Fauzan', balance: 350000 },
  { room: '304', time: '12:00', guest: 'John Smith', balance: 550000 },
  { room: '412', time: '12:30', guest: 'Sarah Lee', balance: 0 }
])

const roomBoardGrid = ref([
  { num: '101', status: 'available', type: 'Standard', img: deluxeRoomImg, guest: '' },
  { num: '102', status: 'occupied', type: 'Standard', img: deluxeRoomImg, guest: 'Budi Santoso' },
  { num: '103', status: 'dirty', type: 'Standard', img: deluxeRoomImg, guest: '' },
  { num: '104', status: 'cleaning', type: 'Deluxe', img: deluxeRoomImg, guest: '' },
  { num: '105', status: 'maintenance', type: 'Deluxe', img: executiveSuiteImg, guest: '' },
  { num: '106', status: 'available', type: 'Deluxe', img: executiveSuiteImg, guest: '' },
  { num: '107', status: 'occupied', type: 'Deluxe', img: executiveSuiteImg, guest: 'Sarah Lee' },
  { num: '108', status: 'occupied', type: 'Family', img: presidentialSuiteImg, guest: 'Yuki Tanaka' },
  { num: '201', status: 'dirty', type: 'Standard', img: deluxeRoomImg, guest: '' },
  { num: '202', status: 'occupied', type: 'Standard', img: deluxeRoomImg, guest: 'Andi Pratama' },
  { num: '203', status: 'available', type: 'Standard', img: deluxeRoomImg, guest: '' },
  { num: '204', status: 'dirty', type: 'Standard', img: deluxeRoomImg, guest: '' },
  { num: '205', status: 'occupied', type: 'Deluxe', img: executiveSuiteImg, guest: 'Hartono' },
  { num: '206', status: 'occupied', type: 'Deluxe', img: executiveSuiteImg, guest: 'James' },
  { num: '207', status: 'available', type: 'Family', img: presidentialSuiteImg, guest: '' },
  { num: '208', status: 'cleaning', type: 'Family', img: presidentialSuiteImg, guest: '' }
])

const filteredBoardGrid = computed(() => {
  if (boardFilter.value === 'all') return roomBoardGrid.value
  return roomBoardGrid.value.filter(r => r.status === boardFilter.value)
})

const roomModalRef = ref(null)
const activeSelectedRoom = ref(null)

function openRoomQuickModal(rm) {
  activeSelectedRoom.value = rm
  roomModalRef.value?.showModal()
}

function closeRoomQuickModal() {
  roomModalRef.value?.close()
}

function roomBadgeClass(status) {
  const map = {
    available: 'bg-success/10 border-success/30 text-success font-bold',
    occupied: 'bg-info/10 border-info/30 text-info font-bold',
    dirty: 'bg-warning/10 border-warning/30 text-warning font-bold',
    cleaning: 'bg-info/10 border-info/30 text-info font-bold',
    maintenance: 'bg-danger/10 border-danger/30 text-danger font-bold'
  }
  return map[status] || 'bg-surface-hover border-border text-text-muted'
}

function processCheckIn(arr) {
  receptionistArrivals.value = receptionistArrivals.value.filter(a => a.resId !== arr.resId)
}

function processCheckOut(dep) {
  receptionistDepartures.value = receptionistDepartures.value.filter(d => d.room !== dep.room)
  cleaningTasksToClean.value.unshift({
    room: dep.room,
    type: 'Checkout Standard',
    priority: 'HIGH',
    reason: `Tamu ${dep.guest} Checked Out`
  })
}

// Housekeeping Data
const cleaningTasksToClean = ref([
  { room: '204', type: 'Standard Room', priority: 'HIGH', reason: 'Checkout Tamu 11:30' },
  { room: '302', type: 'Deluxe Room', priority: 'HIGH', reason: 'Permintaan Stayover' },
  { room: '415', type: 'Standard Room', priority: 'NORMAL', reason: 'Pembersihan Rutin' },
  { room: '108', type: 'Standard Room', priority: 'NORMAL', reason: 'Pembersihan Rutin' }
])

const completedCleaningTasks = ref([
  { room: '201', type: 'Standard Room', time: '09:45' },
  { room: '208', type: 'Family Suite', time: '10:15' },
  { room: '301', type: 'Deluxe Room', time: '11:00' }
])

const cleaningModalRef = ref(null)
const activeCleaningTask = ref(null)
const activeChecklist = ref([
  { label: 'Ganti seprai & sarung bantal bersih', done: true },
  { label: 'Pembersihan & sanitasi kamar mandi', done: true },
  { label: 'Sediakan handuk bersih & amenities', done: true },
  { label: 'Isi ulang air minum & minibar', done: true },
  { label: 'Buang sampah & bersihkan tempat sampah', done: true },
  { label: 'Sapu & pel lantai kamar', done: true },
  { label: 'Inspeksi akhir kondisi kamar', done: false }
])

const allChecklistDone = computed(() => activeChecklist.value.every(c => c.done))

function openCleaningModal(task) {
  activeCleaningTask.value = task
  cleaningModalRef.value?.showModal()
}

function closeCleaningModal() {
  cleaningModalRef.value?.close()
}

function finishCleaning() {
  if (!activeCleaningTask.value) return
  const r = activeCleaningTask.value.room
  cleaningTasksToClean.value = cleaningTasksToClean.value.filter(t => t.room !== r)
  completedCleaningTasks.value.unshift({
    room: r,
    type: activeCleaningTask.value.type,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  })
  const boardItem = roomBoardGrid.value.find(b => b.num === r)
  if (boardItem) boardItem.status = 'available'
  closeCleaningModal()
}
</script>
