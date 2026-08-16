import { ref } from 'vue'

export interface ConfirmOptions {
  message?: string
  header?: string
  icon?: string
  rejectLabel?: string
  acceptLabel?: string
  acceptClass?: string
  accept?: () => void
  reject?: () => void
}

let pending: {
  options: ConfirmOptions
  resolve: (val: boolean) => void
} | null = null

const dialogVisible = ref(false)
const current = ref<ConfirmOptions>({})

export function useConfirm() {
  function require(options: ConfirmOptions): Promise<boolean> {
    current.value = options
    dialogVisible.value = true
    return new Promise<boolean>((resolve) => {
      pending = { options, resolve }
    })
  }

  return { require }
}

export function useConfirmState() {
  return { dialogVisible, current }
}

export function confirmAccept() {
  pending?.options.accept?.()
  pending?.resolve(true)
  pending = null
  dialogVisible.value = false
}

export function confirmReject() {
  pending?.options.reject?.()
  pending?.resolve(false)
  pending = null
  dialogVisible.value = false
}
