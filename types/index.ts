export type Locale = 'en' | 'fi'

export interface LocalizedText {
  en: string
  fi: string
}

export interface MenuItem {
  id: string
  name: LocalizedText
  description?: LocalizedText
  price: LocalizedText
  image?: string
  featured?: boolean
  stars?: number
  note?: LocalizedText
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'halal')[]
}

export interface MenuCategory {
  id: string
  name: LocalizedText
  icon: string
  description?: LocalizedText
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
  review: LocalizedText
  date: LocalizedText
  dish?: LocalizedText
}

export interface GalleryImage {
  src: string
  alt: LocalizedText
  aspect?: string
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
