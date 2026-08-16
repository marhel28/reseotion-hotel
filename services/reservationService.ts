import { mockReservations } from '~/mock/reservations'
import type { Reservation } from '~/types'

// Simulated delay
const delay = (ms = 150) => new Promise(r => setTimeout(r, ms))

export const reservationService = {
  async getAll(): Promise<Reservation[]> {
    await delay()
    return [...mockReservations]
  },

  async getById(id: number): Promise<Reservation | undefined> {
    await delay()
    return mockReservations.find(r => r.id === id)
  },

  async getByStatus(status: string): Promise<Reservation[]> {
    await delay()
    return mockReservations.filter(r => r.status === status)
  },

  async create(data: Partial<Reservation>): Promise<Reservation> {
    await delay(300)
    const newRes: Reservation = {
      id: mockReservations.length + 1,
      bookingId: `RES-${2048 + mockReservations.length}`,
      guestId: data.guestId || 1,
      roomId: data.roomId || 1,
      roomType: data.roomType || 'Deluxe King',
      checkIn: data.checkIn || new Date().toISOString(),
      checkOut: data.checkOut || new Date().toISOString(),
      nights: data.nights || 1,
      guests: data.guests || 1,
      source: data.source || 'direct',
      paymentStatus: 'pending',
      status: 'confirmed',
      amount: data.amount || 1200000,
      specialRequests: data.specialRequests || '',
      createdAt: new Date().toISOString()
    }
    mockReservations.push(newRes)
    return newRes
  },

  async updateStatus(id: number, status: string): Promise<void> {
    await delay(200)
    const res = mockReservations.find(r => r.id === id)
    if (res) res.status = status as any
  },

  async cancel(id: number): Promise<void> {
    await this.updateStatus(id, 'cancelled')
  }
}
