<script setup>
import { useConfirmState, confirmAccept, confirmReject } from '~/composables/useConfirm'
import Icon from './Icon.vue'

const { dialogVisible, current } = useConfirmState()
</script>

<template>
  <dialog :open="dialogVisible" class="modal">
    <div class="modal-box bg-base-100">
      <h3 v-if="current.header" class="font-bold text-lg text-text-primary">
        <Icon v-if="current.icon" :name="current.icon" class="inline mr-2" />
        {{ current.header }}
      </h3>
      <p v-if="current.message" class="py-4 text-text-secondary">{{ current.message }}</p>
      <div class="modal-action">
        <button class="btn" @click="confirmReject">
          {{ current.rejectLabel || 'Cancel' }}
        </button>
        <button class="btn btn-error" :class="current.acceptClass" @click="confirmAccept">
          {{ current.acceptLabel || 'Confirm' }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="confirmReject">close</button>
    </form>
  </dialog>
</template>
