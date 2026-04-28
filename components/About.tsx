'use client'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '20+', label: 'Proyek Selesai' },
  { value: '2+', label: 'Tahun Pengalaman' },
  { value: '10+', label: 'Sertifikat' },
  { value: '10000+', label: 'Dosa' }
]

const timeline = [
  {
    year: '2026',
    title: 'Semester 4 Ilmu Komputer',
    place: 'Universitas Negeri Medan',
    desc: 'Aktif dalam berbagai proyek pengembangan aplikasi, dan sedang berkembang dalam bidang Data Science dan AI.',
  },
  {
    year: '2024',
    title: 'Masuk Universitas Negeri Medan',
    place: 'Medan, Sumatera Utara',
    desc: 'Memulai studi di jurusan Ilmu Komputer, aktif dalam organisasi kemahasiswaan dan proyek pengembangan aplikasi.',
  },
  {
    year: '2024',
    title: 'Lulus SMA Negeri 1 Parlilitan',
    place: 'Parlilitan, Humbang Hasundutan',
    desc: 'Memimpin tim pengembangan aplikasi web enterprise dengan tech stack modern.',
  },
  {
    year: '2022',
    title: 'Peserta Olimpiade Sains Nasional (OSN) Fisika',
    place: 'Provinsi Sumatera Utara',
    desc: 'Mewakili Kabupaten Humbang Hasundutan dalam kompetisi OSN Fisika tingkat provinsi.',
  },
  {
    year: '2021',
    title: 'Masuk SMA Negeri 1 Parlilitan',
    place: 'Parlilitan, Humbang Hasundutan',
    desc: 'Memulai perjalanan pendidikan di SMA Negeri 1 Parlilitan dengan Jurusan IPA, aktif dalam kompetisi sains.',
  },
  {
    year: '2020',
    title: 'Bertarung melawan COVID-19',
    place: 'Parlilitan, Humbang Hasundutan',
    desc: 'Menghadapi tantangan pandemi COVID-19 dengan semangat belajar dan beradaptasi dengan pembelajaran daring.',
  },
  {
    year: '2018',
    title: 'Lulus SD Negeri 1 Parlilitan',
    place: 'Parlilitan, Humbang Hasundutan',
    desc: 'Memulai perjalanan pendidikan di SD Negeri 1 Parlilitan dengan prestasi akademik yang baik.',
  },
  {
    year: '2006',
    title: 'Lahir',
    place: 'Parlilitan, Humbang Hasundutan',
    desc: 'Memulai perjalanan hidup di Parlilitan, Humbang Hasundutan, Sumatera Utara.',
  }
]

export default function About() {
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">01. Tentang Saya</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Siapa <span className="gradient-text">Saya?</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div className="reveal-left space-y-6">
            <div className="glass rounded-2xl p-8">
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                Saya adalah seorang Mahasiswa <span className="text-orange-400 font-semibold">Ilmu Komputer</span> dengan 
                passion dalam pengembangan perangkat lunak, terutama di bidang <span className="text-orange-400 font-semibold">web development </span> dan <span className="text-orange-400 font-semibold">AI/ML</span>.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Saat ini semester 4 di Universitas Negeri Medan dan aktif dalam berbagai proyek pengembangan aplikasi, dan sedang berkembang dalam bidang Data Science dan AI. Saya percaya bahwa teknologi dapat memberikan dampak positif yang besar, dan saya berkomitmen untuk terus
              </p>
              <p className="text-white/70 leading-relaxed">
                Saya percaya bahwa kode yang baik bukan hanya yang berfungsi, tapi yang 
                <span className="text-white font-medium"> elegan, efisien, dan mudah dipelihara</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="glass rounded-xl p-5 text-center hover:border-orange-500/20 transition-all duration-300 group">
                  <p className="counter text-4xl mb-1 group-hover:scale-110 transition-transform">{s.value}</p>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="reveal-right">
            <h3 className="font-display text-2xl text-white mb-8 tracking-wide">Perjalanan Karir</h3>
            <div className="relative pl-12">
              {/* Vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-500 via-navy-600 to-transparent" />

              <div className="space-y-8 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-navy-800">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-7 top-1.5 w-4 h-4 rounded-full border-2 border-orange-500 bg-navy-950 z-10" />

                    <div className="glass rounded-xl p-5 hover:border-orange-500/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{item.year}</span>
                        <span className="text-white/40 text-xs">{item.place}</span>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
