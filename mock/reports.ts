export type ReportFormat = 'pdf' | 'excel' | 'csv'

export type ReportCategory =
  | 'operations'
  | 'finance'
  | 'guests'
  | 'housekeeping'

export interface Report {
  id: number
  title: string
  description: string
  category: ReportCategory
  lastGenerated: string
  format: ReportFormat[]
}

export const reports: Report[] = [
  {
    id: 1,
    title: 'Occupancy Report',
    description: 'Daily and monthly room occupancy rates with trend analysis',
    category: 'operations',
    lastGenerated: 'Today',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 2,
    title: 'Room Status Report',
    description: 'Current status of all rooms across the property',
    category: 'operations',
    lastGenerated: 'Today',
    format: ['pdf', 'excel'],
  },
  {
    id: 3,
    title: 'Arrival Report',
    description: 'Expected guest arrivals for the selected date range',
    category: 'operations',
    lastGenerated: 'Yesterday',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 4,
    title: 'Departure Report',
    description: 'Scheduled departures and checkout status',
    category: 'operations',
    lastGenerated: 'Yesterday',
    format: ['pdf', 'excel'],
  },
  {
    id: 5,
    title: 'Revenue Report',
    description: 'Total revenue breakdown by room type, restaurant, and services',
    category: 'finance',
    lastGenerated: 'Today',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 6,
    title: 'Payment Report',
    description: 'All payment transactions with status and method breakdown',
    category: 'finance',
    lastGenerated: '2 days ago',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 7,
    title: 'Expense Report',
    description: 'Operational expenses categorized by department',
    category: 'finance',
    lastGenerated: '3 days ago',
    format: ['pdf', 'excel'],
  },
  {
    id: 8,
    title: 'Tax Report',
    description: 'Tax collection summary for government reporting (PPn, PB1)',
    category: 'finance',
    lastGenerated: '5 days ago',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 9,
    title: 'Guest Demographics',
    description: 'Guest nationality, age group, and origin distribution',
    category: 'guests',
    lastGenerated: 'Yesterday',
    format: ['pdf', 'excel'],
  },
  {
    id: 10,
    title: 'Guest Stay History',
    description: 'Individual guest stay history and preferences',
    category: 'guests',
    lastGenerated: '4 days ago',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 11,
    title: 'Repeat Guest Report',
    description: 'Loyalty analysis and repeat guest frequency',
    category: 'guests',
    lastGenerated: '6 days ago',
    format: ['pdf', 'excel'],
  },
  {
    id: 12,
    title: 'Cleaning Performance',
    description: 'Housekeeping staff productivity and room turnaround metrics',
    category: 'housekeeping',
    lastGenerated: '2 days ago',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 13,
    title: 'Room Turnaround Time',
    description: 'Time from checkout to room-ready status by room type',
    category: 'housekeeping',
    lastGenerated: '3 days ago',
    format: ['pdf', 'excel'],
  },
  {
    id: 14,
    title: 'Booking Source Report',
    description: 'Reservation breakdown by booking channel (OTA, direct, walk-in)',
    category: 'operations',
    lastGenerated: '4 days ago',
    format: ['pdf', 'excel', 'csv'],
  },
  {
    id: 15,
    title: 'Daily Operations Summary',
    description: 'Comprehensive daily snapshot of all hotel operations',
    category: 'operations',
    lastGenerated: 'Today',
    format: ['pdf'],
  },
  {
    id: 16,
    title: 'Monthly Financial Overview',
    description: 'Monthly P&L summary with budget vs actual comparison',
    category: 'finance',
    lastGenerated: '1 week ago',
    format: ['pdf', 'excel'],
  },
]
