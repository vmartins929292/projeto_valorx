'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ICONS } from '../icons'
import svgPaths from './legacy/svg-9po0gahbk9'
import type { FeaturedArticle } from '../types'

interface FeaturedCardProps {
  article?: FeaturedArticle
  autoplayInterval?: number
  titleLineHeight?: string | number // Controle do espaçamento entre linhas do título
}

// Componente de item com efeito typewriter - memoizado para performance
const TypewriterListItem = memo(function TypewriterListItem({ 
  text, 
  index, 
  className, 
  allTexts,
  articleKey // Chave única do artigo para resetar quando muda
}: { 
  text: string
  index: number
  className?: string
  allTexts: string[]
  articleKey: string | number
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [shouldStart, setShouldStart] = useState(false)
  
  const charSpeed = 12 // ms por caractere (mais rápido)
  const fadeInDuration = 100 // ms (mais rápido)
  
  // Reset e calcula o delay quando o artigo ou índice muda - otimizado
  useEffect(() => {
    // Reset imediato quando o artigo muda
    setDisplayedText('')
    setShouldStart(false)
    
    // Cálculo otimizado de delay
    const baseDelay = 200
    let totalDelay = baseDelay
    
    // Calcular delay apenas se necessário
    if (index > 0 && allTexts && allTexts.length > 0) {
      // Aproximação mais rápida: média de caracteres ao invés de calcular cada um
      const avgCharCount = allTexts.reduce((sum, txt) => sum + (txt?.length || 0), 0) / allTexts.length
      const avgDelayPerItem = fadeInDuration + (avgCharCount * charSpeed)
      totalDelay += avgDelayPerItem * index
    }
    
    const startTimer = setTimeout(() => {
      setShouldStart(true)
    }, totalDelay)
    
    return () => clearTimeout(startTimer)
  }, [index, articleKey, allTexts, charSpeed, fadeInDuration])

  useEffect(() => {
    if (!shouldStart) return
    
    let currentIndex = 0
    const fullText = `• ${text}`
    let cancelled = false
    let rafId: number | null = null
    
    const animate = () => {
      if (cancelled) return
      
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
        rafId = requestAnimationFrame(() => {
          setTimeout(() => {
            if (!cancelled) animate()
          }, charSpeed)
        })
      }
    }
    
    animate()
    
    return () => {
      cancelled = true
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [text, shouldStart, articleKey, charSpeed])

  const fullText = `• ${text}`
  
  return (
    <motion.li
      key={`${articleKey}-${index}`}
      className={className}
      style={{ 
        position: 'relative',
        minHeight: '1.5em' // Garante espaço mínimo desde o início
      }}
    >
      {/* Texto completo invisível para reservar o espaço exato */}
      <span 
        style={{ 
          visibility: 'hidden',
          display: 'block',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }} 
        aria-hidden="true"
      >
        {fullText}
      </span>
      {/* Texto visível com typewriter effect - sobreposto */}
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
const carouselArticles: FeaturedArticle[] = [
  {
    title: 'Safra de soja brasileira bate recorde histórico e deve atingir 165 milhões de toneladas',
    updateText: 'Última atualização:',
    updateDate: '26 out 2025 • 14:32',
    tag: 'Soja',
    isLive: true,
    liveBadgeText: 'Ao vivo',
    image: '/images/hero-field.jpg',
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
    image: '/images/dólar1.jpeg',
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
    image: '/images/hero-field.jpg',
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

export default function FeaturedCard({ article, autoplayInterval = 12000, titleLineHeight = 1.15 }: FeaturedCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  // Usar array de artigos se não houver artigo individual - memoizado
  const articles: FeaturedArticle[] = useMemo(() => 
    article ? [article] : carouselArticles, 
    [article]
  )
  
  const showCarousel = useMemo(() => articles.length > 1, [articles.length])
  const currentArticle = useMemo(() => articles[currentIndex], [articles, currentIndex])

  // Reset progress quando muda o slide
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  // Pré-carregar próximas imagens para melhor performance - otimizado
  useEffect(() => {
    // Pré-carregar próxima e anterior para transição mais suave
    const nextIndex = (currentIndex + 1) % articles.length
    const prevIndex = (currentIndex - 1 + articles.length) % articles.length
    
    const imagesToPreload = [
      articles[nextIndex]?.image,
      articles[prevIndex]?.image
    ].filter(Boolean)
    
    imagesToPreload.forEach((imageSrc) => {
      if (!imageSrc) return
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageSrc
      link.fetchPriority = 'high'
      document.head.appendChild(link)
    })
    
    return () => {
      // Cleanup será feito pelo browser automaticamente
    }
  }, [currentIndex, articles])

  // Timer automático com barra de progresso - otimizado com requestAnimationFrame
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
  }, [isPaused, showCarousel, articles.length, autoplayInterval])

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return // Evita re-render desnecessário
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
      className="bg-white rounded-xl card-border shadow-sm overflow-hidden mb-6 hover:shadow-md transition-all duration-300 ease-in-out relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full min-h-[450px] sm:min-h-[420px] md:min-h-[280px] transition-all duration-300 ease-in-out">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-col md:grid md:grid-cols-[1fr_minmax(0,360px)] lg:grid-cols-[1fr_minmax(0,400px)] xl:grid-cols-[1fr_minmax(0,420px)] relative w-full h-full min-h-[450px] sm:min-h-[420px] md:min-h-[280px] items-stretch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ 
              willChange: 'opacity',
              position: 'absolute',
              inset: 0
            }}
          >
          {/* Degradê na base de todo o carrossel - animado com CSS */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2a9d8f]/10 via-[#2a9d8f]/5 to-transparent pointer-events-none z-20 opacity-70"
            style={{
              animation: 'pulse-gradient 12s ease-in-out infinite'
            }}
          />
          
          {/* Degradê na parte superior da coluna de texto */}
          <div 
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/60 via-white/20 to-transparent pointer-events-none z-10 opacity-75"
            style={{
              animation: 'pulse-gradient 8s ease-in-out infinite'
            }}
          />
          
          {/* Coluna de texto com controles no final */}
          <motion.div 
            className="p-3 sm:p-3.5 md:p-5 lg:p-6 flex flex-col relative bg-gradient-to-br from-white via-slate-50/30 to-white min-w-0 order-2 md:order-1 overflow-visible transition-all duration-300 ease-in-out flex-shrink-0 min-h-[350px] sm:min-h-[320px] md:min-h-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.08,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ willChange: 'opacity', minWidth: 0, flex: '0 0 auto' }}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/20 pointer-events-none" />
            
            {/* Content wrapper with relative positioning */}
            <div className="relative z-10 flex-1 flex flex-col justify-between min-h-0 overflow-visible w-full">
              {/* Seção superior - Título com Badge inline e Data */}
              <div className="flex-shrink-0 -mt-2">
                <motion.div 
                  key={`title-container-${currentIndex}`}
                  className="flex items-start gap-2 mb-1.5 sm:mb-2 md:mb-2.5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <h2 
                    className="font-montserrat-semibold text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] xl:text-[22px] text-cyan-950 pr-1 flex-1 min-w-0"
                    style={{ lineHeight: '1.25', willChange: 'opacity, transform', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    {currentArticle.title}
                  </h2>
                  {currentArticle.isLive && (
                    <motion.div 
                      key={`badge-${currentIndex}`}
                      className="flex items-center gap-2 flex-shrink-0 mt-0.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <span className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] font-montserrat-semibold uppercase tracking-wider rounded-md whitespace-nowrap">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        {currentArticle.liveBadgeText || 'Ao vivo'}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
                {/* Container para update - responsivo */}
                <motion.div 
                  key={`update-container-${currentIndex}`}
                  className="mb-1.5 sm:mb-2 md:mb-3 flex items-center flex-wrap gap-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <span className="font-montserrat-medium text-[8px] sm:text-[8px] md:text-[9px] lg:text-[9px] xl:text-xs text-red-600 whitespace-nowrap">
                    {currentArticle.updateText}
                  </span>
                  <span className="font-montserrat-medium text-[8px] sm:text-[8px] md:text-[9px] lg:text-[9px] xl:text-xs text-cyan-950 whitespace-nowrap">
                    {currentArticle.updateDate}
                  </span>
                </motion.div>
              </div>
              
              {/* Área central para highlights - centralizada verticalmente */}
              {currentArticle.highlights && currentArticle.highlights.length > 0 ? (
                <motion.div 
                  className="border-t border-slate-200 flex-1 md:flex items-start md:items-center min-h-[60px] sm:min-h-[70px] md:min-h-[80px] py-2 sm:py-2.5 md:py-3 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{ flexShrink: 1, minWidth: 0 }}
                >
                  <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 font-montserrat text-[9px] sm:text-[10px] md:text-[10px] lg:text-[11px] text-cyan-950 w-full min-w-0">
                    {currentArticle.highlights.map((highlight, index) => (
                      <TypewriterListItem
                        key={`${currentIndex}-${index}`}
                        text={highlight}
                        index={index}
                        allTexts={currentArticle.highlights}
                        articleKey={currentIndex}
                        className="break-words"
                      />
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div className="border-t border-slate-200 flex-1 flex items-center min-h-[60px] sm:min-h-[70px] md:min-h-[80px]"></div>
              )}
              
              {/* Controles na parte inferior da coluna de texto */}
              {showCarousel && (
                <motion.div 
                  className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-2.5 md:pt-3 pb-0 border-t border-slate-200 relative z-30 flex-shrink-0 min-h-[44px] sm:min-h-[48px] md:min-h-[52px] w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{ flexShrink: 0, marginTop: 'auto' }}
                >
                  {/* Setas de navegação */}
                  <div className="flex items-center gap-1.5 sm:gap-2 relative z-30 flex-shrink-0">
                    <button
                      onClick={goToPrevious}
                      className="group w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm flex items-center justify-center hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex-shrink-0 active:scale-95"
                      aria-label="Notícia anterior"
                      type="button"
                    >
                      <ICONS.ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                    
                    <button
                      onClick={goToNext}
                      className="group w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm flex items-center justify-center hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 flex-shrink-0 active:scale-95"
                      aria-label="Próxima notícia"
                      type="button"
                    >
                      <ICONS.ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                  </div>
                  {/* Progress dots */}
                  <div className="flex items-center gap-1.5 sm:gap-2 relative z-30 flex-shrink-0">
                    {articles.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative group/dot flex-shrink-0 p-1"
                        aria-label={`Ir para notícia ${index + 1}`}
                        type="button"
                      >
                        <div className={`h-1.5 sm:h-2 md:h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'bg-cyan-950 w-6 sm:w-7 md:w-8 lg:w-10' 
                            : 'bg-slate-300 hover:bg-slate-400 w-1.5 sm:w-2'
                        }`}>
                          {/* Barra de progresso verde escuro */}
                          {index === currentIndex && (
                            <motion.div
                              className="h-full bg-[#2a9d8f] rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.05, ease: 'linear' }}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Coluna de imagem - Direita */}
          <div className="w-full aspect-video md:aspect-auto md:h-full max-h-[300px] sm:max-h-[350px] md:max-h-none md:min-h-[240px] relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg rounded-t-xl md:rounded-t-none md:rounded-r-xl order-1 md:order-2 flex-shrink" style={{ flexShrink: 1 }}>
            {/* Degradê na parte inferior da imagem */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a9d8f]/12 via-[#2a9d8f]/6 to-transparent pointer-events-none z-10 opacity-65"
              style={{
                animation: 'pulse-gradient 10s ease-in-out infinite'
              }}
            />
            
            {/* Degradê nas laterais da imagem */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2a9d8f]/5 pointer-events-none z-10 opacity-45"
              style={{
                animation: 'pulse-gradient 14s ease-in-out infinite'
              }}
            />
            
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0 w-full h-full"
              style={{ 
                willChange: 'opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <Image
                key={`img-${currentIndex}`}
                src={currentArticle.image}
                alt={currentArticle.title}
                fill
                className="object-cover image-zoom"
                priority={currentIndex <= 2}
                loading={currentIndex <= 2 ? 'eager' : 'lazy'}
                fetchPriority={currentIndex <= 2 ? 'high' : 'auto'}
                sizes="(max-width: 768px) 100vw, clamp(300px, 30vw, 420px)"
                quality={90}
                unoptimized={false}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  objectFit: 'cover',
                  maxWidth: '100%',
                  width: '100%',
                  height: '100%'
                }}
              />
            </motion.div>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Contador de slides - Top Right */}
      {showCarousel && (
        <div className="absolute top-4 right-4 bg-[#2a9d8f]/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-montserrat-semibold z-10">
          {currentIndex + 1} / {articles.length}
        </div>
      )}
    </article>
  )
}

