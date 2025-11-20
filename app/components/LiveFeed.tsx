'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChevronLeft, ChevronRight, Heart, Share2, Pin, Plus, Radio, TrendingUp, TrendingDown } from 'lucide-react'
import { formatTimestamp } from '../utils/websocket'
import type { ConnectionStatus, LiveFeedEntry, LiveFeedChartData, LiveFeedHeaderData } from '../types'

interface LiveFeedProps {
  connectionStatus: ConnectionStatus
  headerData: LiveFeedHeaderData
  chartData: LiveFeedChartData
  entries: LiveFeedEntry[]
}

const COLORS = {
  soja: '#10b981', // emerald-500
  milho: '#f59e0b', // amber-500
  dolar: '#3b82f6', // blue-500
  indices: '#8b5cf6', // violet-500
}

// Categorias para filtros
const CATEGORIES = [
  'Conteúdo',
  'Soja',
  'Prêmios',
  'Algodão',
  'Fundos',
  'Dólar',
  'Putin',
  'Tarifaço',
  'Importações',
]

// Função para formatar timestamp relativo
const formatRelativeTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp)
    const agora = new Date()
    const diferencaMs = agora.getTime() - date.getTime()
    const diferencaMin = Math.floor(diferencaMs / 60000)
    
    if (diferencaMin < 1) return 'Agora'
    if (diferencaMin < 60) return `Há ${diferencaMin} min`
    
    const diferencaHoras = Math.floor(diferencaMin / 60)
    if (diferencaHoras < 24) return `Há ${diferencaHoras}h`
    
    const diferencaDias = Math.floor(diferencaHoras / 24)
    return `Há ${diferencaDias} dia${diferencaDias > 1 ? 's' : ''}`
  } catch {
    return timestamp
  }
}

