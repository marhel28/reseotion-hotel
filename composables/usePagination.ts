import { ref, computed } from 'vue'

export function usePagination(source: () => any[], rowsPerPage = 10) {
  const page = ref(0)

  const totalItems = computed(() => source().length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / rowsPerPage)))
  const startRow = computed(() => page.value * rowsPerPage)
  const endRow = computed(() => startRow.value + rowsPerPage)

  const paginatedRows = computed(() => {
    const arr = source()
    return arr.slice(startRow.value, endRow.value)
  })

  const pageRange = computed(() => {
    const pages: number[] = []
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
    return pages
  })

  function reset() {
    page.value = 0
  }

  return { page, totalItems, totalPages, startRow, endRow, paginatedRows, pageRange, rowsPerPage, reset }
}
