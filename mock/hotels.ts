import type { Hotel } from '~/types'

export const mockHotels: Hotel[] = [
  {
    id: 1,
    name: 'Grand Aurora Hotel',
    address: 'Jl. Malioboro No. 1, Yogyakarta',
    phone: '+62 274 123456',
    email: 'info@grandaurora.co.id',
    city: 'Yogyakarta, Indonesia'
  },
  {
    id: 2,
    name: 'Aurora Beach Resort',
    address: 'Jl. Parangtritis KM 8, Bantul',
    phone: '+62 274 654321',
    email: 'stay@aurorabeach.co.id',
    city: 'Bantul, Yogyakarta'
  },
  {
    id: 3,
    name: 'Aurora City Hotel',
    address: 'Jl. Sudirman No. 88, Yogyakarta',
    phone: '+62 274 987654',
    email: 'hello@auroracity.co.id',
    city: 'Yogyakarta, Indonesia'
  }
]
