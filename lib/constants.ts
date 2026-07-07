import type { LocalizedText } from '@/types'

export const NAV_LINKS: { label: LocalizedText; href: string }[] = [
  { label: { en: 'About', fi: 'Meistä' }, href: '#about' },
  { label: { en: 'Menu', fi: 'Ruokalista' }, href: '#menu' },
  { label: { en: 'Chef', fi: 'Kokki' }, href: '#chef' },
  { label: { en: 'Gallery', fi: 'Galleria' }, href: '#gallery' },
  { label: { en: 'Reviews', fi: 'Arvostelut' }, href: '#reviews' },
  { label: { en: 'Reservations', fi: 'Pöytävaraukset' }, href: '#reservations' },
]

export const CONTACT_INFO = {
  address: 'Länsiranta 8, Salo 24100',
  phone: '+358 40 123 4567',
  email: 'Liorarestaurant@gmail.com',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.9!2d-6.2603!3d53.3498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDIwJzU5LjMiTiA2wrAxNSczNy4wIlc!5e0!3m2!1sen!2sie!4v1700000000000',
}

export const OPENING_HOURS: { days: LocalizedText; hours: string }[] = [
  { days: { en: 'Mon–Thu', fi: 'Ma–To' }, hours: '10.30–22.00' },
  { days: { en: 'Fri', fi: 'Pe' }, hours: '10.30–23.00' },
  { days: { en: 'Sat', fi: 'La' }, hours: '11.00–23.00' },
  { days: { en: 'Sun', fi: 'Su' }, hours: '11.00–21.00' },
]

export const RESERVATION_TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '17:00', '17:30', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

