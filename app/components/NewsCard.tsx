'use client'

import type { NewsArticle } from '../types'

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-xl card-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <h3 className="font-montserrat-semibold text-sm md:text-base text-cyan-950 mb-2 line-clamp-2" style={{ lineHeight: '1.2' }}>
          {article.title}
        </h3>

        <p className="font-montserrat text-xs text-slate-600 mb-4 line-clamp-3" style={{ lineHeight: '1.4' }}>
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="font-montserrat text-xs text-slate-500">
            {article.date}
          </span>
          <span className="px-2.5 py-0.5 border border-slate-200 rounded-full text-cyan-950 text-xs font-montserrat-semibold inline-block">
            {article.tag}
          </span>
        </div>
      </div>
    </article>
  )
}

