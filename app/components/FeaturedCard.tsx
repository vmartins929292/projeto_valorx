'use client'

/**
 * FEATURED CARD - Carrossel de notícias em destaque
 * 
 * ESTRUTURA:
 * - Grid estático: layout não remonta a cada slide, apenas conteúdo interno anima
 * - Altura fixa em mobile/sm (360px/380px) para estabilidade
 * - Coluna de imagem: altura fixa no mobile (h-36 sm:h-40) e md:h-full no desktop
 * - Coluna de texto: h-full com overflow-hidden, highlights com scroll interno
 * - AnimatePresence apenas na imagem (crossfade sync) para evitar mostrar fundo
 * - Padding fixo de 12px em highlights e controles para espaçamento consistente
 * - Controles sempre fixos no bottom com mt-auto
 */

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ICONS } from '../icons'
import type { FeaturedArticle } from '../types'

interface FeaturedCardProps {
  article?: FeaturedArticle
  autoplayInterval?: number
  titleLineHeight?: string | number // Controle do espaçamento entre linhas do título
}

// Constantes de animação e timing
const TYPEWRITER_CONFIG = {
  charSpeed: 12,
  fadeInDuration: 100,
  baseDelay: 200,
} as const

// Transitions agrupadas
const TRANSITIONS = {
  title: { duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  update: { duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  badge: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
  image: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
  highlights: { duration: 0.1, ease: [0.4, 0, 0.2, 1] as const },
  controls: { duration: 0.1, ease: [0.4, 0, 0.2, 1] as const },
  progress: { duration: 0.05, ease: 'linear' as const }
} as const

// Estilos de gradiente reutilizáveis
const BASE_GRADIENT_STYLE = { animation: 'pulse-gradient 12s ease-in-out infinite' } as const
const TEXT_GRADIENT_STYLE = { animation: 'pulse-gradient 8s ease-in-out infinite' } as const
const IMAGE_GRADIENT_STYLE_1 = { animation: 'pulse-gradient 10s ease-in-out infinite' } as const
const IMAGE_GRADIENT_STYLE_2 = { animation: 'pulse-gradient 14s ease-in-out infinite' } as const

// Estilos estáticos reutilizáveis
const LIST_ITEM_STYLE = { 
  position: 'relative' as const,
  minHeight: '1.5em'
}

const HIDDEN_TEXT_STYLE = { 
  visibility: 'hidden' as const,
  display: 'block' as const,
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-word' as const
}

const HIGHLIGHTS_CONTAINER_STYLE = {
  minWidth: 0,
  scrollbarWidth: 'none' as const,
  msOverflowStyle: 'none' as const
}

const IMAGE_WRAPPER_STYLE = {
  backgroundColor: '#f1f5f9',
  flexShrink: 0
}

const IMAGE_MOTION_STYLE = {
  willChange: 'opacity' as const,
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  pointerEvents: 'none' as const
}

const IMAGE_STYLE = {
  objectFit: 'cover' as const
}

// Set para rastrear imagens já pré-carregadas
const preloadedImages = new Set<string>()

// Hook para detectar prefers-reduced-motion
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}

// Componente de item com efeito typewriter - otimizado com requestAnimationFrame
const TypewriterListItem = memo(function TypewriterListItem({ 
  text, 
  index, 
  className, 
  articleKey,
  avgCharCount,
  prefersReducedMotion = false
}: { 
  text: string
  index: number
  className?: string
  articleKey: string | number
  avgCharCount: number
  prefersReducedMotion?: boolean
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [shouldStart, setShouldStart] = useState(false)
  
  const fullText = useMemo(() => `• ${text}`, [text])
  const { charSpeed, fadeInDuration, baseDelay } = TYPEWRITER_CONFIG
  
  // Calcula delay inicial baseado no índice
  useEffect(() => {
    setDisplayedText('')
    setShouldStart(false)
    
    let totalDelay = baseDelay
    
    if (index > 0 && avgCharCount > 0) {
      const avgDelayPerItem = fadeInDuration + (avgCharCount * charSpeed)
      totalDelay += avgDelayPerItem * index
    }
    
    const startTimer = setTimeout(() => setShouldStart(true), totalDelay)
    return () => clearTimeout(startTimer)
  }, [index, articleKey, avgCharCount, baseDelay, charSpeed, fadeInDuration])

  // Animação typewriter otimizada com requestAnimationFrame
  useEffect(() => {
    if (!shouldStart) return
    
    // Se reduzir movimento, mostrar texto completo imediatamente
    if (prefersReducedMotion) {
      setDisplayedText(fullText)
      return
    }
    
    let currentIndex = 0
    let lastTime = performance.now()
    let rafId: number
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime
      
      if (elapsed >= charSpeed) {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
          lastTime = currentTime
        } else {
          return
        }
      }
      
      rafId = requestAnimationFrame(animate)
    }
    
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [shouldStart, fullText, charSpeed, prefersReducedMotion])
  
  return (
    <motion.li
      className={className}
      style={LIST_ITEM_STYLE}
    >
      <span 
        style={HIDDEN_TEXT_STYLE} 
        aria-hidden="true"
      >
        {fullText}
      </span>
      <span 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          opacity: shouldStart ? 1 : 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          transition: `opacity ${fadeInDuration}ms ease-out`
        }}
      >
        {displayedText}
      </span>
    </motion.li>
  )
})