export const SIGNATURE_DISHES: {
  id: string
  name: LocalizedText
  price: string
  description: LocalizedText
  image: string
  stars: number
  category: LocalizedText
  for?: LocalizedText
}[] = [
  {
    id: 'liora-mixed-grill',
    name: { en: 'Liora Mixed Grill', fi: 'Liora Sekagrilli' },
    price: '€52.90',
    description: {
      en: 'Our signature sharing platter — Chicken Shish, Shish Kebab, Lamb Ribs and your choice of side.',
      fi: 'Talon suosikkilautanen jaettavaksi — Kana Shish, Shish Kebab, lampaan kylkiluut ja valitsemasi lisuke.',
    },
    image: '/images/dishes/turkish-mixed-grill-platter.jpeg',
    stars: 3,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
    for: { en: '2 Persons', fi: '2 hengelle' },
  },
  {
    id: 'burrata-pizza',
    name: { en: 'Burrata Pizza', fi: 'Burrata-pizza' },
    price: '€15.90',
    description: {
      en: 'Fresh burrata on tomato sauce with cherry tomatoes, basil oil, and cracked black pepper.',
      fi: 'Tuoretta burrataa tomaattikastikkeen päällä kirsikkatomaattien, basilikaöljyn ja rouhitun mustapippurin kera.',
    },
    image: '/images/dishes/burrata-pizza.jpeg',
    stars: 2,
    category: { en: 'Handcrafted Pizza', fi: 'Käsintehty pizza' },
  },
  {
    id: 'beef-tenderloin-shish',
    name: { en: 'Beef Tenderloin Shish', fi: 'Naudan sisäfilee Shish' },
    price: '€17.90',
    description: {
      en: 'Premium beef tenderloin, hand-cut and skewered, charcoal-grilled to your desired temperature.',
      fi: 'Ensiluokkaista naudan sisäfileetä, käsin leikattuna ja vartaaseen pujotettuna, hiiligrillattuna toiveesi mukaan.',
    },
    image: '/images/dishes/grilled-beef-skewer.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
  },
  {
    id: 'lamb-chops',
    name: { en: 'Lamb Chops', fi: 'Lampaankyljykset' },
    price: '€23.90',
    description: {
      en: 'Tender lamb chops marinated in herbs, seared over high-heat charcoal flames.',
      fi: 'Meheviä lampaankyljyksiä marinoituna yrteillä, paahdettuna kuumilla hiilillä.',
    },
    image: '/images/dishes/grilled-lamb-chops.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
  },
  {
    id: 'grilled-salmon',
    name: { en: 'Grilled Salmon', fi: 'Grillattu lohi' },
    price: '€21.90',
    description: {
      en: 'Fresh Atlantic salmon fillet char-grilled and served with Mediterranean herbs.',
      fi: 'Tuoretta Atlantin lohifileetä hiiligrillattuna, tarjolla Välimeren yrttien kera.',
    },
    image: '/images/dishes/mediterranian-grilled-salmon.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
  },
  {
    id: 'the-boss-double',
    name: { en: 'The Boss Double', fi: 'The Boss Double' },
    price: '€19.90',
    description: {
      en: 'Two charcoal-grilled beef patties, double cheese, crispy onions, and our secret boss sauce.',
      fi: 'Kaksi hiiligrillattua naudanlihapihviä, tupla juusto, rapeaa sipulia ja salainen boss-kastikkeemme.',
    },
    image: '/images/dishes/double-beef-burger.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill Burger', fi: 'Hiiligrilliburgeri' },
  },
  {
    id: 'liora-pizza',
    name: { en: 'Liora Pizza', fi: 'Liora-pizza' },
    price: '€15.90',
    description: {
      en: 'Our signature chef-curated combination of the finest Mediterranean ingredients.',
      fi: 'Talon oma luomus — kokin kokoama yhdistelmä parhaita Välimeren raaka-aineita.',
    },
    image: '/images/dishes/mediterranian-pizza.jpeg',
    stars: 2,
    category: { en: 'Handcrafted Pizza', fi: 'Käsintehty pizza' },
  },
  {
    id: 'meze-plate',
    name: { en: 'Meze Plate', fi: 'Mezelautanen' },
    price: '€19.90',
    description: {
      en: 'A generous selection of our finest mezze — hummus, baba ghanoush, dolma, cacik, and fresh bread.',
      fi: 'Runsas valikoima parhaita mezejämme — hummusta, baba ghanoushia, dolmaa, cacikia ja tuoretta leipää.',
    },
    image: '/images/dishes/meze-platter.jpeg',
    stars: 2,
    category: { en: 'Starters', fi: 'Alkuruoat' },
  },
  {
    id: 'hot-honey-pepperoni',
    name: { en: 'Hot Honey Pepperoni', fi: 'Hot Honey Pepperoni' },
    price: '€14.90',
    description: {
      en: 'Premium pepperoni, mozzarella, and a drizzle of hot honey to finish.',
      fi: 'Laadukasta pepperonia, mozzarellaa ja viimeistelyksi tulista hunajaa.',
    },
    image: '/images/dishes/hot-honey-pepperoni-pizza.jpeg',
    stars: 2,
    category: { en: 'Handcrafted Pizza', fi: 'Käsintehty pizza' },
  },
  {
    id: 'monterey-jack',
    name: { en: 'Monterey Jack', fi: 'Monterey Jack' },
    price: '€17.90',
    description: {
      en: 'Beef patty with Monterey Jack cheese, guacamole, jalapeños, and chipotle mayo.',
      fi: 'Naudanlihapihvi Monterey Jack -juustolla, guacamolella, jalapenoilla ja chipotle-majoneesilla.',
    },
    image: '/images/dishes/gourmet-burger.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill Burger', fi: 'Hiiligrilliburgeri' },
  },
  {
    id: 'baklava-ice-cream',
    name: { en: 'Baklava & Ice Cream', fi: 'Baklava & jäätelö' },
    price: '€7.90',
    description: {
      en: 'Honey-soaked baklava with crushed pistachios paired with premium vanilla ice cream.',
      fi: 'Hunajaan kastettua baklavaa murskatuilla pistaaseilla, tarjolla laadukkaan vaniljajäätelön kera.',
    },
    image: '/images/dishes/baklava-with-icecream.jpeg',
    stars: 2,
    category: { en: 'Desserts', fi: 'Jälkiruoat' },
  },
  {
    id: 'liora-mocktail',
    name: { en: 'Liora Mocktail', fi: 'Liora-mocktail' },
    price: '€5.90',
    description: {
      en: 'A refreshing blend of seasonal fruits, botanicals, and sparkling water.',
      fi: 'Raikas sekoitus kauden hedelmiä, kasviuutteita ja kivennäisvettä.',
    },
    image: '/images/dishes/mocktail.jpeg',
    stars: 2,
    category: { en: 'Drinks', fi: 'Juomat' },
  },
  {
    id: 'adana-kebab',
    name: { en: 'Adana Kebab', fi: 'Adana Kebab' },
    price: '€14.90',
    description: {
      en: 'Spiced minced lamb on flat skewers, grilled over charcoal — a Turkish street-food classic elevated.',
      fi: 'Maustettua jauhettua lammasta litteillä vartailla, hiiligrillattuna — turkkilainen katuruokaklassikko uudessa loistossa.',
    },
    image: '/images/dishes/adana-kebab.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
  },
  {
    id: 'lamb-ribs',
    name: { en: 'Lamb Ribs', fi: 'Lampaan kylkiluut' },
    price: '€19.90',
    description: {
      en: 'Fall-off-the-bone lamb ribs slow-cooked then finished over charcoal for a caramelised crust.',
      fi: 'Luista irtoavat lampaan kylkiluut, haudutettu hitaasti ja viimeistelty hiilillä rapeaksi ja karamellisoituneeksi.',
    },
    image: '/images/dishes/lamb-ribs.jpeg',
    stars: 2,
    category: { en: 'Charcoal Grill', fi: 'Hiiligrilli' },
  },
  {
    id: 'doner-plate',
    name: { en: 'Döner Plate', fi: 'Dönerlautanen' },
    price: '€13.90',
    description: {
      en: 'Sliced döner meat on a plate with fresh salad, rice, and house sauces.',
      fi: 'Viipaloitua döner-lihaa lautasella tuoreen salaatin, riisin ja talon kastikkeiden kanssa.',
    },
    image: '/images/dishes/doner-plate.jpeg',
    stars: 2,
    category: { en: 'Döner', fi: 'Döner' },
  },
  {
    id: 'greek-salad',
    name: { en: 'Greek Salad', fi: 'Kreikkalainen salaatti' },
    price: '€13.90',
    description: {
      en: 'Ripe tomatoes, cucumber, Kalamata olives, red onion, and a generous slab of feta in olive oil.',
      fi: 'Kypsiä tomaatteja, kurkkua, kalamataoliiveja, punasipulia ja runsaasti fetaa oliiviöljyssä.',
    },
    image: '/images/dishes/greek-salad.jpeg',
    stars: 2,
    category: { en: 'Salads', fi: 'Salaatit' },
  },
  {
    id: 'bresaola-pizza',
    name: { en: 'Bresaola Pizza', fi: 'Bresaola-pizza' },
    price: '€15.90',
    description: {
      en: 'Air-dried bresaola, rocket, shaved parmesan, and truffle oil on a thin crispy base.',
      fi: 'Ilmakuivattua bresaolaa, rucolaa, parmesanlastuja ja tryffeliöljyä ohuella ja rapealla pohjalla.',
    },
    image: '/images/dishes/bresaola-pizza.jpeg',
    stars: 2,
    category: { en: 'Handcrafted Pizza', fi: 'Käsintehty pizza' },
  },
  {
    id: 'mud-cake',
    name: { en: 'Mud Cake', fi: 'Mud Cake' },
    price: '€7.90',
    description: {
      en: 'Rich dense chocolate mud cake served warm with cream.',
      fi: 'Täyteläinen ja tiivis suklainen mud cake tarjoiltuna lämpimänä kerman kera.',
    },
    image: '/images/dishes/mud-cake.jpeg',
    stars: 2,
    category: { en: 'Desserts', fi: 'Jälkiruoat' },
  },
]
