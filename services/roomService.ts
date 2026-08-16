import { mockRooms } from '~/mock/rooms'
import type { Room, RoomStatus } from '~/types'

const delay = (ms = 150) => new Promise(r => setTimeout(r, ms))

export const roomService = {
  async getAll(): Promise<Room[]> {
    await delay()
    return [...mockRooms]
  },

  async getById(id: number): Promise<Room | undefined> {
    await delay()
    return mockRooms.find(r => r.id === id)
  },

  async getByStatus(status: RoomStatus): Promise<Room[]> {
    await delay()
    return mockRooms.filter(r => r.status === status)
  },

  async getByFloor(floor: number): Promise<Room[]> {
    await delay()
    return mockRooms.filter(r => r.floor === floor)
  },

  async updateStatus(id: number, status: RoomStatus): Promise<void> {
    await delay(200)
    const room = mockRooms.find(r => r.id === id)
    if (room) room.status = status
  },

  async getStats(): Promise<{ total: number; available: number; occupied: number; reserved: number; dirty: number; cleaning: number; maintenance: number; outOfOrder: number }> {
    await delay()
    return {
      total: mockRooms.length,
      available: mockRooms.filter(r => r.status === 'available').length,
      occupied: mockRooms.filter(r => r.status === 'occupied').length,
      reserved: mockRooms.filter(r => r.status === 'reserved').length,
      dirty: mockRooms.filter(r => r.status === 'dirty').length,
      cleaning: mockRooms.filter(r => r.status === 'cleaning').length,
      maintenance: mockRooms.filter(r => r.status === 'maintenance').length,
      outOfOrder: mockRooms.filter(r => r.status === 'out_of_order').length,
    }
  }
}