export default function LiveFeed({ connectionStatus, headerData, chartData, entries }: LiveFeedProps) {
  const isConnected = connectionStatus === 'connected'
  const [selectedCategory, setSelectedCategory] = useState<string>('Prêmios')
  const [tempoAtual, setTempoAtual] = useState(new Date())
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Atualizar tempo a cada minuto para timestamps relativos
  useEffect(() => {
    const interval = setInterval(() => {
      setTempoAtual(new Date())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])

  // Filtrar entradas por categoria
  const filteredEntries = entries.filter(entry => {
    if (selectedCategory === 'Conteúdo') return true
    return entry.tag === selectedCategory || entry.category === selectedCategory
  })

  // Cotações do mercado derivadas do chartData (último e variação contra ponto anterior)
  const marketQuotes = (() => {
    const series = chartData?.series ?? []
    if (!series.length) {
      return [
        { key: 'soja', label: 'Soja', last: 0, changePct: 0, colorClass: 'text-emerald-600' },
        { key: 'milho', label: 'Milho', last: 0, changePct: 0, colorClass: 'text-amber-500' },
        { key: 'dolar', label: 'Dólar', last: 0, changePct: 0, colorClass: 'text-blue-500' },
        { key: 'indices', label: 'Macro', last: 0, changePct: 0, colorClass: 'text-violet-500' },
      ] as const
    }
    const lastPoint = series[series.length - 1] as Record<string, number | string | undefined>
    const prevPoint = (series[series.length - 2] ?? series[0]) as Record<string, number | string | undefined>
    const toNumber = (v: number | string | undefined) => (typeof v === 'number' ? v : 0)
    const metrics: Array<{ key: 'soja' | 'milho' | 'dolar' | 'indices'; label: string; colorClass: string }> = [
      { key: 'soja', label: 'Soja', colorClass: 'text-emerald-600' },
      { key: 'milho', label: 'Milho', colorClass: 'text-amber-500' },
      { key: 'dolar', label: 'Dólar', colorClass: 'text-blue-500' },
      { key: 'indices', label: 'Macro', colorClass: 'text-violet-500' },
    ]
    return metrics.map(({ key, label, colorClass }) => {
      const last = toNumber(lastPoint[key])
      const prevRaw = lastPoint[key] ?? last
      const prev = toNumber(prevRaw)
      const changePct = prev === 0 ? 0 : ((last - prev) / prev) * 100
      return { key, label, last, changePct, colorClass }
    })
  })()

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full">
      {/* Banner/Tarja superior com conteúdo */}
      <div className="w-full bg-yellow-400 px-4 sm:px-6 py-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-montserrat-semibold text-lg sm:text-xl text-white">
              Live feed
            </h1>
            {/* Badge "Ao vivo" */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-md">
              <Radio className="w-3 h-3 text-white" />
              <span className="font-montserrat-semibold text-xs text-white uppercase">
                Ao vivo
              </span>
            </div>
          </div>
          <span className="font-montserrat text-xs sm:text-sm text-white/90">
            Atualizado há {Math.floor((new Date().getTime() - new Date(headerData.lastUpdate).getTime()) / 60000)} minutos
          </span>
        </div>
      </div>

      {/* Barra de filtros horizontal scrollável */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2">
          {/* Botão scroll esquerdo */}
          <button
            onClick={() => scrollCategories('left')}
            className="flex-shrink-0 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          
          {/* Container scrollável */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
          >
            <div className="flex gap-2 px-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-md font-montserrat-semibold text-xs transition-all
                    ${selectedCategory === category
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-white text-slate-600 hover:bg-slate-50'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Botão scroll direito */}
          <button
            onClick={() => scrollCategories('right')}
            className="flex-shrink-0 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Gráfico + Grid de Cotações */}
      <div className="mb-8 bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-montserrat-semibold text-lg sm:text-xl text-cyan-950">
            Curva de Futuros & Cotações
          </h3>
          <div className="hidden sm:flex items-center gap-3">
            {marketQuotes.map((q) => {
              const isUp = q.changePct >= 0
              return (
                <div key={q.key} className="flex items-center gap-1">
                  <span className={`font-montserrat text-xs ${q.colorClass}`}>{q.label}</span>
                  <span className="font-montserrat text-xs text-slate-400">•</span>
                  <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span className="font-montserrat-semibold text-xs">
                      {q.changePct.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Área do gráfico */}
          <div className="md:col-span-2">
            <div className="w-full h-48 sm:h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                    label={{ value: 'Variação (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fontFamily: 'Montserrat' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontFamily: 'Montserrat',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontFamily: 'Montserrat', fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="soja" 
                    stroke={COLORS.soja} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Soja"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="milho" 
                    stroke={COLORS.milho} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Milho"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dolar" 
                    stroke={COLORS.dolar} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Dólar"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="indices" 
                    stroke={COLORS.indices} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Índices"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid de cotações com separador responsivo */}
          <div className="md:border-l md:pl-6 md:ml-0 border-t md:border-t-0 border-slate-200 pt-6 md:pt-0">
            <div className="mb-3">
              <h4 className="font-montserrat-semibold text-sm text-cyan-950">
                Cotações do Mercado
              </h4>
              <p className="font-montserrat text-[11px] text-slate-500">
                Último e variação diária
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {marketQuotes.map((q) => {
                const isUp = q.changePct >= 0
                return (
                  <div
                    key={q.key}
                    className="rounded-lg border border-slate-200 p-3 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-montserrat-medium text-xs ${q.colorClass}`}>
                        {q.label}
                      </span>
                      <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span className="font-montserrat-semibold text-xs">
                          {q.changePct.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="font-montserrat-semibold text-sm text-cyan-950">
                        {q.last.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3 mt-6">
          <span className="font-montserrat">Fonte: Valor News</span>
          <span className="font-montserrat">
            Atualizado em {formatTimestamp(chartData.lastUpdate)}
          </span>
        </div>
      </div>

      {/* Cards de notícias */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-montserrat text-slate-500">
              Nenhuma notícia encontrada para esta categoria.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => {
            const isPinned = index === 0 // Apenas o primeiro card é pinado
            
            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ${
                  isPinned ? 'border-2 border-teal-800' : 'border border-slate-200'
                }`}
              >
                {/* Header do card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {isPinned && <Pin className="w-4 h-4 text-teal-800" />}
                    <span className="font-montserrat text-xs text-slate-500">
                      Postado {formatRelativeTime(entry.timestamp)}
                    </span>
                  </div>
                </div>

              {/* Título */}
              <h2 className="font-montserrat-semibold text-xl sm:text-2xl md:text-3xl text-cyan-950 mb-4 leading-tight">
                {entry.title}
              </h2>

              {/* Metadata: Badge + Autor + Timestamp */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {entry.tag && (
                  <span className="font-montserrat-semibold text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded">
                    {entry.tag}
                  </span>
                )}
                {entry.author && (
                  <>
                    <span className="font-montserrat text-xs text-slate-500">
                      por {entry.author}
                    </span>
                    <span className="font-montserrat text-xs text-orange-600">
                      {formatRelativeTime(entry.timestamp)}
                    </span>
                  </>
                )}
              </div>

              {/* Ícones de ação */}
              <div className="flex items-center justify-end gap-3 mb-4">
                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Resumo/Excerpt */}
              {entry.excerpt && (
                <p className="font-montserrat text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  {entry.excerpt}
                </p>
              )}

              {/* Botão "Ver mais" */}
              <div className="flex justify-center pt-4 border-t border-slate-200">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-cyan-950 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="font-montserrat-semibold text-sm">Ver mais</span>
                </button>
              </div>
            </motion.article>
            )
          })
        )}
      </div>
    </div>
  )
}

