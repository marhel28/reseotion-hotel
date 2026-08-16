/**
 * Insert dot as thousands separator (Indonesian convention).
 * Deterministic — no Intl/ICU dependency, identical on server and client.
 */
function dotThousands(n: number): string {
  const negative = n < 0
  const s = Math.round(Math.abs(n)).toString()
  const grouped = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return negative ? `-${grouped}` : grouped
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Format a number as Indonesian Rupiah.
 * ALWAYS "Rp 1.250.000" — never abbreviated like "Rp 1.25M".
 */
export function formatRupiah(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return 'Rp 0'
  return `Rp ${dotThousands(amount)}`
}

/**
 * Format number with thousand separators (no currency).
 */
export function formatNumber(n: number): string {
  if (n === null || n === undefined || isNaN(n)) return '0'
  return dotThousands(n)
}

/**
 * Format percentage with 1 decimal.
 */
export function formatPercent(n: number): string {
  if (n === null || n === undefined || isNaN(n)) return '0%'
  return `${n.toFixed(1)}%`
}

/**
 * Format a number as a compact shorthand (1.2M, 850K, etc).
 */
export function formatCompact(n: number): string {
  if (n === null || n === undefined || isNaN(n)) return '0'
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return dotThousands(n)
}

/**
 * Format date to "16 Aug 2026" — deterministic, locale-independent.
 */
export function formatDate(date: string | Date): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
}

/**
 * Format date with full month — "16 August 2026".
 */
export function formatDateLong(date: string | Date): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`
}

/**
 * Format time as "HH:MM" — deterministic.
 */
export function formatTime(date: string | Date): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

/**
 * Format datetime combined — "16 Aug 2026 14:30".
 */
export function formatDateTime(date: string | Date): string {
  if (!date) return '-'
  return `${formatDate(date)} ${formatTime(date)}`
}

/**
 * Get greeting based on time of day.
 */
export function getGreeting(lang: string = 'en'): string {
  const hour = new Date().getHours()
  if (lang === 'id') {
    if (hour < 12) return 'Selamat pagi'
    if (hour < 15) return 'Selamat siang'
    if (hour < 18) return 'Selamat sore'
    return 'Selamat malam'
  }
  if (hour < 12) return 'Good morning'
  if (hour < 15) return 'Good afternoon'
  if (hour < 18) return 'Good evening'
  return 'Good night'
}

/**
 * Calculate nights between two dates.
 */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn)
  const b = new Date(checkOut)
  return Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}
