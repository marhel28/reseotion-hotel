import type { RevenueMetric } from '../types'

export const mockRevenue: RevenueMetric = {
  totalRevenue: 850_000_000,
  roomRevenue: 620_000_000,
  fbRevenue: 165_000_000,
  otherRevenue: 65_000_000,
  adr: 1_245_000,
  revpar: 1_025_000,
  occupancy: 82.4,
}

export const mockRevenueTrend: { month: string; room: number; fb: number; other: number }[] = [
  { month: 'Sep 2025', room: 480_000_000, fb: 120_000_000, other: 42_000_000 },
  { month: 'Oct 2025', room: 520_000_000, fb: 135_000_000, other: 48_000_000 },
  { month: 'Nov 2025', room: 550_000_000, fb: 140_000_000, other: 52_000_000 },
  { month: 'Dec 2025', room: 680_000_000, fb: 190_000_000, other: 72_000_000 },
  { month: 'Jan 2026', room: 590_000_000, fb: 155_000_000, other: 58_000_000 },
  { month: 'Feb 2026', room: 540_000_000, fb: 145_000_000, other: 55_000_000 },
  { month: 'Mar 2026', room: 570_000_000, fb: 150_000_000, other: 60_000_000 },
  { month: 'Apr 2026', room: 600_000_000, fb: 160_000_000, other: 62_000_000 },
  { month: 'May 2026', room: 610_000_000, fb: 158_000_000, other: 61_000_000 },
  { month: 'Jun 2026', room: 640_000_000, fb: 170_000_000, other: 68_000_000 },
  { month: 'Jul 2026', room: 665_000_000, fb: 178_000_000, other: 70_000_000 },
  { month: 'Aug 2026', room: 620_000_000, fb: 165_000_000, other: 65_000_000 },
]

export const mockRevenueByRoomType: { type: string; revenue: number }[] = [
  { type: 'Standard', revenue: 95_000_000 },
  { type: 'Superior', revenue: 125_000_000 },
  { type: 'Deluxe', revenue: 165_000_000 },
  { type: 'Suite', revenue: 145_000_000 },
  { type: 'Presidential Suite', revenue: 68_000_000 },
  { type: 'Villa', revenue: 22_000_000 },
]

export const mockRevenueBySource: { source: string; revenue: number }[] = [
  { source: 'Direct Booking', revenue: 245_000_000 },
  { source: 'Booking.com', revenue: 165_000_000 },
  { source: 'Agoda', revenue: 120_000_000 },
  { source: 'Expedia', revenue: 85_000_000 },
  { source: 'Travel Agents', revenue: 140_000_000 },
  { source: 'Walk-in', revenue: 95_000_000 },
]

export const mockDailyRevenue: { date: string; revenue: number }[] = [
  { date: '2026-07-17', revenue: 22_400_000 },
  { date: '2026-07-18', revenue: 28_600_000 },
  { date: '2026-07-19', revenue: 31_200_000 },
  { date: '2026-07-20', revenue: 19_800_000 },
  { date: '2026-07-21', revenue: 18_500_000 },
  { date: '2026-07-22', revenue: 20_100_000 },
  { date: '2026-07-23', revenue: 21_400_000 },
  { date: '2026-07-24', revenue: 26_800_000 },
  { date: '2026-07-25', revenue: 30_500_000 },
  { date: '2026-07-26', revenue: 33_200_000 },
  { date: '2026-07-27', revenue: 20_900_000 },
  { date: '2026-07-28', revenue: 19_200_000 },
  { date: '2026-07-29', revenue: 21_600_000 },
  { date: '2026-07-30', revenue: 23_100_000 },
  { date: '2026-07-31', revenue: 27_400_000 },
  { date: '2026-08-01', revenue: 32_800_000 },
  { date: '2026-08-02', revenue: 35_100_000 },
  { date: '2026-08-03', revenue: 22_600_000 },
  { date: '2026-08-04', revenue: 20_300_000 },
  { date: '2026-08-05', revenue: 21_800_000 },
  { date: '2026-08-06', revenue: 24_200_000 },
  { date: '2026-08-07', revenue: 26_500_000 },
  { date: '2026-08-08', revenue: 30_900_000 },
  { date: '2026-08-09', revenue: 34_600_000 },
  { date: '2026-08-10', revenue: 23_400_000 },
  { date: '2026-08-11', revenue: 21_100_000 },
  { date: '2026-08-12', revenue: 22_700_000 },
  { date: '2026-08-13', revenue: 25_300_000 },
  { date: '2026-08-14', revenue: 27_800_000 },
  { date: '2026-08-15', revenue: 31_500_000 },
]
