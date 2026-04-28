'use client'
import { useEffect } from 'react'
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
    img : sertifikat3,
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
    img : sertifikat4,
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
    img : sertifikat5,
  },
  {
    id: 6,
    title: 'Code Generation and Optimization Using IBM Granite',
    issuer: 'Hacktiv8 & IBM SkillsBuild',
    date: 'Agustus 2025',
    credentialId: 'PSM-I-2023-987',
    icon: '🤖',
    color: 'from-white/5 to-navy-900/40',
    border: 'border-white/10',
    category: 'AI',
    img: sertifikat6,
  },
]

export default function Certificates() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="certificates" className="py-32 relative bg-gradient-to-b from-transparent via-navy-900/20 to-transparent">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">04. Kredensial</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Sertifikat & <span className="gradient-text">Penghargaan</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-6" />
          <p className="text-white/50 max-w-xl mx-auto">
            Sertifikat profesional yang membuktikan kompetensi dan komitmen terhadap pembelajaran berkelanjutan.
          </p>
        </div>

        {/* Certificates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              className={`cert-badge reveal rounded-2xl p-6 cursor-pointer group`}
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
                <a href={cert.img?.src} target="_blank" rel="noopener noreferrer"
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

        {/* Add certificate note */}
        
      </div>
    </section>
  )
}
