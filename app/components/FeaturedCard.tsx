'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ICONS } from '../icons'
import svgPaths from '../imports/svg-9po0gahbk9'

export interface FeaturedArticle {
  title: string
  updateText: string
  updateDate: string
  highlights: string[]
  image: string
  isLive?: boolean
  liveBadgeText?: string
  tag?: string
}

interface FeaturedCardProps {
  article?: FeaturedArticle
  autoplayInterval?: number
  titleLineHeight?: string | number // Controle do espaçamento entre linhas do título
}

// Componente de item com efeito typewriter
function TypewriterListItem({ 
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
  
  const charSpeed = 20 // ms por caractere
  const fadeInDuration = 200 // ms
  
  // Reset e calcula o delay quando o artigo ou índice muda
  useEffect(() => {
    // Reset imediato quando o artigo muda
    setDisplayedText('')
    setShouldStart(false)
    
    let totalDelay = 500 // Delay inicial
    
    // Garantir que allTexts existe e calcular delay baseado nos itens anteriores
    if (allTexts && allTexts.length > 0) {
      for (let i = 0; i < index; i++) {
        const prevTextLength = allTexts[i] ? `• ${allTexts[i]}`.length : 0
        totalDelay += fadeInDuration + (prevTextLength * charSpeed)
      }
    }
    
    const startTimer = setTimeout(() => {
      setShouldStart(true)
    }, totalDelay)
    
    return () => clearTimeout(startTimer)
  }, [index, articleKey, allTexts])

  useEffect(() => {
    if (!shouldStart) return
    
    let currentIndex = 0
    const fullText = `• ${text}`
    
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, charSpeed)
    
    return () => clearInterval(timer)
  }, [text, shouldStart, articleKey])

  return (
    <motion.li
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldStart ? 1 : 0 }}
      transition={{ duration: fadeInDuration / 1000 }}
    >
      {displayedText}
    </motion.li>
  )
}

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
    title: 'Petróleo Brent dispara 15% e atinge maior patamar desde 2022 no mercado internacional',
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

export default function FeaturedCard({ article, autoplayInterval = 12000, titleLineHeight = 1.2 }: FeaturedCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  // Usar array de artigos se não houver artigo individual
  const articles: FeaturedArticle[] = article ? [article] : carouselArticles
  const showCarousel = articles.length > 1
  const currentArticle = articles[currentIndex]

  // Timer automático com barra de progresso
  useEffect(() => {
    if (!showCarousel || isPaused) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (autoplayInterval / 50))
      })
    }, 50)

    const autoplayTimer = setInterval(() => {
      setProgress(0)
      setCurrentIndex((prev) => (prev + 1) % articles.length)
    }, autoplayInterval)

    return () => {
      clearInterval(progressInterval)
      clearInterval(autoplayTimer)
    }
  }, [currentIndex, isPaused, showCarousel, articles.length, autoplayInterval])

  const goToSlide = (index: number) => {
    setProgress(0)
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setProgress(0)
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const goToNext = () => {
    setProgress(0)
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  return (
    <article 
      className="bg-white rounded-xl card-border shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <div
          key={currentIndex}
          className="grid grid-cols-1 md:grid-cols-[1fr_440px] relative w-full items-stretch"
        >
          {/* Degradê na base de todo o carrossel - animado */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2a9d8f]/10 via-[#2a9d8f]/5 to-transparent pointer-events-none z-20"
            animate={{
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Degradê na parte superior da coluna de texto */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/60 via-white/20 to-transparent pointer-events-none z-10"
            animate={{
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Coluna de texto com controles no final */}
          <motion.div 
            className="p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-white min-h-[288px] md:min-h-0 md:h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ 
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/20 pointer-events-none" />
            
            {/* Content wrapper with relative positioning */}
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                {currentArticle.isLive && (
                  <motion.div 
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.25 }}
                  >
                    <span className="px-2.5 py-0.5 bg-red-600 rounded-full text-white text-xs font-montserrat-semibold flex items-center gap-1 animate-pulse">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d={svgPaths.p13e69200} fill="#F8FAFC" fillRule="evenodd" />
                      </svg>
                      {currentArticle.liveBadgeText || 'Ao vivo'}
                    </span>
                  </motion.div>
                )}
                <motion.h2 
                  className="font-montserrat-semibold text-[20px] lg:text-[22px] text-cyan-950 mb-3 line-clamp-3"
                  style={{ lineHeight: typeof titleLineHeight === 'number' ? titleLineHeight : titleLineHeight }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {currentArticle.title}
                </motion.h2>
                <motion.p 
                  className="featured-update font-montserrat-medium mb-4 text-xs"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <span className="text-red-600">{currentArticle.updateText} </span>
                  <span className="text-cyan-950">{currentArticle.updateDate}</span>
                </motion.p>
                {currentArticle.highlights && currentArticle.highlights.length > 0 && (
                  <motion.div 
                    className="border-t border-slate-200 pt-3 min-h-[6rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.25 }}
                  >
                    <ul className="space-y-2 font-montserrat text-[11px] text-cyan-950">
                      {currentArticle.highlights.map((highlight, index) => (
                        <TypewriterListItem
                          key={`${currentIndex}-${index}`}
                          text={highlight}
                          index={index}
                          allTexts={currentArticle.highlights}
                          articleKey={currentIndex}
                          className={index > 1 ? 'line-clamp-1' : ''}
                        />
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
              {/* Controles na parte inferior da coluna de texto */}
              {showCarousel && (
                <motion.div 
                  className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200 relative z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Setas de navegação */}
                  <div className="flex items-center gap-2 relative z-30">
                    <button
                      onClick={goToPrevious}
                      className="group w-9 h-9 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center hover:bg-white/80 hover:border-slate-200/60 hover:shadow-md transition-all duration-200"
                      aria-label="Notícia anterior"
                    >
                      <ICONS.ChevronLeft className="w-4 h-4 text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                    
                    <button
                      onClick={goToNext}
                      className="group w-9 h-9 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center hover:bg-white/80 hover:border-slate-200/60 hover:shadow-md transition-all duration-200"
                      aria-label="Próxima notícia"
                    >
                      <ICONS.ChevronRight className="w-4 h-4 text-cyan-950 group-hover:text-emerald-600 transition-colors duration-200" />
                    </button>
                  </div>
                  {/* Progress dots */}
                  <div className="flex items-center gap-2 relative z-30">
                    {articles.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative group/dot"
                        aria-label={`Ir para notícia ${index + 1}`}
                      >
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'bg-cyan-950 w-8' 
                            : 'bg-slate-300 hover:bg-slate-400 w-1.5'
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
          <div className="w-full h-72 md:h-full relative overflow-hidden transition-shadow hover:shadow-lg md:rounded-r-xl">
            {/* Degradê na parte inferior da imagem */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a9d8f]/12 via-[#2a9d8f]/6 to-transparent pointer-events-none z-10"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Degradê nas laterais da imagem */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2a9d8f]/5 pointer-events-none z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 1 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1.08
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                scale: { duration: 12, ease: 'linear' }
              }}
              className="absolute inset-0"
            >
              <Image
                src={currentArticle.image}
                alt={currentArticle.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
      
      {/* Contador de slides - Top Right */}
      {showCarousel && (
        <div className="absolute top-4 right-4 bg-[#2a9d8f]/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-montserrat-semibold z-10">
          {currentIndex + 1} / {articles.length}
        </div>
      )}
    </article>
  )
}

