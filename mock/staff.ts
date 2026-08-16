export type Department =
  | 'front_office'
  | 'housekeeping'
  | 'finance'
  | 'management'
  | 'maintenance'
  | 'food_beverage'

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

export const staff: Staff[] = [
  {
    id: 1,
    name: 'Aditya Pratama',
    email: 'aditya.pratama@grandaurora.co.id',
    role: 'General Manager',
    department: 'management',
    shift: 'morning',
    status: 'active',
    lastActive: 'Today',
    initials: 'AP',
    phone: '+62 812-3456-7890',
  },
  {
    id: 2,
    name: 'Siti Rahma',
    email: 'siti.rahma@grandaurora.co.id',
    role: 'Front Desk Agent',
    department: 'front_office',
    shift: 'morning',
    status: 'active',
    lastActive: 'Today',
    initials: 'SR',
    phone: '+62 813-2468-1357',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    email: 'budi.santoso@grandaurora.co.id',
    role: 'Housekeeper',
    department: 'housekeeping',
    shift: 'morning',
    status: 'active',
    lastActive: 'Today',
    initials: 'BS',
    phone: '+62 857-1357-2468',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    email: 'dewi.lestari@grandaurora.co.id',
    role: 'Accountant',
    department: 'finance',
    shift: 'morning',
    status: 'active',
    lastActive: 'Yesterday',
    initials: 'DL',
    phone: '+62 821-9876-5432',
  },
  {
    id: 5,
    name: 'Eko Prasetyo',
    email: 'eko.prasetyo@grandaurora.co.id',
    role: 'Maintenance Engineer',
    department: 'maintenance',
    shift: 'afternoon',
    status: 'active',
    lastActive: 'Today',
    initials: 'EP',
    phone: '+62 856-1122-3344',
  },
  {
    id: 6,
    name: 'Fitri Handayani',
    email: 'fitri.handayani@grandaurora.co.id',
    role: 'F&B Manager',
    department: 'food_beverage',
    shift: 'morning',
    status: 'active',
    lastActive: 'Today',
    initials: 'FH',
    phone: '+62 811-4455-6677',
  },
  {
    id: 7,
    name: 'Gunawan Wijaya',
    email: 'gunawan.wijaya@grandaurora.co.id',
    role: 'Receptionist',
    department: 'front_office',
    shift: 'afternoon',
    status: 'active',
    lastActive: 'Yesterday',
    initials: 'GW',
    phone: '+62 878-9988-7766',
  },
  {
    id: 8,
    name: 'Hana Permata',
    email: 'hana.permata@grandaurora.co.id',
    role: 'Housekeeper',
    department: 'housekeeping',
    shift: 'morning',
    status: 'active',
    lastActive: 'Today',
    initials: 'HP',
    phone: '+62 857-5544-3322',
  },
  {
    id: 9,
    name: 'Irwan Setiawan',
    email: 'irwan.setiawan@grandaurora.co.id',
    role: 'Front Desk Agent',
    department: 'front_office',
    shift: 'night',
    status: 'active',
    lastActive: 'Today',
    initials: 'IS',
    phone: '+62 812-6677-8899',
  },
  {
    id: 10,
    name: 'Joko Widodo',
    email: 'joko.widodo@grandaurora.co.id',
    role: 'Housekeeper',
    department: 'housekeeping',
    shift: 'afternoon',
    status: 'on_leave',
    lastActive: 'Yesterday',
    initials: 'JW',
    phone: '+62 856-3344-5566',
  },
  {
    id: 11,
    name: 'Kartika Dewi',
    email: 'kartika.dewi@grandaurora.co.id',
    role: 'Receptionist',
    department: 'front_office',
    shift: 'night',
    status: 'active',
    lastActive: '2 days ago',
    initials: 'KD',
    phone: '+62 878-2211-0099',
  },
  {
    id: 12,
    name: 'Lukman Hakim',
    email: 'lukman.hakim@grandaurora.co.id',
    role: 'Maintenance Technician',
    department: 'maintenance',
    shift: 'night',
    status: 'active',
    lastActive: 'Today',
    initials: 'LH',
    phone: '+62 857-8899-0011',
  },
  {
    id: 13,
    name: 'Maya Sari',
    email: 'maya.sari@grandaurora.co.id',
    role: 'Senior Accountant',
    department: 'finance',
    shift: 'afternoon',
    status: 'active',
    lastActive: 'Today',
    initials: 'MS',
    phone: '+62 821-5566-7788',
  },
  {
    id: 14,
    name: 'Nanda Pratama',
    email: 'nanda.pratama@grandaurora.co.id',
    role: 'F&B Supervisor',
    department: 'food_beverage',
    shift: 'afternoon',
    status: 'on_leave',
    lastActive: 'Yesterday',
    initials: 'NP',
    phone: '+62 811-0099-8877',
  },
  {
    id: 15,
    name: 'Olivia Putri',
    email: 'olivia.putri@grandaurora.co.id',
    role: 'Housekeeper',
    department: 'housekeeping',
    shift: 'night',
    status: 'inactive',
    lastActive: '2 days ago',
    initials: 'OP',
    phone: '+62 856-7788-9900',
  },
]
