'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Mobile Developer', 'Data Scientist']

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typing animation
  useEffect(() => {
    const target = roles[currentRole]
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === target) {
      timer = setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentRole(p => (p + 1) % roles.length)
    } else {
      const speed = isDeleting ? 50 : 100
      timer = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
        )
      }, speed)
    }
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentRole])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['rgba(255,107,0', 'rgba(90,119,184', 'rgba(255,140,66']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color},${p.opacity})`
        ctx.fill()

        // Connect nearby particles
        particles.slice(i + 1, i + 4).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(90,119,184,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center mesh-bg overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full border border-orange-500/10 animate-spin-slow" />
      <div className="absolute top-1/4 right-10 w-60 h-60 rounded-full border border-navy-600/30" style={{top:'calc(25% + 40px)', right:'calc(40px + 40px)'}} />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-orange-500/5 animate-float" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-white/70">Tersedia untuk Project</span>
            </div>

            {/* Heading */}
            <div>
              <p className="font-mono text-orange-400 text-sm mb-3 tracking-widest uppercase">Halo, Saya</p>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-2">
                Andly
              </h1>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl gradient-text leading-tight">
                Hasugian
              </h1>
            </div>

            {/* Typing Role */}
            <div className="flex items-center gap-2">
              <span className="text-xl text-white/50">Seorang</span>
              <span className="text-xl text-white font-semibold typing-cursor min-w-[280px]">
                {displayText}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              Saya adalah mahasiswa Ilmu Komputer yang memiliki minat besar dalam pengembangan aplikasi web, mobile dan sedang mendalami bidang AI serta data science.
              Saya selalu bersemangat untuk belajar teknologi baru dan menerapkannya dalam proyek-proyek yang menantang.


            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) }}
                 className="btn-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Lihat Proyek
              </a>
              <a href="/CV_Andly_Sofian_Hasugian.pdf" target="_blank" rel="noopener noreferrer"
                 className="btn-outline">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: 'github', url: 'https://github.com/AndlyHsg03', label: 'GitHub' },
                { icon: 'linkedin', url: 'https://www.linkedin.com/in/andly-sofian-hasugian-3ab749294/', label: 'LinkedIn' },
                { icon: 'instagram', url: 'https://www.instagram.com/adlyhsg/', label: 'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group"
                   title={s.label}>
                  {s.icon === 'github' && (
                    <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.73.084-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.52 11.52 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.765.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.103.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.192.694.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {s.icon === 'linkedin' && (
                    <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {s.icon === 'instagram' && (
                    <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Avatar/Visual */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 animate-spin-slow" style={{margin:'-20px'}} />
              <div className="absolute inset-0 rounded-full border border-navy-600/40" style={{margin:'-40px', animationDirection:'reverse'}}>
              </div>
              
              {/* Avatar circle */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-navy-700 glow-orange animate-float">
                <img
                  src="/logoADLY.png"
                  alt="logo Andly Hasugian"
                  className="absolute inset-0 object-cover w-full h-full object-[35%_45%]"
                  
                />
                

                <Image 
                  src="/AdlyPP.png" 
                  alt="Andly Hasugian" 
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 animate-float-delay border border-orange-500/20">
                <p className="font-mono text-xs text-white/60">Projects</p>
                <p className="counter text-2xl">20+</p>
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 animate-float border border-navy-600/30">
                <p className="font-mono text-xs text-white/60">Experience</p>
                <p className="counter text-2xl">2 yr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center gap-2 text-white/30 animate-bounce">
            <span className="font-mono text-xs">Scroll ke bawah</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
