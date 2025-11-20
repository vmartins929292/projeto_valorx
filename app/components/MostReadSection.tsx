'use client'

import { motion } from 'framer-motion'
import { Bookmark, Share2 } from 'lucide-react'
import type { NewsArticle } from '../types'

interface MostReadSectionProps {
  articles?: NewsArticle[]
}

const defaultArticles: NewsArticle[] = [
  {
    title: 'Soja brasileira atinge recorde de exportação com embarques de 98 milhões de toneladas',
    excerpt: 'Brasil consolida posição como maior exportador mundial após superar expectativas do mercado com forte demanda chinesa e condições climáticas favoráveis na safra 2024/25.',
    tag: 'Soja',
    date: '10 jan 2025'
  },
  {
    title: 'Milho dispara 8% na CBOT após relatório de estoques menores que o esperado',
    excerpt: 'Mercado internacional reage positivamente aos dados do USDA que mostraram redução nos estoques globais, impulsionando cotações para máximas de 3 meses.',
    tag: 'Milho',
    date: '10 jan 2025'
  },
  {
    title: 'Café arábica sobe 12% com temor de geada em regiões produtoras do Brasil',
    excerpt: 'Traders ficam em alerta com previsões meteorológicas indicando possíveis ondas de frio nas principais áreas de cultivo, elevando prêmios de risco.',
    tag: 'Café',
    date: '09 jan 2025'
  },
  {
    title: 'Açúcar bate máxima histórica com corte na produção da Índia e demanda aquecida',
    excerpt: 'Cotação internacional ultrapassa US$ 0,28 por libra após anúncio de redução na safra indiana e aumento da demanda por etanol no mercado global.',
    tag: 'Açúcar',
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
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-cyan-50/30 p-4 mb-2 overflow-hidden rounded-xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#01b792]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="font-montserrat-semibold text-2xl text-cyan-950 flex items-center gap-2">
            <span className="inline-block w-1 h-8 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full" />
            Mais lidas
          </h2>
          
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {['Dia', 'Semana', 'Mês'].map((tab, index) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg font-montserrat-medium transition-all duration-300 relative overflow-hidden text-cyan-950/80 hover:bg-white/40 hover:backdrop-blur-sm ${
                  index < 2 ? 'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-5 after:bg-gradient-to-b after:from-transparent after:via-emerald-400/60 after:to-transparent' : ''
                }`}
                style={{ fontSize: '10px' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Articles grid with stagger animation */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group relative flex gap-1 cursor-pointer p-3 -m-3 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Efeito moderno de hover - borda brilhante e brilho suave */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {/* Borda brilhante com glow */}
                  <div className="absolute inset-0 rounded-lg border border-emerald-400/25 shadow-[0_0_15px_rgba(16,185,129,0.12)]" />
                  {/* Brilho suave central */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/6 via-emerald-500/2 to-transparent" />
                </div>
                
                {/* Large ranking number */}
                <div className="flex-shrink-0 flex items-start pt-0 pr-2 relative z-10">
                  <span className="font-montserrat-bold text-cyan-950/20 group-hover:text-[#00b875] transition-colors duration-300" style={{ fontSize: '38px', lineHeight: '0.9', fontWeight: 900 }}>
                    {i + 1}
                  </span>
                </div>
                
                {/* Card content */}
                <div className="flex-1 relative z-10 min-w-0 max-w-[calc(100%-50px)] flex flex-col">
                  <div className="relative flex-1">
                    <div className="flex flex-col gap-2 mb-3">
                      <h3 className="font-montserrat-medium text-xs text-cyan-950 break-words line-clamp-3 group-hover:text-emerald-700 transition-colors duration-300 leading-[0.85]" style={{ fontSize: '13px' }}>
                        {article.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-200/60">
                      <span className="font-montserrat text-slate-500" style={{ fontSize: '9px' }}>{article.date}</span>
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
