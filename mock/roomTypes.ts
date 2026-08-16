export interface RoomType {
  id: number;
  name: string;
  description: string;
  baseRate: number;
  capacity: number;
  amenities: string[];
}

const roomTypes: RoomType[] = [
  {
    id: 1,
    name: "Deluxe King",
    description: "A refined retreat featuring a plush king bed and modern comforts, perfect for couples or solo travelers seeking understated luxury.",
    baseRate: 1200000,
    capacity: 2,
    amenities: ["King bed", "Free WiFi", "Air conditioning", "Minibar", "Smart TV", "Safe"],
  },
  {
    id: 2,
    name: "Deluxe Twin",
    description: "Elegantly appointed with two comfortable twin beds, ideal for friends or colleagues traveling together without compromising on style.",
    baseRate: 1200000,
    capacity: 2,
    amenities: ["Twin beds", "Free WiFi", "Air conditioning", "Minibar", "Smart TV", "Safe"],
  },
  {
    id: 3,
    name: "Executive",
    description: "A sophisticated sanctuary with a city-view workspace and lounge access, tailored for the discerning business traveler.",
    baseRate: 1800000,
    capacity: 2,
    amenities: ["King bed", "City view", "Free WiFi", "Air conditioning", "Minibar", "Smart TV", "Safe", "Work desk", "Lounge access"],
  },
  {
    id: 4,
    name: "Family",
    description: "Spacious and welcoming, with a king bed and bunk bed plus family-friendly amenities, designed to make every stay memorable for all ages.",
    baseRate: 2200000,
    capacity: 4,
    amenities: ["King bed + bunk bed", "Free WiFi", "Air conditioning", "Minibar", "Smart TV", "Safe", "Microwave"],
  },
  {
    id: 5,
    name: "Suite",
    description: "An expansive haven with a separate living room, private bathtub, and dedicated butler service for an indulgent, elevated experience.",
    baseRate: 3500000,
    capacity: 3,
    amenities: ["Separate living room", "King bed", "City view", "Free WiFi", "Air conditioning", "Full minibar", "Smart TV", "Safe", "Bathtub", "Lounge access", "Butler service"],
  },
  {
    id: 6,
    name: "Presidential Suite",
    description: "The pinnacle of opulence — two bedrooms, panoramic views, a private balcony, and Jacuzzi, complemented by butler service and airport transfer.",
    baseRate: 8000000,
    capacity: 4,
    amenities: ["Panoramic view", "2 bedrooms", "Living room", "Dining room", "Jacuzzi", "Free WiFi", "Air conditioning", "Full bar", "Smart TV", "Safe", "Private balcony", "Butler service", "Airport transfer"],
  },
];

export default roomTypes;
