// Tipos compartilhados do projeto

import type { LucideIcon } from 'lucide-react'

export type NewsArticle = {
  title: string
  excerpt: string
  tag: string
  date: string
}

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

export type MenuItem = {
  id: string
  label: string
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string }>
  iconPath?: string
}

export type Stock = {
  name: string
  value: string
  change: number
  direction: 'up' | 'down'
}

export type MarketCategory = 'agricolas' | 'metalicas' | 'indices' | 'fx'

export interface MarketData {
  name: string
  symbol: string
  price: string
  change: number
  changePercent: string
  unit: string
  data: { value: number }[]
  chartData: { value: number; month: string }[]
  icon: string
  category: MarketCategory
}

