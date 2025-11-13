'use client'

import NewsCard from './NewsCard'
import type { NewsArticle } from '../types'

interface NewsGridProps {
  articles: NewsArticle[]
}

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
      {articles.map((article, i) => (
        <NewsCard key={i} article={article} />
      ))}
    </div>
  )
}

