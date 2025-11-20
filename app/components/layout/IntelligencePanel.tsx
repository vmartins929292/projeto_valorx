'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface IntelligenceMetric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
}

const defaultMetrics: IntelligenceMetric[] = [
  {
    label: 'Índice de Confiança',
    value: '72.5',
    change: 2.3,
    trend: 'up'
  },
  {
    label: 'Volatilidade',
    value: '15.2%',
    change: -1.8,
    trend: 'down'
  },
  {
    label: 'Momentum',
    value: 'Alto',
    change: 5.1,
    trend: 'up'
  }
]

export default function IntelligencePanel() {
  return (
    <section className="relative bg-white rounded-xl card-border shadow-sm overflow-hidden mb-6">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b border-slate-200/60">
        <h2 className="font-montserrat-semibold text-lg sm:text-xl text-cyan-950 flex items-center gap-2">
          <span className="inline-block w-1 h-6 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full" />
          Painel de Inteligência
        </h2>
        <p className="font-montserrat text-xs text-slate-600 mt-1">
          Indicadores em tempo real do mercado
        </p>
      </div>

      {/* Metrics grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {defaultMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-4 border border-slate-200/60 hover:border-emerald-800/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-montserrat text-xs text-slate-600">
                  {metric.label}
                </span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat-semibold text-xl text-cyan-950">
                  {metric.value}
                </span>
                <span className={`font-montserrat-medium text-xs ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity indicator */}
        <div className="mt-6 pt-4 border-t border-slate-200/60">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="font-montserrat text-xs text-slate-600">
              Última atualização: há 2 minutos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
