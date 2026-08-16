<template>
  <div class="space-y-6">
    <PageHeader :title="t('settings')" />

    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div role="tablist" class="tabs tabs-bordered">
          <label v-for="(tab, i) in tabs" :key="i" class="tab">
            <input type="radio" name="settings-tabs" class="sr-only" :checked="activeTab===String(i)" @change="activeTab=String(i)" />
            {{ tab }}
          </label>
        </div>

        <!-- Hotel Profile -->
        <div v-show="activeTab==='0'" role="tabpanel" class="tab-content pt-4">
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @click.prevent>
            <div class="space-y-1 sm:col-span-2">
              <label class="text-xs font-medium text-text-secondary">{{ t('hotel_name') }}</label>
              <input v-model="profile.name" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1 sm:col-span-2">
              <label class="text-xs font-medium text-text-secondary">{{ t('address') }}</label>
              <textarea v-model="profile.address" class="textarea textarea-bordered w-full" rows="2" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('phone') }}</label>
              <input v-model="profile.phone" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('email') }}</label>
              <input v-model="profile.email" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('tax_id') }}</label>
              <input v-model="profile.taxId" class="input input-bordered w-full" />
            </div>
            <div class="flex items-end sm:col-span-2">
              <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
            </div>
          </form>
        </div>

        <!-- Room Types -->
        <div v-show="activeTab==='1'" role="tabpanel" class="tab-content pt-4">
          <div class="space-y-3">
            <div
              v-for="rt in roomTypes"
              :key="rt.id"
              class="flex flex-col gap-3 rounded-lg border border-border bg-surface-hover p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="min-w-0 flex-1">
                <h2 class="text-sm font-semibold text-text-primary">{{ rt.name }}</h2>
                <p class="text-xs text-text-muted">{{ rt.description }}</p>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                  <span class="badge badge-ghost">{{ formatRupiah(rt.baseRate) }}</span>
                  <span>{{ t('capacity') }}: {{ rt.capacity }}</span>
                  <span class="text-text-muted">•</span>
                  <span>{{ rt.amenities.slice(0, 3).join(', ') }}…</span>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm" @click="editRoomType(rt.id)">{{ t('edit') }}</button>
            </div>
          </div>
          <div class="mt-4">
            <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
          </div>
        </div>

        <!-- Rates -->
        <div v-show="activeTab==='2'" role="tabpanel" class="tab-content pt-4">
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-3" @click.prevent>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('base_rate_night') }}</label>
              <input type="number" v-model="rates.base" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('weekend_surcharge') }}</label>
              <input type="number" v-model="rates.weekend" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('seasonal_surcharge') }}</label>
              <input type="number" v-model="rates.seasonal" class="input input-bordered w-full" />
            </div>
            <div class="flex items-end sm:col-span-3">
              <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
            </div>
          </form>
        </div>

        <!-- Taxes -->
        <div v-show="activeTab==='3'" role="tabpanel" class="tab-content pt-4">
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @click.prevent>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('tax_percent') }}</label>
              <div class="join">
                <input type="number" v-model="taxes.taxPercent" class="join-item input input-bordered w-full" />
                <span class="join-item inline-flex items-center bg-surface-hover px-3 text-sm">%</span>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('service_charge') }}</label>
              <div class="join">
                <input type="number" v-model="taxes.serviceCharge" class="join-item input input-bordered w-full" />
                <span class="join-item inline-flex items-center bg-surface-hover px-3 text-sm">%</span>
              </div>
            </div>
            <div class="flex items-end sm:col-span-2">
              <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
            </div>
          </form>
        </div>

        <!-- Booking -->
        <div v-show="activeTab==='4'" role="tabpanel" class="tab-content pt-4">
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @click.prevent>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('check_in_time') }}</label>
              <input v-model="booking.checkIn" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('check_out_time') }}</label>
              <input v-model="booking.checkOut" class="input input-bordered w-full" />
            </div>
            <div class="space-y-1 sm:col-span-2">
              <label class="text-xs font-medium text-text-secondary">{{ t('cancellation_policy') }}</label>
              <textarea v-model="booking.cancellation" class="textarea textarea-bordered w-full" rows="3" />
            </div>
            <div class="flex items-end sm:col-span-2">
              <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
            </div>
          </form>
        </div>

        <!-- Notifications -->
        <div v-show="activeTab==='5'" role="tabpanel" class="tab-content pt-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <h2 class="text-sm font-medium text-text-primary">{{ t('email_notifications') }}</h2>
                <p class="text-xs text-text-muted">Receive alerts via email</p>
              </div>
              <input type="checkbox" v-model="notif.email" class="toggle" />
            </div>
            <div class="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <h2 class="text-sm font-medium text-text-primary">{{ t('sms_notifications') }}</h2>
                <p class="text-xs text-text-muted">Receive alerts via SMS</p>
              </div>
              <input type="checkbox" v-model="notif.sms" class="toggle" />
            </div>
            <div class="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <h2 class="text-sm font-medium text-text-primary">{{ t('push_notifications') }}</h2>
                <p class="text-xs text-text-muted">Receive push notifications</p>
              </div>
              <input type="checkbox" v-model="notif.push" class="toggle" />
            </div>
          </div>
          <div class="mt-4">
            <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
          </div>
        </div>

        <!-- Localization -->
        <div v-show="activeTab==='6'" role="tabpanel" class="tab-content pt-4">
          <form class="grid grid-cols-1 gap-4 sm:grid-cols-2" @click.prevent>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('language') }}</label>
              <select v-model="localization.language" class="select select-bordered w-full">
                <option v-for="o in languageOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('currency') }}</label>
              <select v-model="localization.currency" class="select select-bordered w-full">
                <option v-for="o in currencyOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('timezone') }}</label>
              <select v-model="localization.timezone" class="select select-bordered w-full">
                <option v-for="o in timezoneOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-text-secondary">{{ t('date_format') }}</label>
              <select v-model="localization.dateFormat" class="select select-bordered w-full">
                <option v-for="o in dateFormatOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
            <div class="flex items-end sm:col-span-2">
              <button class="btn btn-primary" @click="save">{{ t('save') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import { formatRupiah } from '~/utils/format'
import mockRoomTypes from '~/mock/roomTypes'
import PageHeader from '~/components/ui/PageHeader.vue'

const { t } = useI18n()
const toast = useToast()

const tabs = [
  t('hotel_profile'),
  t('room_types'),
  t('rates'),
  t('taxes'),
  t('booking'),
  t('notifications'),
  t('localization'),
]

const activeTab = ref('0')

const profile = reactive({
  name: 'Grand Aurora Hotel',
  address: 'Jl. Malioboro No. 12, Yogyakarta 55281, Indonesia',
  phone: '+62 274 555 0123',
  email: 'info@grandaurora.co.id',
  taxId: '00.000.000.0-000.000',
})

const roomTypes = ref(mockRoomTypes)

const rates = reactive({
  base: 1200000,
  weekend: 250000,
  seasonal: 500000,
})

const taxes = reactive({
  taxPercent: 11,
  serviceCharge: 10,
})

const booking = reactive({
  checkIn: '14:00',
  checkOut: '12:00',
  cancellation: 'Free cancellation up to 24 hours before check-in. Late cancellations incur a one-night charge.',
})

const notif = reactive({
  email: true,
  sms: false,
  push: true,
})

const localization = reactive({
  language: 'id',
  currency: 'IDR',
  timezone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY',
})

const languageOptions = [
  { label: 'Bahasa Indonesia', value: 'id' },
  { label: 'English', value: 'en' },
]
const currencyOptions = [{ label: 'IDR — Indonesian Rupiah', value: 'IDR' }]
const timezoneOptions = [
  { label: 'Asia/Jakarta (WIB)', value: 'Asia/Jakarta' },
  { label: 'Asia/Makassar (WITA)', value: 'Asia/Makassar' },
  { label: 'Asia/Jayapura (WIT)', value: 'Asia/Jayapura' },
]
const dateFormatOptions = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
]

function editRoomType(id: number) {
  console.log('Edit room type', id)
}

function save() {
  toast.add({
    severity: 'success',
    summary: t('settings'),
    detail: t('settings_saved'),
    life: 3000,
  })
}
</script>
