// Tipos compartilhados do projeto

import type { LucideIcon } from 'lucide-react'

export type NewsArticle = {
  title: string
  excerpt: string
  tag: string
  date: string
  section?: string
}

export interface FeaturedArticle {
  title: string
  updateText: string
  updateDate: string
  highlights: string[]
  image?: string
  video?: string
  videoPoster?: string
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

export interface LiveFeedEntry {
  id: string
  timestamp: string
  title: string
  excerpt: string
  content: string[]
  category: string
  tag: string
  author: string
}

export interface LiveFeedChartData {
  series: Array<{
    date: string
    soja: number
    milho: number
    dolar: number
    indices: number
  }>
  lastUpdate: string
}

export interface LiveFeedHeaderData {
  headline: string
  subheadline: string
  lastUpdate: string
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error'

export type WebSocketEventType = 'feed_update' | 'chart_update' | 'header_update' | 'connection_status'

export interface WebSocketMessage {
  type: WebSocketEventType
  payload: LiveFeedEntry | LiveFeedChartData | LiveFeedHeaderData | ConnectionStatus
  timestamp: string
}

