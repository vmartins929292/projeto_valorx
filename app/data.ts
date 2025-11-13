import svgPaths from './components/legacy/svg-9po0gahbk9'
import { ICONS } from './icons'
import { ASSETS } from './assets'
import type { FeaturedArticle, NewsArticle, MenuItem, Stock } from './types'

// Menu items
export const MENU_ITEMS: readonly MenuItem[] = Object.freeze([
  { id: 'all', label: 'Tudo' },
  { id: 'soja', label: 'Soja', icon: ICONS.Wheat },
  { id: 'milho', label: 'Milho', icon: ICONS.Sprout },
  { id: 'algodao', label: 'Algodão', icon: ICONS.Flower },
  { id: 'oleos', label: 'Óleos Vegetais', icon: ICONS.Droplet },
  { id: 'macro', label: 'Macro', icon: ICONS.Macro },
  { id: 'dolar', label: 'Dólar', icon: ICONS.DollarSign },
  { id: 'clima', label: 'Clima', icon: ICONS.Cloud },
  { id: 'logistica', label: 'Logística', icon: ICONS.Truck },
  { id: 'boi-gordo', label: 'Boi Gordo', icon: ICONS.Beef },
] as const)

// Stocks data
export const STOCKS: readonly Stock[] = Object.freeze([
  { name: 'S&P 500', value: '5.973,77', change: -0.53, direction: 'down' },
  { name: 'Nasdaq', value: '13.423,18', change: 0.53, direction: 'up' },
  { name: 'Shanghai', value: '13.423,18', change: 0.53, direction: 'up' },
  { name: 'FTSE 100', value: '13.423,18', change: 0.53, direction: 'up' },
  { name: 'Brent Oil', value: '13.423,18', change: 0.53, direction: 'up' },
  { name: '10 Year US Gov', value: '5.973,77', change: -0.53, direction: 'down' },
] as const)

// Featured article
export const FEATURED_ARTICLE: FeaturedArticle = {
  title: 'The title of the news can support to 3 lines at least. So i wrote this much to show in practice',
  updateText: 'Atualizado em',
  updateDate: '09 jan 2025 - 12h21',
  highlights: [
    'Microsoft open sources its in-memory GraphEngine system',
    'Health-Centered Design Talk at HXD Conference',
    'Headspace\'s 6 Mindful Technology Design Principles',
    'Designing for Mindfulness with Wearable Technology',
  ],
  image: ASSETS.images.heroField,
  isLive: true,
  liveBadgeText: 'Ao vivo',
  tag: 'Soja',
}

// News articles
export const NEWS_ARTICLES: NewsArticle[] = [
  { title: 'Global Climate Change Reaches Record Highs', excerpt: 'International educational initiatives gain momentum, aiming to bridge learning gaps and provide quality education opportunities for students around the world.', tag: 'Dólar', date: '09 jan 2025' },
  { title: "China Plans to Build World's Largest Telescope and find if theres an astronaut floating in a tin can right above the world", excerpt: 'Cross-border infrastructure projects take center stage, enhancing regional connectivity and promoting economic development through strategic investments.', tag: 'Dólar', date: '09 jan 2025' },
  { title: 'Refugee Crisis Worsens in Europe', excerpt: 'International educational initiatives gain momentum, aiming to bridge learning gaps and provide quality education opportunities for students around the world.', tag: 'Dólar', date: '09 jan 2025' },
]

