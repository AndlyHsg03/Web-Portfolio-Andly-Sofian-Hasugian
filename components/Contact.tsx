'use client'
import { useState, useEffect } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const contacts = [
    {
      icon: '📧',
      label: 'Email',
      value: 'dlyhasugian@gmail.com',
      target: '_blank',
      href: 'mailto:dlyhasugian@gmail.com',
    },
    {
      icon: <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.48A11.88 11.88 0 0012.01.04C6.14.04 1.73 4.45 1.73 10.32c0 1.81.47 3.57 1.36 5.12L.05 22l6.63-1.74a11.88 11.88 0 005.33 1.39h-.01c5.87-.01 10.28-4.42 10.28-10.29a11.88 11.88 0 00-3.74-8.71zm-8.51 16c-1.81 0-3.5-.47-4.95-1.28l-.35-.21-3.94 1.03 1.05-3.84-.23-.36a9.46 9.46 0 01-1.45-4.77c0-5.24 4.27-9.5 9.53-9.5s9.53 4.26 9.53 9.5c0 5.25-4.27 9.52-9.53 9.52z"/>
            </svg>,
      label: 'WhatsApp',
      value: '+62 851 2652 9300',
      href: 'https://wa.me/6285126529300',
      target: '_blank',
    },
    {
      icon: '📍',
      label: 'Lokasi',
      value: 'Medan, Sumatera Utara',
      href: '#',
    },
  ]

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 mesh-bg opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">05. Kontak</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Hubungi <span className="gradient-text">Saya</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-6" />
          <p className="text-white/50 max-w-xl mx-auto">
            Punya proyek menarik? Ingin berkolaborasi? Atau hanya ingin ngobrol? — Saya selalu siap!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="reveal-left space-y-8">
            <div>
              <h3 className="font-display text-3xl text-white mb-4 tracking-wide">Ayo Bekerja Sama!</h3>
              <p className="text-white/60 leading-relaxed">
                Saya terbuka untuk freelance project, full-time opportunity, atau sekadar diskusi 
                tentang ide-ide menarik. Response time saya biasanya dalam 24 jam.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contacts.map((c, i) => (
                <a key={i} href={c.href}
                   className="flex items-center gap-4 glass rounded-xl p-4 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 group">
                  <span className="text-2xl w-10 text-center">{c.icon}</span>
                  <div>
                    <p className="font-mono text-xs text-white/40 mb-0.5">{c.label}</p>
                    <p className="text-white group-hover:text-orange-400 transition-colors font-medium">{c.value}</p>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-orange-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="font-mono text-xs text-white/40 mb-4 tracking-widest uppercase">Temukan saya di</p>
              <div className="flex gap-3">
                {[
                  { name: 'GitHub', url: 'https://github.com', icon: <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.787.605-3.375-1.343-3.375-1.343-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.086" />
                    </svg> },
                  { name: 'LinkedIn', url: 'https://linkedin.com', icon: <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
                    </svg> },
              
                  { name: 'Instagram', url: 'https://instagram.com', icon: <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20h8.5A4.25 4.25 0 0020.5 15.25v-8.5A4.25 4.25 0 0016.25 3h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" />
                    </svg> },
                ].map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300 group text-lg"
                     title={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide uppercase">Nama</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    className="form-input"
                    placeholder="Adil"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide uppercase">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                    className="form-input"
                    placeholder="adil@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide uppercase">Subjek</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm(f => ({...f, subject: e.target.value}))}
                  className="form-input"
                  placeholder="Ingin diskusi tentang proyek..."
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-white/40 mb-2 tracking-wide uppercase">Pesan</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({...f, message: e.target.value}))}
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Ceritakan proyek atau ide kamu..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  status === 'loading'
                    ? 'bg-orange-500/50 cursor-not-allowed text-white'
                    : status === 'success'
                    ? 'bg-green-500 text-white'
                    : 'btn-primary justify-center'
                }`}
              >
                {status === 'loading' && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {status === 'loading' ? 'Mengirim...' : status === 'success' ? '✓ Pesan Terkirim!' : 'Kirim Pesan'}
              </button>

              {status === 'success' && (
                <p className="text-center text-green-400 text-sm font-mono">
                  Terima kasih! Saya akan segera merespons.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
