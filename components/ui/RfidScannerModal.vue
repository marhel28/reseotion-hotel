<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box bg-surface border border-border max-w-md rounded-lg p-5 space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-border pb-3">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon name="credit-card" :size="20" />
          </div>
          <div>
            <h3 class="text-base font-bold text-text-primary">
              {{ mode === 'pair' ? 'Pairing Kartu RFID Akses' : 'Scan Read Kartu RFID' }}
            </h3>
            <p class="text-xs text-text-muted">
              {{ mode === 'pair' ? `Hubungkan Kartu RFID ke Kamar ${roomNumber}` : 'Tempelkan kartu RFID pada alat scanner desk' }}
            </p>
          </div>
        </div>
        <button class="btn btn-circle btn-ghost btn-xs text-text-muted" @click="close">✕</button>
      </div>

      <!-- Tap Animation Visual Container -->
      <div class="relative overflow-hidden rounded-lg border border-border bg-background p-5 text-center space-y-3">
        <!-- Pulse Animation -->
        <div class="relative mx-auto flex h-20 w-20 items-center justify-center">
          <div v-if="scanning" class="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div v-if="scannedCard" class="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success border-2 border-success">
            <Icon name="check-circle" :size="32" />
          </div>
          <div v-else class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/40">
            <Icon name="credit-card" :size="30" />
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-text-primary">
            {{ scannedCard ? 'Kartu Terdeteksi & Terbaca!' : 'Menunggu Tap Kartu RFID...' }}
          </h4>
          <p class="text-[11px] text-text-muted mt-0.5">
            {{ scannedCard ? `UID: ${scannedCard.uid}` : 'Tempelkan fisik kartu fisik ke pembaca USB/NFC' }}
          </p>
        </div>

        <!-- Simulation Button for Demo/Testing -->
        <div class="pt-1">
          <button
            v-if="!scannedCard"
            class="btn btn-outline btn-primary btn-xs font-bold w-full"
            @click="simulateCardTap"
          >
            [ 💳 SIMULASI TAP KARTU RFID ]
          </button>
          <div v-else class="rounded-md bg-success/10 p-2 text-xs font-bold text-success border border-success/20">
            Status: {{ mode === 'pair' ? 'Kartu Siap Diserahkan ke Tamu' : `Terhubung ke Kamar ${scannedCard.roomNumber} (${scannedCard.guestName})` }}
          </div>
        </div>
      </div>

      <!-- Rincian Data Pairing RFID -->
      <div v-if="scannedCard" class="space-y-1.5 text-xs rounded-lg border border-border bg-surface p-3">
        <div class="flex justify-between">
          <span class="text-text-muted">Kode UID Kartu:</span>
          <span class="font-mono font-bold text-primary">{{ scannedCard.uid }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-muted">Nomor Kamar:</span>
          <span class="font-bold text-text-primary">Kamar {{ roomNumber || scannedCard.roomNumber }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-muted">Nama Pemegang:</span>
          <span class="font-bold text-text-primary">{{ guestName || scannedCard.guestName }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-muted">Akses Web Self-Service:</span>
          <span class="font-bold text-success">Aktif (QR & NFC Auth)</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 pt-2 border-t border-border">
        <button class="btn btn-ghost btn-sm flex-1 text-xs" @click="close">Batal</button>
        <button
          class="btn btn-primary btn-sm flex-1 text-xs font-bold text-white shadow-sm"
          :disabled="!scannedCard"
          @click="confirmRfidAction"
        >
          {{ mode === 'pair' ? 'PASANG & SIMPAN KARTU' : 'PROSES PEMESANAN / CHECK-OUT' }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button @click="close">close</button></form>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  visible: Boolean,
  mode: { type: String, default: 'pair' }, // 'pair' or 'read'
  roomNumber: { type: String, default: '101' },
  guestName: { type: String, default: 'Tamu' }
})

const emit = defineEmits(['update:visible', 'cardPaired', 'cardRead'])

const dialogRef = ref(null)
const scanning = ref(true)
const scannedCard = ref(null)

watch(() => props.visible, (v) => {
  if (v) {
    scanning.value = true
    scannedCard.value = null
    setTimeout(() => {
      dialogRef.value?.showModal()
    }, 50)
  } else {
    dialogRef.value?.close()
  }
})

function close() {
  emit('update:visible', false)
}

function simulateCardTap() {
  scanning.value = false
  const randomUid = 'RFID-' + Math.floor(10000 + Math.random() * 90000)
  scannedCard.value = {
    uid: randomUid,
    roomNumber: props.roomNumber || '101',
    guestName: props.guestName || 'Budi Santoso',
    active: true
  }
}

function confirmRfidAction() {
  if (!scannedCard.value) return
  if (props.mode === 'pair') {
    emit('cardPaired', scannedCard.value)
  } else {
    emit('cardRead', scannedCard.value)
  }
  close()
}
</script>
