<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader :title="t('guests')" :breadcrumb="breadcrumb">
      <template #actions>
        <div class="join">
          <span class="join-item bg-base-200 px-3 flex items-center">
            <Icon name="pi pi-search" :size="14" class="text-text-muted" />
          </span>
          <input
            v-model="searchQuery"
            :placeholder="`${t('search')} ${t('guests').toLowerCase()}...`"
            class="join-item input input-bordered w-64"
          />
        </div>
        <button class="btn btn-primary" @click="navigateTo('/guests/new')">
          <Icon name="pi pi-user-plus" :size="14" /> {{ t('guest') }}
        </button>
      </template>
    </PageHeader>

    <!-- Guests Table -->
    <div class="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full text-sm">
          <thead>
            <tr class="text-left text-[10px] uppercase tracking-wide text-text-muted">
              <th class="font-medium">{{ t('guest') }}</th>
              <th class="font-medium">{{ t('contact') }}</th>
              <th class="font-medium">{{ t('country') }}</th>
              <th class="font-medium">{{ t('total_stays') }}</th>
              <th class="font-medium">{{ t('last_stay') }}</th>
              <th class="font-medium">{{ t('total_spent') }}</th>
              <th class="font-medium">{{ t('vip') }}</th>
              <th class="font-medium">{{ t('status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in paginatedRows"
              :key="row.id"
              class="hover:bg-surface-hover transition-colors"
              :class="row.vip && 'border-l-4 border-l-amber-500'"
              @click="navigateTo(`/guests/${row.id}`)"
              style="cursor: pointer"
            >
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                      {{ row.initials }}
                    </div>
                  </div>
                  <span class="font-medium text-text-primary">{{ row.fullName }}</span>
                </div>
              </td>
              <td>
                <span class="text-sm text-text-secondary">{{ row.email }}</span>
              </td>
              <td class="text-text-secondary">{{ row.country }}</td>
              <td class="tabular font-medium text-text-primary">{{ row.totalStays }}</td>
              <td class="tabular text-text-secondary">{{ row.lastStay }}</td>
              <td class="tabular font-medium text-text-primary">{{ formatRupiah(row.totalSpent) }}</td>
              <td>
                <Icon v-if="row.vip" name="pi pi-star-fill" :size="14" class="text-amber-500" />
                <span v-else class="text-text-muted">-</span>
              </td>
              <td>
                <StatusBadge :status="row.status" type="generic" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="join flex justify-end border-t border-border px-4 py-2">
        <button class="join-item btn btn-sm" :disabled="page<=0" @click="page--">&lt;</button>
        <button v-for="p in pageRange" :key="p" class="join-item btn btn-sm" :class="p===page+1 && 'btn-active'" @click="page=p-1">{{ p }}</button>
        <button class="join-item btn btn-sm" :disabled="page>=totalPages-1" @click="page++">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '~/composables/useI18n'
import { formatRupiah } from '~/utils/format'
import { usePagination } from '~/composables/usePagination'
import { mockGuests } from '~/mock/guests'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import Icon from '~/components/ui/Icon.vue'

const { t } = useI18n()
const router = useRouter()

const searchQuery = ref('')

// Filter guests by name, email, country
const filteredGuests = computed(() => {
  if (!searchQuery.value.trim()) return mockGuests
  const q = searchQuery.value.toLowerCase().trim()
  return mockGuests.filter(
    (g) =>
      g.fullName.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.country.toLowerCase().includes(q)
  )
})

const { page, paginatedRows, totalPages, pageRange } = usePagination(() => filteredGuests.value, 10)

// Breadcrumb
const breadcrumb = [
  { label: t('dashboard'), path: '/' },
  { label: t('guests') },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>
