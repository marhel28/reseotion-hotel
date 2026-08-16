import { reactive } from 'vue'

export interface ToastItem {
  id: number
  severity: 'success' | 'info' | 'warning' | 'error'
  summary: string
  detail?: string
}

const toasts = reactive<ToastItem[]>([])
let seq = 0

export function useToast() {
  return {
    add({ severity = 'info', summary, detail = '', life = 3000 }: {
      severity?: string
      summary: string
      detail?: string
      life?: number
    }) {
      const id = seq++
      toasts.push({ id, severity: severity as ToastItem['severity'], summary, detail })
      if (life) {
        setTimeout(() => {
          const i = toasts.findIndex(t => t.id === id)
          if (i >= 0) toasts.splice(i, 1)
        }, life)
      }
    },
    remove(id: number) {
      const i = toasts.findIndex(t => t.id === id)
      if (i >= 0) toasts.splice(i, 1)
    },
    clear() {
      toasts.length = 0
    }
  }
}

export function useToastState() {
  return toasts
}