// Dados de exemplo para o carrossel
// NOTA: Para usar vídeos, adicione o arquivo na pasta public/videos/ e defina:
// - video: '/videos/nome-do-video.mp4' (caminho do vídeo)
// - image: '/images/imagem-fallback.jpg' (imagem usada como fallback se vídeo falhar ou como poster)
// - videoPoster: '/images/poster.jpg' (opcional: imagem específica para poster do vídeo)
// O componente automaticamente usa a imagem como fallback se o vídeo não carregar
const carouselArticles: FeaturedArticle[] = [
  {
    title: 'Safra de soja brasileira bate recorde histórico e deve atingir 165 milhões de toneladas',
    updateText: 'Última atualização:',
    updateDate: '26 out 2025 • 14:32',
    tag: 'Soja',
    isLive: true,
    liveBadgeText: 'Ao vivo',
    image: '/images/soy_crop.jpeg',
    highlights: [
      'Produção supera expectativas em 8% devido a condições climáticas favoráveis',
      'Exportações para China crescem 12% no terceiro trimestre',
      'Preço da saca atinge R$ 145, maior valor dos últimos 5 anos'
    ]
  },
  {
    title: 'Dólar fecha em queda de 1,8% após decisão do Banco Central de manter taxa Selic',
    updateText: 'Última atualização:',
    updateDate: '26 out 2025 • 16:15',
    tag: 'Dólar',
    video: '/videos/dólar_down.mp4',
    image: '/images/dólar.jpeg', // Fallback se vídeo não carregar
    highlights: [
      'Moeda americana cotada a R$ 4,87 no fechamento do mercado',
      'Copom mantém Selic em 10,75% ao ano pela terceira reunião consecutiva',
      'Investidores celebram decisão e Ibovespa sobe 2,3%'
    ]
  },
  {
    title: 'Petróleo Brent dispara 15% e atinge maior patamar desde 2022',
    updateText: 'Última atualização:',
    updateDate: '26 out 2025 • 11:45',
    tag: 'Commodities',
    isLive: true,
    liveBadgeText: 'Ao vivo',
    video: '/videos/petroleo.mp4',
    image: '/images/crude.jpeg', // Fallback se vídeo não carregar
    highlights: [
      'Barril negociado a US$ 94,50 após tensões geopolíticas no Oriente Médio',
      'OPEP+ anuncia corte adicional de 500 mil barris por dia na produção',
      'Petrobras anuncia reajuste de 8% no preço da gasolina nas refinarias'
    ]
  },
  {
    title: 'China aumenta em 28% importação de carne bovina brasileira e consolida Brasil como maior exportador',
    updateText: 'Última atualização:',
    updateDate: '26 out 2025 • 09:20',
    tag: 'Exportação',
    image: '/images/hero-field.jpg',
    highlights: [
      'Exportações atingem 1,2 milhão de toneladas no último trimestre',
      'Acordo bilateral reduz tarifas de importação em 15%',
      'Frigoríficos brasileiros ampliam capacidade produtiva em 20%'
    ]
  }
]

