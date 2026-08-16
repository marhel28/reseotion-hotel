export interface Hotel {
  id: number
  name: string
  address: string
  phone: string
  email: string
  city: string
}

export interface RoomType {
  id: number
  name: string
  description: string
  baseRate: number
  capacity: number
  amenities: string[]
}

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'dirty' | 'cleaning' | 'maintenance' | 'out_of_order'
export type HousekeepingStatus = 'clean' | 'dirty' | 'cleaning' | 'inspected' | 'out_of_order'

export interface Room {
  id: number
  number: string
  floor: number
  typeId: number
  type?: RoomType
  status: RoomStatus
  guestId?: number
  guest?: Guest
  housekeepingStatus: HousekeepingStatus
  price: number
}

export type GuestStatus = 'active' | 'inactive' | 'vip'
export interface GuestPreference {
  roomType?: string
  floor?: string
  smoking?: boolean
  notes?: string
}
export interface Guest {
  id: number
  fullName: string
  email: string
  phone: string
  country: string
  idNumber: string
  totalStays: number
  totalSpent: number
  lastStay: string
  vip: boolean
  status: GuestStatus
  preferences: GuestPreference
  notes: string[]
  initials: string
}

export type ReservationStatus = 'confirmed' | 'pending' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
export type BookingSource = 'direct' | 'booking_com' | 'agoda' | 'expedia' | 'walk_in' | 'corporate'
export type PaymentStatus = 'paid' | 'pending' | 'partial' | 'refunded' | 'failed'

export interface Reservation {
  id: number
  bookingId: string
  guestId: number
  guest?: Guest
  roomId: number
  room?: Room
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  source: BookingSource
  paymentStatus: PaymentStatus
  status: ReservationStatus
  amount: number
  specialRequests: string
  createdAt: string
}

export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'qris' | 'online'
export type PaymentStatusType = 'completed' | 'pending' | 'refunded' | 'failed'
export interface Payment {
  id: number
  paymentId: string
  guestId: number
  guest?: Guest
  reservationId: number
  amount: number
  method: PaymentMethod
  date: string
  status: PaymentStatusType
  description: string
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'refunded'
export interface InvoiceLineItem {
  description: string
  amount: number
}
export interface Invoice {
  id: number
  invoiceNumber: string
  guestId: number
  guest?: Guest
  reservationId: number
  amount: number
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  charges: InvoiceLineItem[]
  taxes: number
  serviceCharge: number
  discount: number
  payments: { date: string; amount: number; method: string }[]
}

export type ExpenseCategory = 'utilities' | 'payroll' | 'maintenance' | 'supplies' | 'food_beverage' | 'marketing' | 'ota_commission' | 'other'
export type ExpenseStatus = 'approved' | 'pending' | 'rejected'
export interface Expense {
  id: number
  expenseId: string
  category: ExpenseCategory
  description: string
  amount: number
  date: string
  submittedBy: string
  status: ExpenseStatus
}

export type Department = 'front_office' | 'housekeeping' | 'finance' | 'management' | 'maintenance' | 'food_beverage'
export type StaffShift = 'morning' | 'afternoon' | 'night'
export type StaffStatus = 'active' | 'inactive' | 'on_leave'
export interface Staff {
  id: number
  name: string
  email: string
  role: string
  department: Department
  shift: StaffShift
  status: StaffStatus
  lastActive: string
  initials: string
  phone: string
}

export type UserRole = 'super_admin' | 'general_manager' | 'front_desk' | 'housekeeping' | 'finance' | 'staff'
export interface Role {
  id: number
  name: string
  permissions: Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }>
}

export type HousekeepingPriority = 'low' | 'medium' | 'high' | 'urgent'
export type HousekeepingTaskStatus = 'to_clean' | 'cleaning' | 'inspection' | 'completed'
export interface HousekeepingTask {
  id: number
  roomId: number
  room?: Room
  roomType: string
  guestId?: number
  guest?: Guest
  priority: HousekeepingPriority
  assignedStaffId?: number
  assignedStaff?: string
  time: string
  status: HousekeepingTaskStatus
  notes: string
}

export type NotificationType = 'reservation' | 'payment' | 'housekeeping' | 'maintenance' | 'system'
export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
}

export interface AuditLog {
  id: number
  time: string
  user: string
  action: string
  module: string
  description: string
  ip: string
  status: string
}

export interface RevenueMetric {
  totalRevenue: number
  roomRevenue: number
  fbRevenue: number
  otherRevenue: number
  adr: number
  revpar: number
  occupancy: number
}

export type ReportFormat = 'pdf' | 'excel' | 'csv'
export type ReportCategory = 'operations' | 'finance' | 'guests' | 'housekeeping'
export interface Report {
  id: number
  title: string
  description: string
  category: ReportCategory
  lastGenerated: string
  format: ReportFormat[]
}

export interface DashboardKpis {
  occupancy: number
  occupancyTrend: number
  todaysRevenue: number
  revenueTrend: number
  arrivals: number
  departures: number
  availableRooms: number
  totalRooms: number
  adr: number
  revpar: number
  pendingPayments: number
}

export interface ChartDataPoint {
  label: string
  value: number
}
