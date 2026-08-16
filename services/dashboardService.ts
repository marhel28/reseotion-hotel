import {
  mockDashboardKpis,
  mockRevenueOverviewChart,
  mockOccupancyChart,
  mockRoomStatusDonut,
  mockBookingSourcesChart,
  mockRecentReservations
} from '~/mock/dashboard'
import { mockRevenueTrend, mockRevenueByRoomType, mockRevenueBySource } from '~/mock/revenue'
import type { Reservation } from '~/types'
import { mockReservations } from '~/mock/reservations'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export const dashboardService = {
  async getKpis() {
    await delay()
    return { ...mockDashboardKpis }
  },

  async getRevenueOverview(period: string = '7days') {
    await delay()
    const found = mockRevenueOverviewChart.find(p => p.period === period) || mockRevenueOverviewChart.find(p => p.period === '7days')
    return found ? found.data : []
  },

  async getOccupancyTrend() {
    await delay()
    return [...mockOccupancyChart]
  },

  async getRoomStatusDistribution() {
    await delay()
    return [...mockRoomStatusDonut]
  },

  async getBookingSources() {
    await delay()
    return [...mockBookingSourcesChart]
  },

  async getRecentReservations(limit = 10): Promise<typeof mockRecentReservations> {
    await delay()
    return mockRecentReservations.slice(0, limit)
  },

  async getRevenueTrend() {
    await delay()
    return [...mockRevenueTrend]
  },

  async getRevenueByRoomType() {
    await delay()
    return [...mockRevenueByRoomType]
  },

  async getRevenueBySource() {
    await delay()
    return [...mockRevenueBySource]
  }
}
