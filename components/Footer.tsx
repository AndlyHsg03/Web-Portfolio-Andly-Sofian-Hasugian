'use client'
import Image from 'next/image'


const LogoFooter = {
  type: 'image',
  text: 'AH',
  image: '/logoADLY.png',
}


export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            
              <Image 
                src={LogoFooter.image} 
                alt="Logo" 
                width={25} 
                height={25} 
                className="rounded-lg"
                />
            
            <span className="font-display text-lg tracking-wider text-white/80">
              Andly<span className="text-orange-400">Hasugian</span>
            </span>
          </div>
          <p className="font-mono text-xs text-white/25 text-center">
            © {new Date().getFullYear()} Andly Hasugian. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/10 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-white/40 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
