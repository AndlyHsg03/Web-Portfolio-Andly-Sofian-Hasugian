'use client'
import { useEffect, useRef, useState, useCallback, type WheelEvent, type MouseEvent } from 'react'
import sertifikat1 from '../public/certificates/sertifikat1.png'
import sertifikat2 from '../public/certificates/sertifikat2.png'
import sertifikat3 from '../public/certificates/sertifikat3.png'
import sertifikat4 from '../public/certificates/sertifikat4.png'
import sertifikat5 from '../public/certificates/sertifikat5.png'
import sertifikat6 from '../public/certificates/sertifikat6.png'

const certificates = [
  {
    id: 1,
    title: 'Implementasi Algoritma Priority Scheduling untuk Mensimulasikan Sistem Antrian Berbasis Web',
    issuer: 'Universitas Negeri Medan',
    date: 'Oktober 2025',
    credentialId: 'AWS-SAA-2024-001',
    icon: '✍️',
    color: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/30',
    category: 'Karya Tulis Ilmiah',
    img: sertifikat1,
  },
  {
    id: 2,
    title: 'Pemanfaatan Bahasa Python dalam Menyelesaikan Determinan Matriks dengan Metode Kofaktor',
    issuer: 'Universitas Negeri Medan',
    date: 'April 2025',
    credentialId: 'GCP-DEV-2023-456',
    icon: '✍️',
    color: 'from-navy-600/30 to-navy-700/10',
    border: 'border-navy-500/30',
    category: 'Karya Tulis Ilmiah',
    img: sertifikat2,
  },
  {
    id: 3,
    title: 'Peserta Tingkat Nasional',
    issuer: 'Saintech Science Competition',
    date: 'April 2022',
    credentialId: 'META-REACT-2023-789',
    icon: '🔬',
    color: 'from-white/5 to-white/0',
    border: 'border-white/15',
    category: 'Fisika',
    img: sertifikat3,
  },
  {
    id: 4,
    title: 'Peringkat 7 Provinsi Sumatera Utara',
    issuer: 'Saintech Science Competition',
    date: 'April 2022',
    credentialId: 'TF-DEV-2023-321',
    icon: '🔬',
    color: 'from-orange-500/10 to-navy-800/30',
    border: 'border-orange-500/20',
    category: 'Fisika',
    img: sertifikat4,
  },
  {
    id: 5,
    title: 'Harapan 2 Provinsi Sumatera Utara',
    issuer: 'Saintech Science Competition',
    date: 'April 2022',
    credentialId: 'TF-DEV-2023-321',
    icon: '🧪',
    color: 'from-orange-500/10 to-navy-800/30',
    border: 'border-orange-500/20',
    category: 'Kimia',
    img: sertifikat5,
  },
  {
    id: 6,
    title: 'Code Generation and Optimization Using IBM Granite',
    issuer: 'Hacktiv8 & IBM SkillsBuild',
    date: 'Agustus 2025',
    credentialId: 'PSM-I-2023-987',
    icon: '֎🇦🇮',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'AI',
    img: sertifikat6,
  },
  {
    id: 7,
    title: 'FRONTEND-JAVASCRIPT',
    issuer: 'MySkill',
    date: 'April 2026',
    credentialId: 'MS-20260430-0ldLTNx73UK4MREHTm1g',
    icon: '｡🇯‌🇸‌',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'Web Development',
    // Link kredensial PDF resmi dari MySkill — Verify langsung membuka link ini.
    img: 'https://storage.googleapis.com/myskill-v2-certificates/topic-pTLX6J38RGSQ4dfEO6yQ/7fgbpO4o1AhKcUstwNuVSB3tZM32-0ldLTNx73UK4MREHTm1g.pdf',
  },
  {
    id: 8,
    title: 'PYTHON FUNDAMENTAL',
    issuer: 'MySkill',
    date: 'May 2026',
    credentialId: 'MS-20260512-OHDZx5hOAyY6Fiv9yJoq',
    icon: '🇵🇾',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'Programming',
    // Link kredensial PDF resmi dari MySkill — Verify langsung membuka link ini.
    img: 'https://storage.googleapis.com/myskill-v2-certificates/topic-6eBG2nPRdSFZhJHFJpzx/7fgbpO4o1AhKcUstwNuVSB3tZM32-OHDZx5hOAyY6Fiv9yJoq.pdf',
  },
  {
    id: 9,
    title: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding',
    date: 'May 2026',
    credentialId: 'RVZK0M9VMZD5',
    icon: '🇲🇱',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'Machine Learning',
    // Link kredensial PDF resmi dari MySkill — Verify langsung membuka link ini.
    img: 'https://www.dicoding.com/certificates/RVZK0M9VMZD5',
  },
  {
    id: 10,
    title: 'Data Science Introduction',
    issuer: 'MySkill',
    date: 'May 2026',
    credentialId: '319234/DTA/LM/05/2026',
    icon: '📊',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'Data Science',
    // Link kredensial PDF resmi dari MySkill — Verify langsung membuka link ini.
    img: 'https://drive.google.com/file/d/13DM9ktLKCaQRtZkboAaKFMmpNIQ2ibt3/view',
  },
]

