import Categories from "./components/Categories"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import Navbar from "./components/Navbar"

export function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
