export interface DashboardKpis {
  occupancy: number;
  occupancyTrend: number;
  todaysRevenue: number;
  revenueTrend: number;
  arrivals: number;
  departures: number;
  availableRooms: number;
  totalRooms: number;
  adr: number;
  revpar: number;
  pendingPayments: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export const mockDashboardKpis: DashboardKpis = {
  occupancy: 82.4,
  occupancyTrend: 4.8,
  todaysRevenue: 48750000,
  revenueTrend: 12.4,
  arrivals: 32,
  departures: 27,
  availableRooms: 41,
  totalRooms: 180,
  adr: 1245000,
  revpar: 1025000,
  pendingPayments: 12450000,
};

export const mockRevenueOverviewChart: {
  period: string;
  data: { date: string; room: number; fb: number; other: number }[];
}[] = [
  {
    period: "today",
    data: [
      { date: "06:00", room: 1250000, fb: 180000, other: 45000 },
      { date: "07:00", room: 2800000, fb: 520000, other: 120000 },
      { date: "08:00", room: 4200000, fb: 1350000, other: 280000 },
      { date: "09:00", room: 5100000, fb: 2100000, other: 410000 },
      { date: "10:00", room: 5800000, fb: 2650000, other: 520000 },
      { date: "11:00", room: 6400000, fb: 3100000, other: 640000 },
      { date: "12:00", room: 7200000, fb: 4200000, other: 780000 },
      { date: "13:00", room: 7800000, fb: 4850000, other: 890000 },
      { date: "14:00", room: 8300000, fb: 5200000, other: 950000 },
      { date: "15:00", room: 8900000, fb: 5600000, other: 1020000 },
      { date: "16:00", room: 9400000, fb: 5900000, other: 1100000 },
      { date: "17:00", room: 10100000, fb: 6300000, other: 1180000 },
      { date: "18:00", room: 10800000, fb: 7100000, other: 1250000 },
      { date: "19:00", room: 11500000, fb: 7800000, other: 1340000 },
      { date: "20:00", room: 12100000, fb: 8200000, other: 1420000 },
      { date: "21:00", room: 12600000, fb: 8500000, other: 1480000 },
      { date: "22:00", room: 13000000, fb: 8750000, other: 1520000 },
      { date: "23:00", room: 13350000, fb: 8900000, other: 1550000 },
    ],
  },
  {
    period: "7days",
    data: [
      { date: "2026-08-10", room: 38200000, fb: 12400000, other: 3200000 },
      { date: "2026-08-11", room: 41500000, fb: 13800000, other: 3600000 },
      { date: "2026-08-12", room: 39800000, fb: 12900000, other: 3400000 },
      { date: "2026-08-13", room: 43200000, fb: 14500000, other: 3800000 },
      { date: "2026-08-14", room: 46800000, fb: 16200000, other: 4100000 },
      { date: "2026-08-15", room: 52400000, fb: 18600000, other: 4700000 },
      { date: "2026-08-16", room: 48750000, fb: 17100000, other: 4350000 },
    ],
  },
  {
    period: "30days",
    data: [
      { date: "2026-07-17", room: 35200000, fb: 10800000, other: 2800000 },
      { date: "2026-07-18", room: 38900000, fb: 12100000, other: 3100000 },
      { date: "2026-07-19", room: 36400000, fb: 11200000, other: 2900000 },
      { date: "2026-07-20", room: 33800000, fb: 10500000, other: 2700000 },
      { date: "2026-07-21", room: 34500000, fb: 10800000, other: 2800000 },
      { date: "2026-07-22", room: 36100000, fb: 11400000, other: 2900000 },
      { date: "2026-07-23", room: 37800000, fb: 11900000, other: 3000000 },
      { date: "2026-07-24", room: 41200000, fb: 13200000, other: 3400000 },
      { date: "2026-07-25", room: 44600000, fb: 14500000, other: 3700000 },
      { date: "2026-07-26", room: 42100000, fb: 13800000, other: 3500000 },
      { date: "2026-07-27", room: 38500000, fb: 12400000, other: 3200000 },
      { date: "2026-07-28", room: 39200000, fb: 12600000, other: 3200000 },
      { date: "2026-07-29", room: 40800000, fb: 13100000, other: 3300000 },
      { date: "2026-07-30", room: 42500000, fb: 13700000, other: 3500000 },
      { date: "2026-07-31", room: 45900000, fb: 14900000, other: 3800000 },
      { date: "2026-08-01", room: 48200000, fb: 15800000, other: 4000000 },
      { date: "2026-08-02", room: 46100000, fb: 15100000, other: 3800000 },
      { date: "2026-08-03", room: 41800000, fb: 13500000, other: 3400000 },
      { date: "2026-08-04", room: 40200000, fb: 12900000, other: 3300000 },
      { date: "2026-08-05", room: 41500000, fb: 13400000, other: 3400000 },
      { date: "2026-08-06", room: 43100000, fb: 14000000, other: 3600000 },
      { date: "2026-08-07", room: 46800000, fb: 15400000, other: 3900000 },
      { date: "2026-08-08", room: 50400000, fb: 16800000, other: 4200000 },
      { date: "2026-08-09", room: 47600000, fb: 15700000, other: 4000000 },
      { date: "2026-08-10", room: 38200000, fb: 12400000, other: 3200000 },
      { date: "2026-08-11", room: 41500000, fb: 13800000, other: 3600000 },
      { date: "2026-08-12", room: 39800000, fb: 12900000, other: 3400000 },
      { date: "2026-08-13", room: 43200000, fb: 14500000, other: 3800000 },
      { date: "2026-08-14", room: 46800000, fb: 16200000, other: 4100000 },
      { date: "2026-08-15", room: 52400000, fb: 18600000, other: 4700000 },
      { date: "2026-08-16", room: 48750000, fb: 17100000, other: 4350000 },
    ],
  },
  {
    period: "12months",
    data: [
      { date: "2025-09", room: 1085000000, fb: 342000000, other: 89000000 },
      { date: "2025-10", room: 1152000000, fb: 368000000, other: 95000000 },
      { date: "2025-11", room: 1245000000, fb: 402000000, other: 104000000 },
      { date: "2025-12", room: 1480000000, fb: 485000000, other: 126000000 },
      { date: "2026-01", room: 1120000000, fb: 354000000, other: 92000000 },
      { date: "2026-02", room: 1050000000, fb: 328000000, other: 85000000 },
      { date: "2026-03", room: 1180000000, fb: 376000000, other: 98000000 },
      { date: "2026-04", room: 1260000000, fb: 408000000, other: 106000000 },
      { date: "2026-05", room: 1340000000, fb: 435000000, other: 113000000 },
      { date: "2026-06", room: 1410000000, fb: 462000000, other: 120000000 },
      { date: "2026-07", room: 1520000000, fb: 504000000, other: 131000000 },
      { date: "2026-08", room: 1380000000, fb: 452000000, other: 118000000 },
    ],
  },
];

export const mockOccupancyChart: { date: string; rate: number }[] = [
  { date: "2026-08-03", rate: 76.2 },
  { date: "2026-08-04", rate: 78.5 },
  { date: "2026-08-05", rate: 77.1 },
  { date: "2026-08-06", rate: 80.3 },
  { date: "2026-08-07", rate: 84.7 },
  { date: "2026-08-08", rate: 88.2 },
  { date: "2026-08-09", rate: 85.6 },
  { date: "2026-08-10", rate: 75.8 },
  { date: "2026-08-11", rate: 79.4 },
  { date: "2026-08-12", rate: 77.6 },
  { date: "2026-08-13", rate: 81.2 },
  { date: "2026-08-14", rate: 85.1 },
  { date: "2026-08-15", rate: 89.3 },
  { date: "2026-08-16", rate: 82.4 },
];

export const mockRoomStatusDonut: ChartDataPoint[] = [
  { label: "Occupied", value: 139 },
  { label: "Available", value: 23 },
  { label: "Dirty", value: 5 },
  { label: "Cleaning", value: 8 },
  { label: "Maintenance", value: 6 },
  { label: "Out of Order", value: 9 },
];

export const mockBookingSourcesChart: ChartDataPoint[] = [
  { label: "Direct", value: 42 },
  { label: "Booking.com", value: 38 },
  { label: "Agoda", value: 25 },
  { label: "Expedia", value: 18 },
  { label: "Walk-in", value: 31 },
  { label: "Corporate", value: 26 },
];

export const mockRecentReservations: {
  bookingId: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  source: string;
  amount: number;
  status: string;
}[] = [
  {
    bookingId: "HTL-2026-081601",
    guest: "Andi Pratama",
    room: "Deluxe King — 402",
    checkIn: "2026-08-16",
    checkOut: "2026-08-18",
    source: "Direct",
    amount: 2400000,
    status: "checked_in",
  },
  {
    bookingId: "HTL-2026-081602",
    guest: "Sarah Mitchell",
    room: "Executive — 705",
    checkIn: "2026-08-16",
    checkOut: "2026-08-19",
    source: "Booking.com",
    amount: 5400000,
    status: "checked_in",
  },
  {
    bookingId: "HTL-2026-081603",
    guest: "Yuki Tanaka",
    room: "Suite — 1201",
    checkIn: "2026-08-16",
    checkOut: "2026-08-20",
    source: "Expedia",
    amount: 14000000,
    status: "confirmed",
  },
  {
    bookingId: "HTL-2026-081504",
    guest: "Budi Santoso",
    room: "Family — 308",
    checkIn: "2026-08-15",
    checkOut: "2026-08-17",
    source: "Agoda",
    amount: 4400000,
    status: "checked_out",
  },
  {
    bookingId: "HTL-2026-081505",
    guest: "Emily Chen",
    room: "Deluxe Twin — 512",
    checkIn: "2026-08-15",
    checkOut: "2026-08-16",
    source: "Walk-in",
    amount: 1200000,
    status: "checked_out",
  },
  {
    bookingId: "HTL-2026-081506",
    guest: "Hartono & Partners",
    room: "Presidential Suite — 1501",
    checkIn: "2026-08-15",
    checkOut: "2026-08-18",
    source: "Corporate",
    amount: 24000000,
    status: "checked_in",
  },
  {
    bookingId: "HTL-2026-081507",
    guest: "Rina Wulandari",
    room: "Deluxe King — 410",
    checkIn: "2026-08-15",
    checkOut: "2026-08-16",
    source: "Direct",
    amount: 1200000,
    status: "checked_out",
  },
  {
    bookingId: "HTL-2026-081408",
    guest: "James O'Connor",
    room: "Executive — 708",
    checkIn: "2026-08-14",
    checkOut: "2026-08-17",
    source: "Booking.com",
    amount: 5400000,
    status: "checked_in",
  },
  {
    bookingId: "HTL-2026-081409",
    guest: "Mei Ling",
    room: "Deluxe Twin — 515",
    checkIn: "2026-08-14",
    checkOut: "2026-08-16",
    source: "Agoda",
    amount: 2400000,
    status: "checked_out",
  },
  {
    bookingId: "HTL-2026-081410",
    guest: "David Rahman",
    room: "Family — 310",
    checkIn: "2026-08-14",
    checkOut: "2026-08-16",
    source: "Direct",
    amount: 4400000,
    status: "no_show",
  },
];
