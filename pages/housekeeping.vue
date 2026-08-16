<template>
  <div class="space-y-6">
    <!-- 1. PageHeader -->
    <PageHeader :title="t('housekeeping')" />

    <!-- 2. KPI Strip -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <!-- Rooms to Clean -->
      <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p class="text-xs font-medium uppercase tracking-wide text-text-muted">
          {{ t('rooms_to_clean') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-text-primary">{{ kpi.toClean }}</p>
      </div>
      <!-- Cleaning -->
      <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p class="text-xs font-medium uppercase tracking-wide text-text-muted">
          {{ t('cleaning') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-text-primary">{{ kpi.cleaning }}</p>
      </div>
      <!-- Clean -->
      <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p class="text-xs font-medium uppercase tracking-wide text-text-muted">
          {{ t('clean') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-text-primary">{{ kpi.clean }}</p>
      </div>
      <!-- Inspected -->
      <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p class="text-xs font-medium uppercase tracking-wide text-text-muted">
          {{ t('inspected') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-text-primary">{{ kpi.inspected }}</p>
      </div>
      <!-- Maintenance -->
      <div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p class="text-xs font-medium uppercase tracking-wide text-text-muted">
          {{ t('maintenance') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-text-primary">{{ kpi.maintenance }}</p>
      </div>
    </div>

    <!-- 3. Kanban Task Board -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <!-- To Clean Column -->
      <div class="flex flex-col">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('to_clean') }}</h2>
          <span class="rounded-full bg-warning-bg px-2 py-0.5 text-xs font-medium text-warning">
            {{ tasksToClean.length }}
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in tasksToClean"
            :key="task.id"
            class="rounded-lg border border-border bg-surface p-3 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-semibold text-text-primary">Room {{ task.roomId }}</p>
                <p class="text-xs text-text-muted">{{ task.roomType }}</p>
              </div>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  priorityClass(task.priority)
                ]"
              >
                {{ t(task.priority) }}
              </span>
            </div>
            <div class="mt-3 space-y-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-user" :size="12" class="text-text-muted" />
                <span>{{ task.assignedStaff || '—' }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-clock" :size="12" class="text-text-muted" />
                <span>{{ task.time }}</span>
              </div>
            </div>
            <p v-if="task.notes" class="mt-2 border-t border-border pt-2 text-xs italic text-text-muted">
              {{ task.notes }}
            </p>
          </div>
          <p v-if="!tasksToClean.length" class="text-center text-xs text-text-muted">
            No tasks
          </p>
        </div>
      </div>

      <!-- Cleaning Column -->
      <div class="flex flex-col">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('cleaning') }}</h2>
          <span class="rounded-full bg-info-bg px-2 py-0.5 text-xs font-medium text-info">
            {{ tasksCleaning.length }}
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in tasksCleaning"
            :key="task.id"
            class="rounded-lg border border-border bg-surface p-3 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-semibold text-text-primary">Room {{ task.roomId }}</p>
                <p class="text-xs text-text-muted">{{ task.roomType }}</p>
              </div>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  priorityClass(task.priority)
                ]"
              >
                {{ t(task.priority) }}
              </span>
            </div>
            <div class="mt-3 space-y-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-user" :size="12" class="text-text-muted" />
                <span>{{ task.assignedStaff || '—' }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-clock" :size="12" class="text-text-muted" />
                <span>{{ task.time }}</span>
              </div>
            </div>
            <p v-if="task.notes" class="mt-2 border-t border-border pt-2 text-xs italic text-text-muted">
              {{ task.notes }}
            </p>
          </div>
          <p v-if="!tasksCleaning.length" class="text-center text-xs text-text-muted">
            No tasks
          </p>
        </div>
      </div>

      <!-- Inspection Column -->
      <div class="flex flex-col">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('inspection') }}</h2>
          <span class="rounded-full bg-info-bg px-2 py-0.5 text-xs font-medium text-info">
            {{ tasksInspection.length }}
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in tasksInspection"
            :key="task.id"
            class="rounded-lg border border-border bg-surface p-3 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-semibold text-text-primary">Room {{ task.roomId }}</p>
                <p class="text-xs text-text-muted">{{ task.roomType }}</p>
              </div>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  priorityClass(task.priority)
                ]"
              >
                {{ t(task.priority) }}
              </span>
            </div>
            <div class="mt-3 space-y-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-user" :size="12" class="text-text-muted" />
                <span>{{ task.assignedStaff || '—' }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-clock" :size="12" class="text-text-muted" />
                <span>{{ task.time }}</span>
              </div>
            </div>
            <p v-if="task.notes" class="mt-2 border-t border-border pt-2 text-xs italic text-text-muted">
              {{ task.notes }}
            </p>
          </div>
          <p v-if="!tasksInspection.length" class="text-center text-xs text-text-muted">
            No tasks
          </p>
        </div>
      </div>

      <!-- Completed Column -->
      <div class="flex flex-col">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-text-primary">{{ t('completed') }}</h2>
          <span class="rounded-full bg-success-bg px-2 py-0.5 text-xs font-medium text-success">
            {{ tasksCompleted.length }}
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="task in tasksCompleted"
            :key="task.id"
            class="rounded-lg border border-border bg-surface p-3 shadow-sm transition hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm font-semibold text-text-primary">Room {{ task.roomId }}</p>
                <p class="text-xs text-text-muted">{{ task.roomType }}</p>
              </div>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  priorityClass(task.priority)
                ]"
              >
                {{ t(task.priority) }}
              </span>
            </div>
            <div class="mt-3 space-y-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-user" :size="12" class="text-text-muted" />
                <span>{{ task.assignedStaff || '—' }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Icon name="pi pi-clock" :size="12" class="text-text-muted" />
                <span>{{ task.time }}</span>
              </div>
            </div>
            <p v-if="task.notes" class="mt-2 border-t border-border pt-2 text-xs italic text-text-muted">
              {{ task.notes }}
            </p>
          </div>
          <p v-if="!tasksCompleted.length" class="text-center text-xs text-text-muted">
            No tasks
          </p>
        </div>
      </div>
    </div>

    <!-- 4. Staff Assignment Section -->
    <div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-base font-semibold text-text-primary">{{ t('assigned_staff') }}</h2>
        <button class="btn btn-sm" @click="showAssignDialog = true">
          <Icon name="pi pi-plus" :size="14" /> {{ t('assign_room') }}
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="staff in staffStats"
          :key="staff.name"
          class="rounded-lg border border-border p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {{ staff.initials }}
              </div>
              <div>
                <p class="text-sm font-medium text-text-primary">{{ staff.name }}</p>
                <p class="text-xs text-text-muted">
                  {{ staff.total }} rooms assigned · {{ staff.completed }} {{ t('completed').toLowerCase() }}
                </p>
              </div>
            </div>
            <span class="text-sm font-semibold text-text-primary">{{ staff.progress }}%</span>
          </div>
          <progress class="progress progress-primary mt-3" :value="staff.progress" max="100"></progress>
        </div>
      </div>
    </div>

    <!-- 5. Assign Room Dialog -->
    <Modal v-model:visible="showAssignDialog" :header="t('assign_room')">
      <div class="space-y-4 pt-2">
        <!-- Room select -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-text-primary">Room</label>
          <select v-model="assignForm.roomId" class="select select-bordered w-full">
            <option :value="null" disabled>Select a room</option>
            <option v-for="r in assignableRooms" :key="r.id" :value="r.id">{{ r.number }}</option>
          </select>
        </div>

        <!-- Staff select -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-text-primary">{{ t('assigned_staff') }}</label>
          <select v-model="assignForm.staff" class="select select-bordered w-full">
            <option :value="null" disabled>Select staff</option>
            <option v-for="s in staffOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <!-- Priority select -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-text-primary">{{ t('priority') }}</label>
          <select v-model="assignForm.priority" class="select select-bordered w-full">
            <option :value="null" disabled>Select priority</option>
            <option v-for="o in priorityOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button class="btn btn-ghost btn-sm" @click="showAssignDialog = false">Cancel</button>
        <button class="btn btn-sm" :disabled="!canAssign" @click="handleAssign">
          <Icon name="pi pi-check" :size="14" /> Assign
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useToast } from '~/composables/useToast'
import Icon from '~/components/ui/Icon.vue'
import Modal from '~/components/ui/Modal.vue'

import PageHeader from '~/components/ui/PageHeader.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import { housekeepingTasks, type HousekeepingTask, type HousekeepingPriority } from '~/mock/housekeeping'
import { mockRooms } from '~/mock/rooms'

const { t } = useI18n()
const toast = useToast()

// --- Reactive task list (mutable so assignments can push) ---
const tasks = ref<HousekeepingTask[]>([...housekeepingTasks])

// --- Kanban columns ---
const tasksToClean = computed(() => tasks.value.filter(t => t.status === 'to_clean'))
const tasksCleaning = computed(() => tasks.value.filter(t => t.status === 'cleaning'))
const tasksInspection = computed(() => tasks.value.filter(t => t.status === 'inspection'))
const tasksCompleted = computed(() => tasks.value.filter(t => t.status === 'completed'))

// --- KPI strip ---
const kpi = computed(() => {
  const cleanRooms = mockRooms.filter(r => r.housekeepingStatus === 'clean').length
  const maintenanceRooms = mockRooms.filter(r => r.housekeepingStatus === 'out_of_order').length
  return {
    toClean: tasksToClean.value.length,
    cleaning: tasksCleaning.value.length,
    clean: cleanRooms,
    inspected: tasksInspection.value.length,
    maintenance: maintenanceRooms,
  }
})

// --- Priority styling ---
const priorityClass = (priority: HousekeepingPriority): string => {
  switch (priority) {
    case 'low':      return 'bg-success-bg text-success'
    case 'medium':   return 'bg-warning-bg text-warning'
    case 'high':     return 'bg-orange-100 text-orange-600'
    case 'urgent':   return 'bg-danger-bg text-danger'
    default:         return 'bg-surface-hover text-text-secondary'
  }
}

// --- Staff assignment stats ---
interface StaffStat {
  name: string
  initials: string
  total: number
  completed: number
  progress: number
}

const staffStats = computed<StaffStat[]>(() => {
  const map = new Map<string, { total: number; completed: number }>()
  for (const task of tasks.value) {
    const name = task.assignedStaff
    if (!name) continue
    const entry = map.get(name) || { total: 0, completed: 0 }
    entry.total += 1
    if (task.status === 'completed') entry.completed += 1
    map.set(name, entry)
  }
  return Array.from(map.entries()).map(([name, { total, completed }]) => ({
    name,
    initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    total,
    completed,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  }))
})

// --- Assign Room Dialog ---
const showAssignDialog = ref(false)

interface AssignForm {
  roomId: number | null
  staff: string | null
  priority: HousekeepingPriority | null
}

const assignForm = ref<AssignForm>({
  roomId: null,
  staff: null,
  priority: null,
})

// Rooms eligible for assignment: dirty or currently cleaning
const assignableRooms = computed(() =>
  mockRooms
    .filter(r => r.housekeepingStatus === 'dirty' || r.housekeepingStatus === 'cleaning')
    .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))
)

// Staff options derived from existing assignments
const staffOptions = computed(() => {
  const set = new Set<string>()
  tasks.value.forEach(t => { if (t.assignedStaff) set.add(t.assignedStaff) })
  return Array.from(set).sort()
})

// Priority options for the select
const priorityOptions = computed(() => [
  { label: t('low'),    value: 'low' },
  { label: t('medium'), value: 'medium' },
  { label: t('high'),   value: 'high' },
  { label: t('urgent'), value: 'urgent' },
])

const canAssign = computed(() =>
  assignForm.value.roomId != null &&
  assignForm.value.staff != null &&
  assignForm.value.priority != null
)

const handleAssign = () => {
  if (!canAssign.value) return

  const room = mockRooms.find(r => r.id === assignForm.value.roomId)
  const newTask: HousekeepingTask = {
    id: Math.max(0, ...tasks.value.map(t => t.id)) + 1,
    roomId: room?.id ?? (Number(assignForm.value.roomId) || 0),
    roomType: room ? roomTypeLabel(room.typeId) : 'Standard',
    priority: assignForm.value.priority!,
    assignedStaff: assignForm.value.staff!,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    status: 'to_clean',
    notes: '',
  }

  tasks.value.unshift(newTask)

  toast.add({
    severity: 'success',
    summary: 'Assigned',
    detail: `Room ${newTask.roomId} assigned to ${newTask.assignedStaff}`,
    life: 3000,
  })

  // Reset + close
  assignForm.value = { roomId: null, staff: null, priority: null }
  showAssignDialog.value = false
}

// Helper to map typeId → label (simplified)
const roomTypeLabel = (typeId: number): string => {
  const map: Record<number, string> = {
    1: 'Standard',
    2: 'Deluxe',
    3: 'Suite',
    4: 'Executive',
    5: 'Presidential',
    6: 'Presidential Suite',
  }
  return map[typeId] || 'Room'
}
</script>
