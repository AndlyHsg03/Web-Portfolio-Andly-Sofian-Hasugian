'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const listProjects = [
  {
    id: 1,
    title: 'First Web Portfolio with ReactJS',
    category: 'Web-App',
    tags: ['React.js', 'Node.js', 'Tailwind CSS'],
    description: 'website portfolio pertama saya yang dibuat dengan ReactJS, menampilkan proyek-proyek saya dengan desain modern dan responsif.',
    image: { src: '/projects/project1.png', alt: 'Project 1 Image' },
    color: 'from-orange-500/20 to-navy-700/40',
    github: {
      url: 'https://github.com/AndlyHsg03/WebPortoReactFirstTimee',
      label: 'GitHub Repo',
      target: '_blank',
    },
    live: 'https://portfolioweb-andlyhasugian.vercel.app/',
    featured: false,
  },
  {
    id: 2,
    title: 'To-Do List App',
    category: 'Mobile',
    tags: ['React Native', 'TypeScript'],
    description: 'Aplikasi mobile untuk manajemen tugas harian dengan fitur drag-and-drop, pengingat, dan sinkronisasi cloud.',
    image: { src: '/projects/project2.png', alt: 'To-Do List App' },
    color: 'from-navy-600/40 to-navy-800/20',
    github: 'https://github.com/AndlyHsg03/To-Do-App-ReactNative',
    live: '/projects/project2.png',
    featured: true,
  },
  {
    id: 3,
    title: 'Web Portfolio + chat bot dengan Next.js',
    category: 'Web-App',
    tags: ['API Gemini', 'NextJS', 'TypeScript', 'React'],
    description: 'Website portfolio Adly terbaru dan elegan dengan fitur chat bot yang menggunakan API Gemini untuk memberikan pengalaman interaktif kepada pengunjung.',
    image: { src: '/projects/project3.png', alt: 'AI Content Generator' },
    color: 'from-orange-500/10 to-navy-900/50',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'StudyFLow',
    category: 'Web-App',
    tags: ['Laravel (PHP)', 'JS', 'Bootstrap', 'MySQL', 'Api-JS', 'Laravel Reverb'],
    description: 'Web aplikasi manajemen pembelajaran untuk mahasiswa dan dosen dengan fitur penjadwalan, berbasis gamifikasi dengan leaderboard dan skin tema.',
    image: { src: '/projects/project4.png', alt: 'StudyFLow' },
    color: 'from-navy-700/30 to-navy-900/60',
    github: 'https://github.com/AndlyHsg03/studyflow',
    live: 'http://studyflow-app.my.id/',
    featured: true,
  },
  {
    id: 5,
    title: 'Deteksi Kelelahan Mata dengan Computer Vision',
    category: 'AI/ML',
    tags: ['python', 'OpenCV', 'TensorFlow', 'CNN', 'Dlib', 'MediaPipe'],
    description: 'Aplikasi deteksi kelelahan mata menggunakan computer vision untuk mendeteksi tanda-tanda kelelahan pada mata dengan akurasi tinggi, juga menggunakan model EAR dan juga CNN untuk meningkatkan performa deteksi.',
    image: { src: '/projects/project5.png', alt: 'Deteksi Kelelahan Mata' },
    color: 'from-orange-500/15 to-navy-800/30',
    github: '#',
    live: '/projects/project5.png',
    featured: false,
  },
  {
    id: 6,
    title: 'Visualisasi 5 Algoritma Pencarian (serching)',
    category: 'Lainnya',
    tags: ['BFS', 'DFS', 'UCS', 'Greedy', 'A*'],
    description: 'Aplikasi website visualisasi algoritma pencarian populer seperti BFS, DFS, UCS, Greedy, dan A* untuk membantu pemahaman konsep algoritma dengan animasi interaktif.',
    image: { src: '/projects/project6.png', alt: 'Visualisasi Algoritma' },
    color: 'from-navy-600/20 to-navy-950/80',
    github: 'https://github.com/AndlyHsg03/SearchAlgorithm',
    live: 'https://andlyhsg03.github.io/SearchAlgorithm/',
    featured: false,
  },
  {
    id: 7,
    title: 'Muncak Digunung Sibayak',
    category: 'Lainnya',  
    tags: ['Travel', 'Nature', 'Photography', 'Adventure',  'Mountaineering'],
    description: 'Pengalaman mendaki Gunung Sibayak yang menakjubkan, dengan pemandangan alam yang indah dan tantangan fisik yang memacu adrenalin.',
    image: { src: '/projects/project7.png', alt: 'Muncak Digunung Sibayak' },
    color: 'from-green-500/20 to-green-700/40',
    github: '#',
    live: '/projects/project7.png',
    featured: false,
    
  },
  {
    id: 8,
    title: 'Penerapan K-Means Clustering Untuk Identifikasi Pola Iklim Stariun Cuaca di Indonesia Menggunakan Data NOAA GSOD',
    category: 'Lainnya',  
    tags: ['Data Mining', 'K-Means Clustering', 'NOAA GSOD', 'Python', 'Pandas', 'Matplotlib', 'Scikit-Cluster'],
    description: 'Project Data Science yang menerapkan algoritma K-Means Clustering untuk mengidentifikasi pola iklim stasiun cuaca di Indonesia menggunakan data NOAA GSOD, memberikan wawasan tentang variasi iklim di berbagai wilayah.',
    image: { src: '/projects/project8.png', alt: 'Clustering' },
    color: 'from-green-500/20 to-green-700/40',
    github: 'https://github.com/AndlyHsg03/Penerapan_K-Means_Clustering_NOAA_GSODD_Indonesia',
    live: '/projects/project8.png',
    featured: true,
    
  }

]

