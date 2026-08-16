import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockHotels } from '~/mock/hotels'

export const useHotelStore = defineStore('hotel', () => {
  const hotels = ref(mockHotels)
  const currentHotelId = ref(mockHotels[0]?.id ?? 1)

  const currentHotel = computed(() =>
    hotels.value.find(h => h.id === currentHotelId.value) ?? hotels.value[0]
  )

  function selectHotel(id: number) {
    currentHotelId.value = id
  }

  return { hotels, currentHotelId, currentHotel, selectHotel }
})