function FeaturedCard({ article, autoplayInterval = 12000, titleLineHeight = 1.15 }: FeaturedCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoError, setVideoError] = useState<Record<number, boolean>>({})
  const prefersReducedMotion = usePrefersReducedMotion()

  const articles: FeaturedArticle[] = useMemo(() => 
    article ? [article] : carouselArticles, 
    [article]
  )
  
  const showCarousel = useMemo(() => articles.length > 1, [articles.length])
  const currentArticle = useMemo(() => articles[currentIndex], [articles, currentIndex])
  
  // Pré-calcular avgCharCount para evitar recálculo em cada TypewriterListItem
  const avgHighlightCharCount = useMemo(() => {
    if (!currentArticle.highlights || currentArticle.highlights.length === 0) return 0
    return currentArticle.highlights.reduce((sum, txt) => sum + (txt?.length || 0), 0) / currentArticle.highlights.length
  }, [currentArticle.highlights])

  useEffect(() => {
    setProgress(0)
    // Reset video error quando muda de slide
    setVideoError({})
  }, [currentIndex])

  // Pré-carregar próximas imagens e posters de vídeo (otimizado com Set para evitar duplicatas)
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % articles.length
    const prevIndex = (currentIndex - 1 + articles.length) % articles.length
    
    const mediaToPreload = [
      articles[nextIndex]?.image,
      articles[nextIndex]?.videoPoster,
      articles[prevIndex]?.image,
      articles[prevIndex]?.videoPoster
    ].filter(Boolean) as string[]
    
    mediaToPreload.forEach((mediaSrc) => {
      if (!mediaSrc || preloadedImages.has(mediaSrc)) return
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = mediaSrc
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      preloadedImages.add(mediaSrc)
    })
  }, [currentIndex, articles.length])

  // Timer automático com barra de progresso
  useEffect(() => {
    if (!showCarousel || isPaused) return

    let rafId: number | null = null
    let startTime = performance.now()
    let cancelled = false

    const updateProgress = () => {
      if (cancelled) return
      
      const elapsed = performance.now() - startTime
      const newProgress = Math.min((elapsed / autoplayInterval) * 100, 100)
      
      setProgress(newProgress)
      
      if (newProgress < 100) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }

    rafId = requestAnimationFrame(updateProgress)

    const autoplayTimer = setTimeout(() => {
      if (!cancelled) {
        setCurrentIndex((prev) => (prev + 1) % articles.length)
      }
    }, autoplayInterval)

    return () => {
      cancelled = true
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearTimeout(autoplayTimer)
    }
  }, [isPaused, showCarousel, articles.length, autoplayInterval, currentIndex])

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return
    setProgress(0)
    setCurrentIndex(index)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    setProgress(0)
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + articles.length) % articles.length
      return newIndex
    })
  }, [articles.length])

  const goToNext = useCallback(() => {
    setProgress(0)
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % articles.length
      return newIndex
    })
  }, [articles.length])

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  return (
    <article 
      className="bg-white rounded-xl card-border shadow-sm mb-6 hover:shadow-md transition-all duration-300 ease-in-out relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container principal: altura definida pelo conteúdo */}
      <div className="relative w-full bg-white">
        {/* Grid estático - não remonta a cada slide */}
        <div className="flex flex-col md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,0.9fr)] lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] w-full md:items-stretch min-h-[200px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px] xl:min-h-[300px]">
          {/* Degradê na base de todo o carrossel */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2a9d8f]/10 via-[#2a9d8f]/5 to-transparent pointer-events-none z-20 opacity-70"
            style={BASE_GRADIENT_STYLE}
          />
          
          {/* Coluna de texto: layout estático, apenas conteúdo interno anima */}
          <div className="px-3 pt-4 pb-0 sm:px-4 sm:pt-5 sm:pb-0 md:px-5 md:pt-7 md:pb-0 lg:px-6 lg:pt-8 lg:pb-0 flex flex-col relative bg-gradient-to-br from-white via-slate-50/30 to-white min-w-0 order-2 md:order-1 md:flex-shrink-0 md:h-full">
            {/* Degradê na parte superior da coluna de texto */}
            <div 
              className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/60 via-white/20 to-transparent pointer-events-none z-10 opacity-75"
              style={TEXT_GRADIENT_STYLE}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col w-full">
              {/* Título e Badge - sempre visíveis, sem scroll */}
              <div className="flex-shrink-0 pt-0 min-h-0">
                <motion.div 
                  key={`title-container-${currentIndex}`}
                  className="mb-2 sm:mb-2 md:mb-2.5 lg:mb-3"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0.1 } : TRANSITIONS.title}
                >
                  <h2 
                    className="font-montserrat-semibold text-[13px] sm:text-[14px] md:text-[20px] lg:text-[19px] xl:text-[20px] text-cyan-950 pr-1 w-full"
                    style={{ lineHeight: titleLineHeight ?? 1.2, willChange: 'opacity, transform', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    {currentArticle.title}
                  </h2>
                </motion.div>
                
                {/* Update timestamp com Badge */}
                <motion.div 
                  key={`update-container-${currentIndex}`}
                  className="mb-1.5 sm:mb-1.5 md:mb-2 lg:mb-2 flex items-center flex-wrap gap-1"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0.1 } : TRANSITIONS.update}
                  style={{ willChange: 'opacity, transform' }}
                >
                  {currentArticle.isLive && (
                    <motion.span 
                      key={`badge-${currentIndex}`}
                      className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] font-montserrat-semibold uppercase tracking-wider rounded-md whitespace-nowrap"
                      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0.1 } : TRANSITIONS.badge}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                      </span>
                      {currentArticle.liveBadgeText || 'Ao vivo'}
                    </motion.span>
                  )}
                  <span className="font-montserrat-medium text-[10px] sm:text-[10px] md:text-[12px] lg:text-[11px] xl:text-[11px] text-red-600 whitespace-nowrap">
                    {currentArticle.updateText}
                  </span>
                  <span className="font-montserrat-medium text-[10px] sm:text-[10px] md:text-[12px] lg:text-[11px] xl:text-[11px] text-cyan-950 whitespace-nowrap">
                    {currentArticle.updateDate}
                  </span>
                </motion.div>
              </div>
              
              {/* Highlights - área que sempre mostra conteúdo completo */}
              {currentArticle.highlights && currentArticle.highlights.length > 0 ? (
                <motion.div 
                  className="border-t border-slate-200 flex items-start w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide md:flex-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={prefersReducedMotion ? { duration: 0.05 } : TRANSITIONS.highlights}
                  style={HIGHLIGHTS_CONTAINER_STYLE}
                >
                  <ul className="pt-4 pb-4 sm:pt-4 sm:pb-4 md:pt-4 md:pb-4 space-y-0.5 sm:space-y-0.5 md:space-y-1 lg:space-y-1 font-montserrat text-[8.5px] sm:text-[8.5px] md:text-[11px] lg:text-[10.5px] xl:text-[10.5px] text-cyan-950 w-full min-w-0 leading-relaxed tracking-tight">
                    {currentArticle.highlights.map((highlight, index) => (
                      <TypewriterListItem
                        key={`${currentIndex}-${index}`}
                        text={highlight}
                        index={index}
                        articleKey={currentIndex}
                        avgCharCount={avgHighlightCharCount}
                        className="break-words"
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div className="border-t border-slate-200 flex-1 flex items-center min-h-0"></div>
              )}
              
              {/* Controles - sempre fixos na parte inferior com padding adequado */}
              {showCarousel && (
                <motion.div 
                  className="flex flex-wrap items-center justify-between gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 border-t border-slate-200 z-30 flex-shrink-0 w-full bg-gradient-to-br from-white via-slate-50/30 to-white mt-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={prefersReducedMotion ? { duration: 0.05 } : TRANSITIONS.controls}
                  style={{ 
                    minHeight: '26px',
                    flexShrink: 0,
                    paddingTop: '12px',
                    paddingBottom: '8px'
                  }}
                >
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 relative z-30 flex-shrink-0">
                    <button
                      onClick={goToPrevious}
                      className="group w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm flex items-center justify-center hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex-shrink-0 active:scale-95"
                      aria-label="Notícia anterior"
                      type="button"
                    >
                      <ICONS.ChevronLeft className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                    
                    <button
                      onClick={goToNext}
                      className="group w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm flex items-center justify-center hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex-shrink-0 active:scale-95"
                      aria-label="Próxima notícia"
                      type="button"
                    >
                      <ICONS.ChevronRight className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] lg:w-[14px] lg:h-[14px] text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 relative z-30 flex-shrink-0">
                    {articles.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative group/dot flex-shrink-0 p-0.5 sm:p-1"
                        aria-label={`Ir para notícia ${index + 1}`}
                        type="button"
                      >
                        <div className={`h-[2px] sm:h-1 md:h-[6px] rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'bg-cyan-950 w-[14px] sm:w-[18px] md:w-[22px] lg:w-[26px] xl:w-[36px]' 
                            : 'bg-slate-300 hover:bg-slate-400 w-[2px] sm:w-1 md:w-[6px]'
                        }`}>
                          {index === currentIndex && (
                            <motion.div
                              className="h-full bg-[#2a9d8f] rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${progress}%` }}
                              transition={TRANSITIONS.progress}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Coluna de imagem: altura reduzida em mobile, estica no desktop para acompanhar o texto */}
          <div 
            className="w-full h-auto min-h-28 md:h-full relative overflow-hidden rounded-t-xl md:rounded-t-none md:rounded-r-xl order-1 md:order-2 md:flex-shrink-0"
            style={IMAGE_WRAPPER_STYLE}
          >
            {/* Degradês de fundo - sempre visíveis */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a9d8f]/12 via-[#2a9d8f]/6 to-transparent pointer-events-none z-10 opacity-65"
              style={IMAGE_GRADIENT_STYLE_1}
            />
            
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2a9d8f]/5 pointer-events-none z-10 opacity-45"
              style={IMAGE_GRADIENT_STYLE_2}
            />
            
            {/* AnimatePresence separado para imagem/vídeo - crossfade simultâneo sem mostrar fundo */}
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={`media-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0.1 } : TRANSITIONS.image}
                className="absolute inset-0 w-full h-full z-0"
                style={IMAGE_MOTION_STYLE}
              >
                {/* Renderiza vídeo se disponível e não houve erro, caso contrário mostra imagem como fallback */}
                {currentArticle.video && !videoError[currentIndex] ? (
                  <video
                    src={currentArticle.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={IMAGE_STYLE}
                    onError={() => {
                      setVideoError((prev) => ({ ...prev, [currentIndex]: true }))
                    }}
                  />
                ) : currentArticle.image ? (
                  <Image
                    src={currentArticle.image}
                    alt={currentArticle.title}
                    fill
                    className="object-cover image-zoom"
                    priority={currentIndex <= 2}
                    loading={currentIndex <= 2 ? 'eager' : 'lazy'}
                    fetchPriority={currentIndex <= 2 ? 'high' : 'auto'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                    quality={90}
                    style={IMAGE_STYLE}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Contador de slides */}
      {showCarousel && (
        <div className="absolute top-4 right-4 bg-[#2a9d8f]/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-montserrat-semibold z-10">
          {currentIndex + 1} / {articles.length}
        </div>
      )}
    </article>
  )
}

export default memo(FeaturedCard)
