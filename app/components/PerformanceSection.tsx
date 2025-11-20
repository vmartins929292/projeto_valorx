'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ASSETS } from '../assets'

interface SpotlightArticle {
  title: string
  category: string
  excerpt?: string
  image: string
  date?: string
  thumbnails?: string[]
}

const spotlightArticles: SpotlightArticle[] = [
  {
    title: 'Soja brasileira atinge recorde de exportação com embarques de 98 milhões de toneladas',
    category: 'Commodities',
    excerpt: 'Brasil consolida posição como maior exportador mundial após superar expectativas do mercado com forte demanda chinesa e condições climáticas favoráveis na safra 2024/25.',
    image: ASSETS.images.heroField,
    date: '10 jan 2025'
  },
  {
    title: 'Escassez de mão de obra deixa cidade ucraniana à beira do colapso',
    category: 'Guerra na Ucrânia',
    excerpt: 'Pokrovsk em risco enquanto Kiev não consegue poupar tropas para defesa, dizem combatentes e especialistas.',
    image: ASSETS.images.heroField,
    date: '10 jan 2025'
  },
  {
    title: 'Como o maior projeto de mineração do mundo é uma vitória para a China',
    category: 'Mineração',
    excerpt: 'O projeto de mina de US$ 23 bilhões em Simandou, na Guiné, levou quase três décadas para começar a operar, mas pode inclinar a balança de poder no mercado global de minério de ferro.',
    image: ASSETS.images.heroField,
    thumbnails: [
      ASSETS.images.heroField,
      ASSETS.images.heroField,
      ASSETS.images.heroField
    ],
    date: '09 jan 2025'
  }
]

export default function PerformanceSection() {
  const [mainArticle, leftArticle, rightArticle] = spotlightArticles

  return (
    <section className="mb-8">
      {/* Header com estilo consistente */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="font-montserrat-semibold text-2xl text-cyan-950 flex items-center gap-2">
          <span className="inline-block w-1 h-8 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full" />
          Destaques
        </h2>
      </motion.div>

      {/* Spotlight Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Artigo Esquerda */}
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1 cursor-pointer group pb-6 lg:pb-0 lg:pr-6 lg:border-r lg:border-slate-200/60"
        >
          <div className="h-full flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-montserrat-semibold text-slate-500 uppercase tracking-wider">
                {leftArticle.category}
              </span>
            </div>
            <h3 className="font-montserrat-semibold text-lg md:text-xl text-cyan-950 mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
              {leftArticle.title}
            </h3>
            {leftArticle.excerpt && (
              <p className="font-montserrat text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">
                {leftArticle.excerpt}
              </p>
            )}
            {leftArticle.date && (
              <div className="mt-auto pt-2">
                <span className="font-montserrat text-xs text-slate-500">
                  {leftArticle.date}
                </span>
              </div>
            )}
          </div>
        </motion.article>

        {/* Artigo Principal Central */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 cursor-pointer group pb-6 lg:pb-0 lg:px-6 lg:border-x lg:border-slate-200/60"
        >
          <div className="relative h-full flex flex-col">
            {/* Imagem Principal */}
            <div className="relative w-full aspect-[3/2] mb-5 overflow-hidden rounded-xl shadow-lg">
              <Image
                src={mainArticle.image}
                alt={mainArticle.title}
                fill
                className="object-cover image-zoom group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="mb-3">
              <span className="text-xs font-montserrat-semibold text-slate-500 uppercase tracking-wider">
                {mainArticle.category}
              </span>
            </div>
            <h3 className="font-montserrat-semibold text-xl md:text-2xl text-cyan-950 mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
              {mainArticle.title}
            </h3>
            {mainArticle.excerpt && (
              <p className="font-montserrat text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">
                {mainArticle.excerpt}
              </p>
            )}
            {mainArticle.date && (
              <div className="mt-auto pt-2">
                <span className="font-montserrat text-xs text-slate-500">
                  {mainArticle.date}
                </span>
              </div>
            )}
          </div>
        </motion.article>

        {/* Artigo Direita com Thumbnails */}
        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-1 cursor-pointer group pb-6 lg:pb-0 lg:pl-6"
        >
          <div className="h-full flex flex-col">
            {/* Thumbnails */}
            {rightArticle.thumbnails && rightArticle.thumbnails.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-5">
                {rightArticle.thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
                  >
                    <Image
                      src={thumb}
                      alt={`${rightArticle.title} - imagem ${index + 1}`}
                      fill
                      className="object-cover image-zoom group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 33vw, 11vw"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="mb-3">
              <span className="text-xs font-montserrat-semibold text-slate-500 uppercase tracking-wider">
                {rightArticle.category}
              </span>
            </div>
            <h3 className="font-montserrat-semibold text-lg md:text-xl text-cyan-950 mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
              {rightArticle.title}
            </h3>
            {rightArticle.excerpt && (
              <p className="font-montserrat text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">
                {rightArticle.excerpt}
              </p>
            )}
            {rightArticle.date && (
              <div className="mt-auto pt-2">
                <span className="font-montserrat text-xs text-slate-500">
                  {rightArticle.date}
                </span>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </section>
  )
}
