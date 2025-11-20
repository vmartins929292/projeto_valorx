import svgPaths from './components/legacy/svg-9po0gahbk9'
import { ICONS } from './icons'
import { ASSETS } from './assets'
import type { FeaturedArticle, NewsArticle, MenuItem, Stock, LiveFeedEntry, LiveFeedChartData, LiveFeedHeaderData } from './types'

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
  title: 'Safra de soja brasileira bate recorde histórico e deve atingir 165 milhões de toneladas em 2025',
  updateText: 'Última atualização:',
  updateDate: '26 out 2025 • 14:32',
  highlights: [
    'Produção supera expectativas em 8% devido a condições climáticas favoráveis',
    'Exportações para China crescem 12% no terceiro trimestre',
    'Preço da saca atinge R$ 145, maior valor dos últimos 5 anos',
    'Área plantada aumenta 3,2% em relação à safra anterior'
  ],
  image: ASSETS.images.heroField,
  isLive: true,
  liveBadgeText: 'Ao vivo',
  tag: 'Soja',
}

// News articles
export const NEWS_ARTICLES: NewsArticle[] = [
  { 
    title: 'Dólar fecha em queda de 1,8% após decisão do Banco Central de manter taxa Selic', 
    excerpt: 'Moeda americana cotada a R$ 4,87 no fechamento do mercado. Copom mantém Selic em 10,75% ao ano pela terceira reunião consecutiva, conforme esperado pelo mercado financeiro.', 
    tag: 'Dólar', 
    date: '26 out 2025', 
    section: 'Cenários e Tendências' 
  },
  { 
    title: 'Milho brasileiro registra alta de 15% na exportação com embarques recordes para países asiáticos', 
    excerpt: 'Exportações de milho atingem 45 milhões de toneladas no acumulado do ano, com destaque para embarques para Japão e Coreia do Sul. Preço da saca sobe para R$ 78,50.', 
    tag: 'Milho', 
    date: '26 out 2025', 
    section: 'Drivers de Mercado' 
  },
  { 
    title: 'La Niña deve impactar safra de verão com chuvas abaixo da média no Sul do Brasil', 
    excerpt: 'Meteorologistas alertam para possível redução de 8% na produtividade das lavouras de soja e milho na região Sul devido à previsão de estiagem prolongada nos próximos meses.', 
    tag: 'Clima', 
    date: '25 out 2025', 
    section: 'Sazonalidades' 
  },
  { 
    title: 'Petróleo Brent dispara 15% e atinge maior patamar desde 2022 após tensões geopolíticas', 
    excerpt: 'Barril negociado a US$ 94,50 após anúncio da OPEP+ sobre corte adicional de 500 mil barris por dia na produção. Petrobras anuncia reajuste de 8% no preço da gasolina.', 
    tag: 'Commodities', 
    date: '25 out 2025', 
    section: 'Cenários e Tendências' 
  },
  { 
    title: 'Porto de Santos bate recorde de movimentação de grãos com 12,5 milhões de toneladas em outubro', 
    excerpt: 'Infraestrutura portuária registra maior volume mensal da história, impulsionada pelas exportações de soja e milho. Investimentos em ampliação de terminais devem aumentar capacidade em 30%.', 
    tag: 'Logística', 
    date: '24 out 2025', 
    section: 'Drivers de Mercado' 
  },
  { 
    title: 'Boi gordo atinge R$ 345 a arroba com alta demanda interna e externa', 
    excerpt: 'Preço do boi gordo registra valorização de 12% no mês, impulsionado pela forte demanda da indústria frigorífica e aumento nas exportações para mercados asiáticos.', 
    tag: 'Boi Gordo', 
    date: '24 out 2025', 
    section: 'Sazonalidades' 
  },
]

// Live Feed Data
export const LIVE_FEED_HEADER: LiveFeedHeaderData = {
  headline: 'Mercado de Commodities: Soja e Milho em Alta, Dólar Volatil',
  subheadline: 'Bitcoin recupera terreno acima de R$ 95.000 após maior queda semanal em meses',
  lastUpdate: new Date().toISOString(),
}

export const LIVE_FEED_ENTRIES: LiveFeedEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 8 * 60 * 60000).toISOString(), // 8 horas atrás
    title: 'Soja no Mercado Global: Impactos, Tendências e Sustentabilidade',
    excerpt: 'O presidente Trump anunciou que parceiros comerciais menores serão notificados em breve sobre a aplicação de novas tarifas. Ele afirmou que a taxa será um pouco superior a 10% e que será aplicada de forma unificada para todo o grupo.',
    content: [
      'O presidente Trump anunciou que parceiros comerciais menores serão notificados em breve sobre a aplicação de novas tarifas.',
      'Ele afirmou que a taxa será um pouco superior a 10% e que será aplicada de forma unificada para todo o grupo.',
      'A saca de soja negociada em Chicago subiu para US$ 13,45, maior patamar em três semanas.',
    ],
    category: 'Commodities',
    tag: 'Soja',
    author: 'Victor Martins',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    title: 'Milho fecha em alta de 1,8% com demanda aquecida da indústria de etanol',
    excerpt: 'Preço da saca de milho atinge R$ 78,50 no mercado interno. Demanda por etanol de milho cresce 15% no trimestre, segundo dados da Unica.',
    content: [
      'Preço da saca de milho atinge R$ 78,50 no mercado interno.',
      'Demanda por etanol de milho cresce 15% no trimestre, segundo dados da Unica.',
      'Expectativa de safra recorde mantém otimismo no setor.',
    ],
    category: 'Commodities',
    tag: 'Milho',
    author: 'Ana Silva',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    title: 'Dólar opera em queda de 0,8% após decisão do Banco Central',
    excerpt: 'Moeda americana cotada a R$ 4,87 no fechamento do mercado. Copom mantém Selic em 10,75% ao ano pela terceira reunião consecutiva.',
    content: [
      'Moeda americana cotada a R$ 4,87 no fechamento do mercado.',
      'Copom mantém Selic em 10,75% ao ano pela terceira reunião consecutiva.',
      'Mercado financeiro reage positivamente à sinalização de estabilidade monetária.',
    ],
    category: 'Macro',
    tag: 'Dólar',
    author: 'Carlos Mendes',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    title: 'Petróleo Brent dispara 15% e atinge maior patamar desde 2022',
    excerpt: 'Barril negociado a US$ 94,50 após tensões geopolíticas no Oriente Médio. OPEP+ anuncia corte adicional de 500 mil barris por dia na produção.',
    content: [
      'Barril negociado a US$ 94,50 após tensões geopolíticas no Oriente Médio.',
      'OPEP+ anuncia corte adicional de 500 mil barris por dia na produção.',
      'Petrobras anuncia reajuste de 8% no preço da gasolina nas refinarias.',
    ],
    category: 'Commodities',
    tag: 'Petróleo',
    author: 'Maria Santos',
  },
]

// Gera dados de gráfico para os últimos 7 dias
const generateChartData = (): LiveFeedChartData => {
  const now = new Date()
  const series = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    
    series.push({
      date: dateStr,
      soja: 100 + Math.random() * 10 - 5,
      milho: 100 + Math.random() * 8 - 4,
      dolar: 100 + Math.random() * 6 - 3,
      indices: 100 + Math.random() * 12 - 6,
    })
  }
  
  return {
    series,
    lastUpdate: now.toISOString(),
  }
}

export const LIVE_FEED_CHART_DATA: LiveFeedChartData = generateChartData()

