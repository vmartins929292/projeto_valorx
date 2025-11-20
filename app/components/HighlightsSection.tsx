'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ICONS } from '../icons'

interface HighlightArticle {
  id: string
  title: string
  subtitle?: string
  category: string
  date?: string
  section?: string
  image?: string
  video?: string
  videoPoster?: string // Imagem de preview para o vídeo
}

const defaultHighlights: HighlightArticle[] = [
  {
    id: '1',
    title: 'Soja brasileira atinge recorde de exportação com embarques de 98 milhões de toneladas',
    subtitle: 'Brasil consolida posição como maior exportador mundial após superar expectativas do mercado',
    category: 'Soja',
    date: '26 out 2025',
    section: 'Cenários e Tendências',
    image: '/images/soy_crop.jpeg'
  },
  {
    id: '2',
    title: 'Dólar fecha em queda de 1,8% após decisão do Banco Central de manter taxa Selic',
    subtitle: 'Moeda americana cotada a R$ 4,87 no fechamento do mercado',
    category: 'Dólar',
    date: '26 out 2025',
    section: 'Drivers de Mercado',
    image: '/images/dólar.jpeg'
  },
  {
    id: '3',
    title: 'Petróleo Brent dispara 15% e atinge maior patamar desde 2022',
    subtitle: 'Barril negociado a US$ 94,50 após tensões geopolíticas no Oriente Médio',
    category: 'Commodities',
    date: '25 out 2025',
    section: 'Análise Estratégica',
    image: '/images/macro.jpeg'
  },
  {
    id: '4',
    title: 'China aumenta em 28% importação de carne bovina brasileira',
    subtitle: 'Exportações atingem 1,2 milhão de toneladas no último trimestre',
    category: 'Exportação',
    date: '24 out 2025',
    section: 'Sazonalidades',
    image: '/images/hero-field.jpg'
  }
]


export default function HighlightsSection({ highlights = defaultHighlights }: { highlights?: HighlightArticle[] }) {
  const displayHighlights = highlights.slice(0, 4)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(videoId)
  }

  const handleVideoPause = () => {
    setPlayingVideo(null)
  }

  return (
    <>
      {/* Banner Minimalista */}
      <div className="mb-4 sm:mb-5 md:mb-6 mt-2 sm:mt-3">
        {/* Título alinhado à esquerda igual ao RadarMercadoCard */}
        <div className="mb-2 sm:mb-3 relative pl-3.5 sm:pl-4">
          {/* Linha vertical contínua */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full"></div>
          
          {/* Conteúdo */}
          <div>
            <h2 className="font-montserrat-semibold text-base sm:text-lg md:text-xl text-cyan-950 mb-0">
              Fundamentos Estratégicos
            </h2>
            <p className="font-montserrat text-[9px] sm:text-[10px] text-slate-600 italic">
              Análises estruturais do mercado
            </p>
          </div>
        </div>
      </div>

      {/* Grid de 4 cards horizontais estilo TOP STORIES com divisores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-200/60 rounded-lg border border-slate-200/60 overflow-hidden bg-white mb-8 sm:mb-10 md:mb-12">
        {displayHighlights.map((article, index) => (
          <div key={article.id} className="relative bg-white">
            <motion.article
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: "-8px 0 24px -8px rgba(0, 0, 0, 0.08), 8px 0 24px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.06)",
                zIndex: 30,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="group relative flex flex-col cursor-pointer bg-white h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] transition-colors duration-300 overflow-hidden"
            >
              {/* Imagem ou Vídeo ocupando toda a largura e topo */}
              <div className="relative w-full h-16 sm:h-16 md:h-20 lg:h-24 overflow-hidden">
                {article.video ? (
                  <video
                    src={article.video}
                    poster={article.videoPoster || article.image}
                    className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-700 ease-out"
                    controls={playingVideo === article.id}
                    autoPlay={playingVideo === article.id}
                    loop
                    muted
                    playsInline
                    onPlay={() => handleVideoPlay(article.id)}
                    onPause={handleVideoPause}
                    onMouseEnter={(e) => {
                      if (playingVideo !== article.id) {
                        e.currentTarget.play()
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (playingVideo !== article.id) {
                        e.currentTarget.pause()
                      }
                    }}
                  />
                ) : article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover image-zoom group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : null}
              </div>

              {/* Conteúdo do Card */}
              <div className="flex flex-col flex-1 pt-3.5 pb-4 px-4 sm:pt-3.5 sm:pb-5 sm:px-5 min-h-0 relative transition-all duration-300">
                {/* Badge de categoria - apenas texto vermelho escuro */}
                <div className="mb-1.5">
                  <span className="font-montserrat-semibold text-[9px] sm:text-[10px] text-red-800 uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Título */}
                <h3 
                  className="font-montserrat-semibold text-xs sm:text-sm md:text-base text-cyan-950 mb-1.5 group-hover:text-emerald-800 transition-colors duration-300 line-clamp-2 leading-[1.15] sm:leading-[1.2] md:leading-[1.25]"
                  style={{ WebkitLineClamp: 2 }}
                >
                  {article.title}
                </h3>

                {/* Subtítulo */}
                {article.subtitle && (
                  <p className="font-montserrat text-[11px] sm:text-xs text-slate-600 mb-2 line-clamp-2 leading-snug group-hover:text-slate-700 transition-colors duration-300">
                    {article.subtitle}
                  </p>
                )}

                {/* Footer com data e seção - separados por divisão vertical */}
                <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-slate-200/60 group-hover:border-emerald-800/30 transition-colors duration-300">
                  <div className="flex items-center gap-0.5 sm:gap-1 min-w-0 flex-1 overflow-hidden">
                    {article.date && (
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <ICONS.Calendar size={9} className="text-slate-400 group-hover:text-emerald-800 transition-colors duration-300 flex-shrink-0" />
                        <span className="font-montserrat text-[8px] sm:text-[9px] text-slate-500 group-hover:text-slate-600 transition-colors duration-300 leading-none whitespace-nowrap">
                          {article.date}
                        </span>
                      </div>
                    )}
                    {article.section && (
                      <>
                        <div className="h-3 w-px bg-slate-300 self-center flex-shrink-0 mx-0.5"></div>
                        <span className="font-montserrat-semibold text-[8px] sm:text-[9px] text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-none truncate">
                          {article.section}
                        </span>
                      </>
                    )}
                  </div>
                  {/* Ícone de seta no hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex items-center flex-shrink-0 ml-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </>
  )
}

