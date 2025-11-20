'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightning, Scales, Calendar, CalendarCheck, Bell } from 'phosphor-react'
import RadarMercadoCard from './RadarMercadoCard'
import BalancaForca from './BalancaForca'
import AgendaMercado from './AgendaMercado'
import Sazonalidades from './Sazonalidades'
import Alertas from './Alertas'
import type { NewsArticle } from '../types'

interface NewsGridProps {
  articles: NewsArticle[]
}

const filterButtons = [
  { id: 'drivers', label: 'Drivers de Mercado', icon: Lightning },
  { id: 'balanca', label: 'Balança de Força', icon: Scales },
  { id: 'agenda', label: 'Agenda de Mercado', icon: Calendar },
  { id: 'sazonalidades', label: 'Sazonalidades', icon: CalendarCheck },
  { id: 'alertas', label: 'Alertas', icon: Bell },
]

export default function NewsGrid({ articles }: NewsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId)
  }

  // Limitar a apenas 4 cards
  const displayedArticles = articles.slice(0, 4)

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {/* Coluna 1: Botões de filtro stacked */}
      <div className="flex flex-col gap-0 border-r border-slate-200/60 pr-2">
        {filterButtons.map((button, index) => {
          const Icon = button.icon
          const isActive = activeFilter === button.id
          const isLast = index === filterButtons.length - 1
          
          return (
            <motion.button
              key={button.id}
              onClick={() => handleFilterClick(button.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center gap-3 px-4 py-3.5 border-l-2 transition-all duration-300
                ${!isLast ? 'border-b border-slate-200/60' : ''}
                ${isActive 
                  ? 'bg-emerald-50/50 border-l-emerald-800 text-emerald-800' 
                  : 'bg-white border-l-transparent text-slate-700 hover:bg-slate-50 hover:border-l-slate-400'
                }
              `}
            >
              <Icon 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-emerald-800' : 'text-slate-500'}`}
                weight={isActive ? 'fill' : 'regular'}
              />
              <span className={`
                font-montserrat-semibold text-xs text-left flex-1
                ${isActive ? 'text-emerald-800' : 'text-slate-700'}
              `}>
                {button.label}
              </span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-800"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Colunas 2 e 3: Cards 2x2, Balança de Força, Agenda de Mercado, Sazonalidades ou Alertas */}
      <div className="col-span-2">
        {activeFilter === 'balanca' ? (
          <BalancaForca />
        ) : activeFilter === 'agenda' ? (
          <AgendaMercado />
        ) : activeFilter === 'sazonalidades' ? (
          <Sazonalidades />
        ) : activeFilter === 'alertas' ? (
          <Alertas />
        ) : (
          <div className="grid grid-cols-2 gap-1">
            {displayedArticles.map((article, i) => (
              <RadarMercadoCard key={i} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
