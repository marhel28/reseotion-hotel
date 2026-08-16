<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  header: { type: String, default: '' }
})

const emit = defineEmits(['update:visible'])

const dialogRef = ref(null)

watch(() => props.visible, (val) => {
  if (val) dialogRef.value?.showModal()
  else dialogRef.value?.close()
})

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="close" @click.self="close">
    <div class="modal-box bg-base-100">
      <h3 v-if="header || $slots.header" class="font-bold text-lg mb-4 text-text-primary">
        <slot name="header">{{ header }}</slot>
      </h3>
      <div>
        <slot />
      </div>
      <div v-if="$slots.footer" class="modal-action mt-4">
        <slot name="footer" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>
