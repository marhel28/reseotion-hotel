export type NotificationType =
  | 'reservation'
  | 'payment'
  | 'housekeeping'
  | 'maintenance'
  | 'system'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: 'reservation',
    title: 'New Reservation',
    message: 'New reservation received for Room 204, arriving Aug 18',
    read: false,
    createdAt: '2026-08-16T14:23:11',
    link: '/reservations/2048',
  },
  {
    id: 2,
    type: 'housekeeping',
    title: 'Cleaning Required',
    message: 'Room 305 requires cleaning — checkout completed at 11:30',
    read: false,
    createdAt: '2026-08-16T13:45:00',
    link: '/housekeeping/305',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Pending',
    message: 'Payment for booking #RES-2048 is pending verification',
    read: false,
    createdAt: '2026-08-16T12:10:42',
    link: '/payments/RES-2048',
  },
  {
    id: 4,
    type: 'reservation',
    title: 'Check-in Reminder',
    message: 'Guest check-in scheduled in 30 minutes for Room 412',
    read: false,
    createdAt: '2026-08-16T13:30:00',
    link: '/guests/check-in',
  },
  {
    id: 5,
    type: 'maintenance',
    title: 'AC Repair Request',
    message: 'Maintenance request: AC repair Room 412 — guest reported warm room',
    read: false,
    createdAt: '2026-08-16T11:05:18',
    link: '/maintenance/requests/412',
  },
  {
    id: 6,
    type: 'system',
    title: 'Backup Completed',
    message: 'System backup completed successfully at 03:00',
    read: true,
    createdAt: '2026-08-16T03:00:05',
  },
  {
    id: 7,
    type: 'reservation',
    title: 'Cancellation',
    message: 'Booking #RES-1987 has beed cancelled by guest',
    read: false,
    createdAt: '2026-08-16T09:15:33',
    link: '/reservations/1987',
  },
  {
    id: 8,
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of Rp 4,500,000 received for invoice INV-2026-00014',
    read: true,
    createdAt: '2026-08-16T08:42:09',
    link: '/payments/INV-2026-00014',
  },
  {
    id: 9,
    type: 'housekeeping',
    title: 'Inspection Passed',
    message: 'Room 501 passed housekeeping inspection — ready for guest',
    read: true,
    createdAt: '2026-08-16T07:58:21',
    link: '/housekeeping/501',
  },
  {
    id: 10,
    type: 'maintenance',
    title: 'Elevator Service',
    message: 'Scheduled elevator maintenance completed — Elevator B back in service',
    read: true,
    createdAt: '2026-08-15T22:30:00',
    link: '/maintenance/elevators',
  },
  {
    id: 11,
    type: 'system',
    title: 'New Staff Added',
    message: 'New staff account created for Nanda Pratama (F&B Supervisor)',
    read: false,
    createdAt: '2026-08-15T19:12:44',
    link: '/staff/14',
  },
  {
    id: 12,
    type: 'reservation',
    title: 'Group Booking',
    message: 'Group booking of 12 rooms confirmed for Aug 20–23, PT Garuda Indonesia',
    read: false,
    createdAt: '2026-08-15T16:45:00',
    link: '/reservations/group/GRP-009',
  },
  {
    id: 13,
    type: 'payment',
    title: 'Refund Processed',
    message: 'Refund of Rp 1,200,000 processed for booking #RES-1876',
    read: true,
    createdAt: '2026-08-15T14:20:55',
    link: '/payments/refund/RES-1876',
  },
  {
    id: 14,
    type: 'housekeeping',
    title: 'Deep Clean Scheduled',
    message: 'Deep clean scheduled for Presidential Suite 510 — Aug 19',
    read: true,
    createdAt: '2026-08-15T11:00:00',
    link: '/housekeeping/510',
  },
  {
    id: 15,
    type: 'system',
    title: 'Rate Update',
    message: 'Room rates updated for Deluxe category — effective Aug 20',
    read: false,
    createdAt: '2026-08-15T10:05:30',
    link: '/settings/rates',
  },
]
