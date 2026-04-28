'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const navItems = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
]

// Text untuk animasi typing
const FULL_TEXT = 'AndlyHasugian'
const MAX_SCROLL = 700 // Scroll distance untuk full animation
const CHAR_PER_PIXEL = FULL_TEXT.length / MAX_SCROLL // Karakter per pixel scroll

// Logo config - ubah di sini untuk set gambar atau text
const LOGO_CONFIG = {
  type: 'image', // 'text' atau 'image'
  text: 'AH', // gunakan jika type='text'
  image: '/logoADLY.png', // gunakan jika type='image' (contoh: '/logo.png')
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setScrollY(window.scrollY)
      // Update active section
      const sections = navItems.map(i => i.href.replace('#', ''))
      for (const s of sections.reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(s)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // Hitung jumlah karakter yang ditampilkan berdasarkan scroll
  const getDisplayedChars = () => {
    const progress = Math.min(scrollY / MAX_SCROLL, 1)
    const visibleChars = Math.max(0, FULL_TEXT.length * (1 - progress))
    return Math.round(visibleChars)
  }

  const displayedChars = getDisplayedChars()
  const displayedText = FULL_TEXT.slice(0, displayedChars)
  const splitIndex = 5 // Index untuk split "Andly" dan "Hasugian"

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 py-3'
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 group">
            {LOGO_CONFIG.type === 'image' && LOGO_CONFIG.image ? (
              <Image 
                src={LOGO_CONFIG.image} 
                alt="Logo" 
                width={50} 
                height={50}
                className="rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br  flex items-center justify-center font-display text-lg text-white  group-hover:scale-110 transition-transform duration-300">
                {LOGO_CONFIG.text}
              </div>
            )}
            <span 
              className="font-display text-2xl tracking-wider text-white inline-flex items-center"
              style={{
                minHeight: '2rem',
                pointerEvents: displayedChars === 0 ? 'none' : 'auto',
              }}
            >
              <span className="inline">
                {displayedText.slice(0, Math.min(displayedChars, splitIndex))}
              </span>
              {displayedChars > splitIndex && (
                <span className="gradient-text inline">
                  {displayedText.slice(splitIndex)}
                </span>
              )}
              {displayedChars > 0 && displayedChars < FULL_TEXT.length && (
                <span className="typing-cursor ml-0.5"></span>
              )}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`nav-link text-sm font-medium ${active === item.href.replace('#','') ? 'text-white' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#adlyAI" onClick={(e) => { e.preventDefault(); scrollTo('#adlyAI') }}
               className="btn-primary text-sm py-2 px-4">
              AAI
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-navy-950/95 backdrop-blur-xl transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
             onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-64 bg-navy-900 border-l border-white/10 p-8 pt-24 flex flex-col gap-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`text-left font-display text-2xl tracking-wide transition-all duration-300 ${
                menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              } ${active === item.href.replace('#','') ? 'gradient-text' : 'text-white/70 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-white/10">
            <button onClick={() => scrollTo('#contact')} className="btn-primary w-full justify-center">
              AAI
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
