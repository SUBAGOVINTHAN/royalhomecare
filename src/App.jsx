import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Clients from './components/Clients'
import Process from './components/Process'
import About from './components/About'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyContactBar from './components/StickyContactBar'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Clients />
        <Process />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <StickyContactBar />
    </div>
  )
}