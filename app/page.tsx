import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import About from '@/components/sections/About'
import SignatureDishes from '@/components/sections/SignatureDishes'
import MenuSection from '@/components/sections/MenuSection'
import ChefSection from '@/components/sections/ChefSection'
import Gallery from '@/components/sections/Gallery'
import Reviews from '@/components/sections/Reviews'
import Reservation from '@/components/sections/Reservation'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import menuData from '@/data/menu.json'
import reviewsData from '@/data/reviews.json'
import galleryData from '@/data/gallery.json'

export default function Home() {
  return (
    <main className="bg-luxury-black overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <SignatureDishes />
      <MenuSection categories={menuData.categories} />
      <ChefSection />
      <Gallery images={galleryData.images} />
      <Reviews reviews={reviewsData.reviews} />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  )
}