const categories = ['Semua', 'Web-App', 'Mobile', 'AI/ML', 'Lainnya']

export default function Projects() {
  const [filter, setFilter] = useState('Semua')
  const [filtered, setFiltered] = useState(listProjects)


  useEffect(() => {    if (filter === 'Semua') {
      setFiltered(listProjects)
    } else {
      setFiltered(listProjects.filter(p => p.category === filter))
    }
  }, [filter])
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered])

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 hex-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">03. Portofolio</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Proyek <span className="gradient-text">Unggulan</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto mb-8" />
          <p className="text-white/50 max-w-xl mx-auto">
            Kumpulan proyek yang telah saya kerjakan — dari startup hingga enterprise.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 reveal">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'glass text-white/60 hover:text-white hover:border-orange-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`project-card reveal glass rounded-2xl overflow-hidden card-hover cursor-pointer group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image area */}
              <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden` } >
                {/* Mock screen UI */}
                <div className="absolute inset-4 rounded-lg glass border border-white/10 overflow-hidden">
                  <div className="h-6 flex items-center gap-1.5 px-3 border-b border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  
                  {/* Project Image */}
                  {project.image ? (
                    <div className="relative w-full h-[calc(100%-24px)] bg-black/20">
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[calc(100%-24px)] flex items-center justify-center text-white/30">
                      <span className="text-sm">No image available</span>
                    </div>
                  )}
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-orange-500 rounded text-xs font-mono text-white">
                    Featured
                  </div>
                )}

                {/* Hover overlay */}
                <div className="project-overlay absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center gap-4">
                  <a
                    href={typeof project.github === 'string' ? project.github : project.github.url}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                    onClick={e => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"

                    
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  {project.live && project.live !== '#' ? (
                    <a 
                      href={project.live} 
                      className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors" 
                      onClick={e => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <button 
                      className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-not-allowed opacity-50" 
                      disabled
                      title="Live demo tidak tersedia"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs text-orange-400/70">{project.category}</span>
                    <h3 className="font-semibold text-white text-lg group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-navy-800 rounded text-xs font-mono text-white/50 border border-navy-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add more CTA */}
        <div className="text-center mt-12 reveal">
          <p className="text-white/40 text-sm mb-4">Masih banyak proyek lainnya di GitHub saya</p>
          <a href="https://github.com/AndlyHsg03" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Lihat Semua di GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
