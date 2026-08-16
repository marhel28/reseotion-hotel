import { mockGuests } from '~/mock/guests'
import type { Guest } from '~/types'

const delay = (ms = 150) => new Promise(r => setTimeout(r, ms))

export const guestService = {
  async getAll(): Promise<Guest[]> {
    await delay()
    return [...mockGuests]
  },

  async getById(id: number): Promise<Guest | undefined> {
    await delay()
    return mockGuests.find(g => g.id === id)
  },

  async search(query: string): Promise<Guest[]> {
    await delay()
    const q = query.toLowerCase()
    return mockGuests.filter(g =>
      g.fullName.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.country.toLowerCase().includes(q)
    )
  },

  async create(data: Partial<Guest>): Promise<Guest> {
    await delay(300)
    const newGuest: Guest = {
      id: mockGuests.length + 1,
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      country: data.country || '',
      idNumber: data.idNumber || '',
      totalStays: 0,
      totalSpent: 0,
      lastStay: '',
      vip: false,
      status: 'active',
      preferences: {},
      notes: [],
      initials: (data.fullName || 'NA').split(' ').map(n => n[0]).join('').toUpperCase()
    }
    mockGuests.push(newGuest)
    return newGuest
  }
}