export default function Certificates() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef<boolean>(false)
  const hasDragged = useRef<boolean>(false)
  const dragStart = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 })

  const [progress, setProgress] = useState<number>(0)
  const [atStart, setAtStart] = useState<boolean>(true)
  const [atEnd, setAtEnd] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max <= 0 ? 0 : Math.min(100, Math.max(0, (el.scrollLeft / max) * 100)))
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= max - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState])

  // Turn vertical mouse-wheel motion into horizontal travel while inside the
  // carousel's range, then hand scroll control back to the page at the edges.
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 0) return

    const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    if (isHorizontalGesture) return // let native trackpad horizontal swipes through

    const goingDown = e.deltaY > 0
    const goingUp = e.deltaY < 0
    if (goingDown && el.scrollLeft >= max - 1) return // release: continue scrolling the page down
    if (goingUp && el.scrollLeft <= 1) return // release: continue scrolling the page up

    e.preventDefault()
    el.scrollLeft += e.deltaY
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-cert-card]')
    const step = card ? card.getBoundingClientRect().width + 20 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current
    if (!el) return
    isDragging.current = true
    hasDragged.current = false
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft }
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const el = trackRef.current
    if (!el) return
    const dx = e.pageX - dragStart.current.x
    if (Math.abs(dx) > 5) hasDragged.current = true
    el.scrollLeft = dragStart.current.scrollLeft - dx
  }

  const stopDragging = () => { isDragging.current = false }

  // Swallow the click that follows a drag so the "Verify" link doesn't fire
  // when the user was only dragging the carousel.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (hasDragged.current) {
      e.preventDefault()
      e.stopPropagation()
      hasDragged.current = false
    }
  }

  return (
    <section id="certificates" className="py-32 relative bg-gradient-to-b from-transparent via-navy-900/20 to-transparent">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">04. Kredensial</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Sertifikat & <span className="gradient-text">Penghargaan</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-6" />
          <p className="text-white/50 max-w-xl mx-auto mb-4">
            Sertifikat profesional yang membuktikan kompetensi dan komitmen terhadap pembelajaran berkelanjutan.
          </p>
          <p className="font-mono text-xs text-white/30 inline-flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
            </svg>
            geser atau scroll untuk menjelajah
          </p>
        </div>

        {/* Certificates carousel */}
        <div className="relative group/carousel">
          {/* edge fades, fade out themselves once you hit either end */}
          <div className={`pointer-events-none absolute -left-1 top-0 bottom-6 w-12 sm:w-24 z-10 bg-gradient-to-r from-navy-900/80 via-navy-900/30 to-transparent transition-opacity duration-300 ${atStart ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`pointer-events-none absolute -right-1 top-0 bottom-6 w-12 sm:w-24 z-10 bg-gradient-to-l from-navy-900/80 via-navy-900/30 to-transparent transition-opacity duration-300 ${atEnd ? 'opacity-0' : 'opacity-100'}`} />

          <div
            ref={trackRef}
            onWheel={handleWheel}
            onScroll={updateScrollState}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onClickCapture={onClickCapture}
            className="cert-track flex gap-5 overflow-x-auto pb-6 px-1 snap-x snap-mandatory scroll-smooth overscroll-x-contain cursor-grab active:cursor-grabbing"
          >
            {certificates.map((cert, i) => (
              <div
                key={cert.id}
                data-cert-card
                className="cert-badge reveal rounded-2xl p-6 group flex-shrink-0 w-[82vw] sm:w-[340px] snap-start select-none"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Top row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} border ${cert.border} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs text-orange-400/70 mb-1 block">{cert.category}</span>
                    <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-orange-400 transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                {/* Issuer */}
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-3.5 h-3.5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/60 text-xs">{cert.issuer}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-mono text-xs text-white/40">{cert.date}</span>
                  </div>
                  <a href={typeof cert.img === 'string' ? cert.img : cert.img?.src} target="_blank" rel="noopener noreferrer" draggable={false}
                     className="text-xs text-orange-400/60 hover:text-orange-400 transition-colors font-mono flex items-center gap-1">
                    Verify
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Credential ID */}
                <p className="font-mono text-xs text-white/20 mt-2 truncate">ID: {cert.credentialId}</p>
              </div>
            ))}
          </div>

          {/* Nav arrows, desktop only — fade in on hover, hidden at the relevant edge */}
          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={() => scrollByCard(-1)}
            className={`hidden md:flex absolute -left-5 top-[calc(50%-12px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-navy-900/90 backdrop-blur items-center justify-center text-white/60 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${atStart ? 'pointer-events-none opacity-0' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Selanjutnya"
            onClick={() => scrollByCard(1)}
            className={`hidden md:flex absolute -right-5 top-[calc(50%-12px)] -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-navy-900/90 backdrop-blur items-center justify-center text-white/60 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${atEnd ? 'pointer-events-none opacity-0' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll progress indicator */}
        <div className="h-1 w-full max-w-xs mx-auto mt-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress)}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .cert-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cert-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}