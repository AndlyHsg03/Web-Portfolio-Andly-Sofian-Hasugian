'use client'
import { useEffect, useRef, useState } from 'react'
import FallingText from './FallingText'
const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/20',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'React Native', level: 80 },
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'from-navy-600/30 to-navy-700/10',
    borderColor: 'border-navy-600/30',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'Python / Django', level: 78 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 75 },
    ]
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    color: 'from-white/5 to-white/0',
    borderColor: 'border-white/10',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 72 },
      { name: 'AWS / Vercel', level: 75 },
      { name: 'Figma', level: 85 },
    ]
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'AWS', 'Figma', 'Git', 'GraphQL', 'Tailwind',
]

export default function Skills() {
  const [startAnimation, setStartAnimation] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          // Animate skill bars
          e.target.querySelectorAll('.skill-fill').forEach((bar: Element) => {
            const htmlBar = bar as HTMLElement
            const target = htmlBar.dataset.level || '0'
            setTimeout(() => { htmlBar.style.width = target + '%' }, 200)
          })
        }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-32 relative bg-gradient-to-b from-transparent via-navy-900/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="font-mono text-orange-400 text-sm tracking-widest uppercase mb-3">02. Keahlian</p>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-6">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="section-divider max-w-xs mx-auto" />
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, ci) => (
            <div
              key={ci}
              className={`reveal glass rounded-2xl p-6 border ${cat.borderColor} bg-gradient-to-br ${cat.color} card-hover`}
              style={{ transitionDelay: `${ci * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-display text-2xl text-white tracking-wide">{cat.title}</h3>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={si}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80 text-sm font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-orange-400">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" data-level={skill.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges ticker */}
        <div className="reveal mt-12">
          <p className="text-center text-white/40 text-sm font-mono mb-8 tracking-widest">JUGA FAMILIAR DENGAN</p>
          
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setStartAnimation(true)}
              
              disabled={startAnimation}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                startAnimation
                  ? 'bg-green-500/40 text-green-300 cursor-not-allowed border border-green-500/50'
                  : 'bg-orange-500 text-white hover:bg-orange-600 border border-orange-600 hover:shadow-lg hover:shadow-orange-500/50'
              }`}
            >
              {startAnimation ? ' Animasi dimulai' : 'Jatuhkan'}
            </button>
          </div>
          
          {/* @ts-ignore */}
          <FallingText
            text="React Next.js TypeScript Node.js Python PostgreSQL MongoDB Redis Docker AWS Figma Git GraphQL Tailwind CSS Laravel"
            highlightWords={['React', 'Python', 'Laravel']}
            trigger="none"
            gravity={0.6}
            fontSize="2rem"
            mouseConstraintStiffness={0.7}
            startAnimation={startAnimation}
          />
        </div>
      </div>
    </section>
  )
}
