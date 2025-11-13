'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICONS } from '../../icons'
import MarketWidget from '../MarketWidget'
import Card from '../legacy/Card'
import svgPaths from '../legacy/svg-9po0gahbk9'
import { MarketCategory } from '../../types'

export default function Sidebar() {
  const [greetingExpanded, setGreetingExpanded] = useState(true)
  const [showExpandButton, setShowExpandButton] = useState(false)
  const greetingHasBeenToggled = useRef(false)
  const [selectedMarketCategory, setSelectedMarketCategory] = useState<MarketCategory>('agricolas')

  return (
    <aside className="lg:w-[344px] space-y-4">
      {/* Personalized Card */}
      <div className="bg-white rounded-xl card-border shadow-sm overflow-hidden personalized-card relative">
        <div className={`${greetingExpanded ? 'p-6 pb-8 space-y-5' : 'p-6 pb-8'}`}>
          {/* Saudação */}
          {greetingHasBeenToggled.current ? (
            <AnimatePresence mode="wait" initial={false}>
              {greetingExpanded && (
                <motion.div
                  key="greeting-card"
                  className="relative rounded-lg p-4 overflow-hidden mb-5"
                  layout
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto',
                    marginBottom: '1.25rem'
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    marginBottom: 0
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.15 }
                  }}
                  style={{ 
                    overflow: 'hidden',
                    willChange: 'opacity, height'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/35 border border-emerald-100/30"></div>
                  
                  <div className="relative z-10">
                    <p className="font-montserrat-semibold title text-cyan-950 mb-3">
                      Boa tarde, Alex Monteiro
                    </p>
                    <p 
                      className="font-montserrat lead leading-relaxed" 
                      style={{ fontSize: '10px', lineHeight: '1.8' }}
                    >
                      • Bolsas sobem com possibilidade de acordo China e EUA<br/>
                      • Soja dispara na CBOT e atinge máximas de 5 meses<br/>
                      • Prêmios no Brasil recuam com maior pressão de fixações<br/>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            greetingExpanded && (
              <div className="relative rounded-lg p-4 overflow-hidden mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/35 border border-emerald-100/30"></div>
                
                <div className="relative z-10">
                  <p className="font-montserrat-semibold title text-cyan-950 mb-3">
                    Boa tarde, Alex Monteiro
                  </p>
                  <p 
                    className="font-montserrat lead leading-relaxed" 
                    style={{ fontSize: '10px', lineHeight: '1.8' }}
                  >
                    • Bolsas sobem com possibilidade de acordo China e EUA<br/>
                    • Soja dispara na CBOT e atinge máximas de 5 meses<br/>
                    • Prêmios no Brasil recuam com maior pressão de fixações<br/>
                  </p>
                </div>
              </div>
            )
          )}

          {/* Separador Estilizado com Botão */}
          <AnimatePresence>
            {greetingExpanded && (
              <motion.div 
                className="relative py-2 flex items-center justify-center"
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                style={{ willChange: 'opacity, height' }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    greetingHasBeenToggled.current = true
                    setGreetingExpanded(false)
                  }}
                  className="relative z-10 bg-white border border-slate-300 rounded-full p-0.5 transition-transform duration-150 hover:scale-110"
                  aria-label="Fechar saudação"
                  type="button"
                >
                  <ICONS.ChevronUp size={12} className="text-slate-600" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Área de hover para mostrar botão quando minimizado */}
          {!greetingExpanded && (
            <div 
              className="absolute top-0 left-0 right-0 h-10 z-20 flex items-center justify-center"
              onMouseEnter={() => setShowExpandButton(true)}
              onMouseLeave={() => setShowExpandButton(false)}
            >
              <AnimatePresence>
                {showExpandButton && (
                  <motion.div
                    key="hover-area"
                    className="absolute inset-0 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showExpandButton && (
                  <motion.button
                    key="expand-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      greetingHasBeenToggled.current = true
                      setGreetingExpanded(true)
                      setShowExpandButton(false)
                    }}
                    className="relative z-10 bg-white border border-slate-300 rounded-full p-0.5"
                    aria-label="Abrir saudação"
                    initial={{ opacity: 0, boxShadow: '0 0 0px rgba(34, 197, 94, 0)' }}
                    animate={{ 
                      opacity: 1,
                      boxShadow: [
                        '0 0 0px rgba(34, 197, 94, 0)',
                        '0 0 10px rgba(34, 197, 94, 0.6)',
                        '0 0 20px rgba(34, 197, 94, 0.4)',
                        '0 0 10px rgba(34, 197, 94, 0.6)'
                      ]
                    }}
                    exit={{ opacity: 0, boxShadow: '0 0 0px rgba(34, 197, 94, 0)' }}
                    transition={{ 
                      opacity: { duration: 0.2 },
                      boxShadow: { 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <ICONS.ChevronDown size={12} className="text-slate-600" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Widget de Cotações */}
          <motion.div 
            className="mt-1 relative z-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <motion.div 
              className="flex items-center justify-between gap-2 mb-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              <motion.h2 
                className="cursor-default flex-shrink-0" 
                style={{ 
                  fontSize: '13px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  color: 'rgb(100, 116, 139)',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Monitor de Mercado 
              </motion.h2>
              
              <motion.div 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
              >
                <motion.div 
                  className="flex items-center justify-center bg-white border border-slate-300 rounded-md px-2.5 py-0.5 min-w-[85px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                >
                  <motion.span
                    key={selectedMarketCategory}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'rgb(100, 116, 139)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedMarketCategory === 'agricolas' && 'Agrícolas'}
                    {selectedMarketCategory === 'metalicas' && 'Metálicas'}
                    {selectedMarketCategory === 'indices' && 'Índices'}
                    {selectedMarketCategory === 'fx' && 'FX'}
                  </motion.span>
                </motion.div>
                
                <motion.button
                  onClick={() => {
                    const categories: MarketCategory[] = ['agricolas', 'metalicas', 'indices', 'fx']
                    const currentIndex = categories.indexOf(selectedMarketCategory)
                    const nextIndex = (currentIndex + 1) % categories.length
                    setSelectedMarketCategory(categories[nextIndex])
                  }}
                  className="bg-white border border-slate-300 rounded-full p-0.5 flex-shrink-0"
                  aria-label="Próxima categoria de mercado"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                >
                  <ICONS.ChevronRight size={12} className="text-slate-600" />
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mb-1.5 border-b border-slate-200 w-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
            >
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <MarketWidget category={selectedMarketCategory} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Latest News Feed */}
      <div>
        <Card />
      </div>
    </aside>
  )
}

