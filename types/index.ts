export interface MenuItem {
  id: string
  name: string
  description?: string
  price: string
  image?: string
  featured?: boolean
  stars?: number
  note?: string
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'halal')[]
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  description?: string
  items: MenuItem[]
}

export interface MenuData {
  categories: MenuCategory[]
}

export interface Review {
  id: string
  name: string
  initials: string
  rating: number
  review: string
  date: string
  dish?: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface ReservationFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  specialRequests?: string
}
