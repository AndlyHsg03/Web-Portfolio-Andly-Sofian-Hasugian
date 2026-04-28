import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Asisten from '@/components/AsistenAdly'

export default function Home() {
  return (
    <main className="relative noise">
      <Navbar />
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <About />
      <div className="h-px bg-gradient-to-r from-transparent via-navy-600/30 to-transparent" />
      <Skills />
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
      <Projects />
      <div className="h-px bg-gradient-to-r from-transparent via-navy-600/30 to-transparent" />
      <Certificates />
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <Contact />
      <Asisten />
      <Footer />
    </main>
  )
}
