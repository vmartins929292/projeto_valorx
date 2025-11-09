'use client'

import { motion } from 'framer-motion'
import { Bookmark, Share2 } from 'lucide-react'
import type { NewsArticle } from '../types'

interface MostReadSectionProps {
  articles?: NewsArticle[]
}

const defaultArticles: NewsArticle[] = [
  {
    title: 'Trump Announces Reopening of US Economy',
    excerpt: 'Collaborative efforts in space exploration achieve a major breakthrough...',
    tag: 'Dólar',
    date: '09 jan 2025'
  },
  {
    title: 'Trump Announces Reopening of US Economy',
    excerpt: 'Collaborative efforts in space exploration achieve a major breakthrough...',
    tag: 'Dólar',
    date: '09 jan 2025'
  },
  {
    title: 'Trump Announces Reopening of US Economy',
    excerpt: 'Collaborative efforts in space exploration achieve a major breakthrough...',
    tag: 'Dólar',
    date: '09 jan 2025'
  },
  {
    title: 'Trump Announces Reopening of US Economy',
    excerpt: 'Collaborative efforts in space exploration achieve a major breakthrough...',
    tag: 'Dólar',
    date: '09 jan 2025'
  }
]

// Estilo padronizado para todas as linhas divisórias - garantindo tamanho idêntico
const dividerStyle: React.CSSProperties = {
  width: '1px',
  minWidth: '1px',
  maxWidth: '1px',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(226, 232, 240) 50%, rgba(0, 0, 0, 0))',
  backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(226, 232, 240) 50%, rgba(0, 0, 0, 0))',
  boxSizing: 'border-box',
  border: 'none',
  margin: 0,
  padding: 0,
}

export default function MostReadSection({ articles = defaultArticles }: MostReadSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 p-4 mb-6 overflow-hidden rounded-xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#01b792]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="font-montserrat-semibold text-2xl text-cyan-950 flex items-center gap-2">
            <span className="inline-block w-1 h-8 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full" />
            Mais lidas
          </h2>
          
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {['Dia', 'Semana', 'Mês'].map((tab, index) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg font-montserrat-medium text-xs transition-all duration-300 relative overflow-hidden ${
                  tab === 'Mês' 
                    ? 'bg-gradient-to-br from-emerald-700 to-teal-800 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-cyan-950/80 hover:bg-white/40 hover:backdrop-blur-sm'
                } ${
                  index < 2 ? 'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-5 after:bg-gradient-to-b after:from-transparent after:via-emerald-400/60 after:to-transparent' : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Articles grid with stagger animation */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative flex gap-3 cursor-pointer p-2 -m-2 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Large ranking number */}
                <div className="flex-shrink-0 flex items-start pt-1 pr-2">
                  <span className="font-montserrat-bold text-cyan-950/20 group-hover:text-[#00b875] transition-colors duration-300" style={{ fontSize: '44px', lineHeight: '0.9', fontWeight: 900 }}>
                    {i + 1}
                  </span>
                </div>
                
                {/* Card content */}
                <div className="flex-1 relative">
                  {/* Hover gradient overlay */}
                  <div className="absolute -inset-2 bg-gradient-to-t from-emerald-800/20 via-emerald-700/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -left-[60px]" />
                  
                  <div className="relative">
                    <div className="flex flex-col gap-1.5 mb-3">
                      <h3 className="font-montserrat-medium text-sm text-cyan-950 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300" style={{ lineHeight: '1.2' }}>
                        {article.title}
                      </h3>
                      <p className="font-montserrat text-xs text-slate-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                      <span className="font-montserrat text-xs text-slate-500">{article.date}</span>
                      <div className="flex gap-1.5">
                        {/* Bookmark Button */}
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:bg-[#01b792] transition-all duration-300 group/btn"
                          aria-label="Marcar como favorito"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-[#083344] group-hover/btn:text-white transition-colors" strokeWidth={1.5} />
                        </motion.button>
                        {/* Share Button */}
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:bg-[#01b792] transition-all duration-300 group/btn"
                          aria-label="Compartilhar"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#083344] group-hover/btn:text-white transition-colors" strokeWidth={2} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
