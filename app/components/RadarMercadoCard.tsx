'use client'

import { motion } from 'framer-motion'
import { Lightning, CalendarCheck, ChartLine } from 'phosphor-react'
import type { NewsArticle } from '../types'

interface RadarMercadoCardProps {
  article: NewsArticle
}

// Função para retornar o ícone da seção
const getSectionIcon = (section: string) => {
  const iconClass = "w-3.5 h-3.5 text-slate-500 flex-shrink-0"
  
  if (section.includes('Drivers de Mercado')) {
    // Lightning: raio representando impulso e força motriz do mercado
    return <Lightning className={iconClass} weight="fill" />
  }
  
  if (section.includes('Sazonalidades')) {
    // CalendarCheck: calendário com check representando padrões sazonais
    return <CalendarCheck className={iconClass} weight="fill" />
  }
  
  if (section.includes('Cenários e Tendências')) {
    // ChartLine: gráfico de linha representando análise de cenários e tendências
    return <ChartLine className={iconClass} weight="fill" />
  }
  
  return null
}

export default function RadarMercadoCard({ article }: RadarMercadoCardProps) {
  return (
    <motion.article
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/60 hover:border-emerald-800/40 shadow-sm cursor-pointer"
    >
      {/* Linha verde escura no topo */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Badge de tag - apenas texto vermelho escuro */}
        <div className="mb-2">
          <span className="font-montserrat-semibold text-[9px] sm:text-[10px] text-red-800 uppercase tracking-wider">
            {article.tag}
          </span>
        </div>

        {/* Título com hover effect */}
        <h3 
          className="font-montserrat-semibold text-xs sm:text-sm md:text-base text-cyan-950 mb-3 group-hover:text-emerald-800 line-clamp-2 leading-[1.15] sm:leading-[1.2] md:leading-[1.25]"
          style={{ WebkitLineClamp: 2 }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-montserrat text-[11px] sm:text-xs text-slate-600 mb-3 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Footer com data e seção - separados por divisão vertical */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 group-hover:border-emerald-800/30">
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-[10px] sm:text-xs text-slate-500 group-hover:text-slate-600">
              {article.date}
            </span>
            {article.section && (
              <>
                <div className="h-3 w-px bg-slate-300"></div>
                <div className="flex items-center gap-1.5">
                  {getSectionIcon(article.section)}
                  <span className="font-montserrat-semibold text-[10px] sm:text-xs text-slate-600">
                    {article.section}
                  </span>
                </div>
              </>
            )}
          </div>
          {/* Ícone de seta no hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

