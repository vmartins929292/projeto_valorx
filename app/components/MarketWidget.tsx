'use client'

import { useState, useEffect, memo, useMemo } from 'react'
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts'
import { ICONS } from '../icons'
import type { MarketData, MarketCategory } from '../types'


// Dados de mercado
const allMarkets: readonly MarketData[] = [
  // AGRÍCOLAS
  {
    name: 'Soja',
    symbol: 'SOYBEAN',
    price: '1,425',
    change: -8.50,
    changePercent: '-0.59%',
    unit: 'USD/bu',
    icon: 'Soja',
    category: 'agricolas',
    data: [
      { value: 1438 },
      { value: 1432 },
      { value: 1430 },
      { value: 1428 },
      { value: 1426 },
      { value: 1425 },
    ],
    chartData: [
      { value: 1460, month: 'Jan' },
      { value: 1455, month: 'Fev' },
      { value: 1450, month: 'Mar' },
      { value: 1445, month: 'Abr' },
      { value: 1440, month: 'Mai' },
      { value: 1438, month: 'Jun' },
      { value: 1432, month: 'Jul' },
      { value: 1430, month: 'Ago' },
      { value: 1428, month: 'Set' },
      { value: 1426, month: 'Out' },
      { value: 1425, month: 'Nov' },
      { value: 1425, month: 'Dez' },
    ],
  },
  {
    name: 'Milho',
    symbol: 'CORN',
    price: '482.75',
    change: -2.25,
    changePercent: '-0.46%',
    unit: 'USD/bu',
    icon: 'Milho',
    category: 'agricolas',
    data: [
      { value: 488 },
      { value: 486 },
      { value: 485 },
      { value: 484 },
      { value: 483 },
      { value: 482.75 },
    ],
    chartData: [
      { value: 495, month: 'Jan' },
      { value: 492, month: 'Fev' },
      { value: 490, month: 'Mar' },
      { value: 488, month: 'Abr' },
      { value: 486, month: 'Mai' },
      { value: 485, month: 'Jun' },
      { value: 484, month: 'Jul' },
      { value: 483, month: 'Ago' },
      { value: 482.75, month: 'Set' },
      { value: 483, month: 'Out' },
      { value: 482.5, month: 'Nov' },
      { value: 482.75, month: 'Dez' },
    ],
  },
  {
    name: 'Trigo',
    symbol: 'WHEAT',
    price: '625.50',
    change: 12.80,
    changePercent: '+2.09%',
    unit: 'USD/bu',
    icon: 'Trigo',
    category: 'agricolas',
    data: [
      { value: 610 },
      { value: 615 },
      { value: 618 },
      { value: 620 },
      { value: 623 },
      { value: 625.5 },
    ],
    chartData: [
      { value: 580, month: 'Jan' },
      { value: 590, month: 'Fev' },
      { value: 595, month: 'Mar' },
      { value: 600, month: 'Abr' },
      { value: 605, month: 'Mai' },
      { value: 610, month: 'Jun' },
      { value: 615, month: 'Jul' },
      { value: 618, month: 'Ago' },
      { value: 620, month: 'Set' },
      { value: 623, month: 'Out' },
      { value: 624, month: 'Nov' },
      { value: 625.5, month: 'Dez' },
    ],
  },
  {
    name: 'Café Arábica',
    symbol: 'COFFEE',
    price: '178.50',
    change: 5.60,
    changePercent: '+3.24%',
    unit: 'USD/lb',
    icon: 'Café Arábica',
    category: 'agricolas',
    data: [
      { value: 173 },
      { value: 174 },
      { value: 175 },
      { value: 176 },
      { value: 177 },
      { value: 178.5 },
    ],
    chartData: [
      { value: 168, month: 'Jan' },
      { value: 170, month: 'Fev' },
      { value: 171, month: 'Mar' },
      { value: 173, month: 'Abr' },
      { value: 174, month: 'Mai' },
      { value: 172, month: 'Jun' },
      { value: 175, month: 'Jul' },
      { value: 176, month: 'Ago' },
      { value: 177, month: 'Set' },
      { value: 178.5, month: 'Out' },
      { value: 177, month: 'Nov' },
      { value: 178.5, month: 'Dez' },
    ],
  },
  {
    name: 'Açúcar',
    symbol: 'SUGAR',
    price: '24.85',
    change: 0.95,
    changePercent: '+3.98%',
    unit: 'USD/lb',
    icon: 'Açúcar',
    category: 'agricolas',
    data: [
      { value: 23.5 },
      { value: 23.8 },
      { value: 24.0 },
      { value: 24.3 },
      { value: 24.6 },
      { value: 24.85 },
    ],
    chartData: [
      { value: 22.0, month: 'Jan' },
      { value: 22.5, month: 'Fev' },
      { value: 23.0, month: 'Mar' },
      { value: 23.2, month: 'Abr' },
      { value: 23.5, month: 'Mai' },
      { value: 23.8, month: 'Jun' },
      { value: 24.0, month: 'Jul' },
      { value: 24.1, month: 'Ago' },
      { value: 24.3, month: 'Set' },
      { value: 24.6, month: 'Out' },
      { value: 24.7, month: 'Nov' },
      { value: 24.85, month: 'Dez' },
    ],
  },
  
  // METÁLICAS
  {
    name: 'Ouro',
    symbol: 'GOLD',
    price: '2,045',
    change: 28.50,
    changePercent: '+1.41%',
    unit: 'USD/oz',
    icon: 'Ouro',
    category: 'metalicas',
    data: [
      { value: 2015 },
      { value: 2020 },
      { value: 2018 },
      { value: 2030 },
      { value: 2040 },
      { value: 2045 },
    ],
    chartData: [
      { value: 1980, month: 'Jan' },
      { value: 1990, month: 'Fev' },
      { value: 2000, month: 'Mar' },
      { value: 2015, month: 'Abr' },
      { value: 2020, month: 'Mai' },
      { value: 2010, month: 'Jun' },
      { value: 2018, month: 'Jul' },
      { value: 2025, month: 'Ago' },
      { value: 2030, month: 'Set' },
      { value: 2040, month: 'Out' },
      { value: 2038, month: 'Nov' },
      { value: 2045, month: 'Dez' },
    ],
  },
  {
    name: 'Prata',
    symbol: 'SILVER',
    price: '24.35',
    change: -0.42,
    changePercent: '-1.69%',
    unit: 'USD/oz',
    icon: 'Prata',
    category: 'metalicas',
    data: [
      { value: 25.2 },
      { value: 24.9 },
      { value: 24.7 },
      { value: 24.5 },
      { value: 24.4 },
      { value: 24.35 },
    ],
    chartData: [
      { value: 26.5, month: 'Jan' },
      { value: 26.0, month: 'Fev' },
      { value: 25.8, month: 'Mar' },
      { value: 25.5, month: 'Abr' },
      { value: 25.2, month: 'Mai' },
      { value: 24.9, month: 'Jun' },
      { value: 24.7, month: 'Jul' },
      { value: 24.6, month: 'Ago' },
      { value: 24.5, month: 'Set' },
      { value: 24.4, month: 'Out' },
      { value: 24.38, month: 'Nov' },
      { value: 24.35, month: 'Dez' },
    ],
  },
  {
    name: 'Cobre',
    symbol: 'COPPER',
    price: '3.85',
    change: 0.08,
    changePercent: '+2.12%',
    unit: 'USD/lb',
    icon: 'Cobre',
    category: 'metalicas',
    data: [
      { value: 3.72 },
      { value: 3.75 },
      { value: 3.78 },
      { value: 3.80 },
      { value: 3.83 },
      { value: 3.85 },
    ],
    chartData: [
      { value: 3.55, month: 'Jan' },
      { value: 3.60, month: 'Fev' },
      { value: 3.65, month: 'Mar' },
      { value: 3.68, month: 'Abr' },
      { value: 3.72, month: 'Mai' },
      { value: 3.75, month: 'Jun' },
      { value: 3.78, month: 'Jul' },
      { value: 3.79, month: 'Ago' },
      { value: 3.80, month: 'Set' },
      { value: 3.83, month: 'Out' },
      { value: 3.84, month: 'Nov' },
      { value: 3.85, month: 'Dez' },
    ],
  },
  {
    name: 'Alumínio',
    symbol: 'ALUMINUM',
    price: '2,245',
    change: -15.50,
    changePercent: '-0.69%',
    unit: 'USD/ton',
    icon: 'Alumínio',
    category: 'metalicas',
    data: [
      { value: 2280 },
      { value: 2270 },
      { value: 2265 },
      { value: 2255 },
      { value: 2250 },
      { value: 2245 },
    ],
    chartData: [
      { value: 2350, month: 'Jan' },
      { value: 2330, month: 'Fev' },
      { value: 2310, month: 'Mar' },
      { value: 2290, month: 'Abr' },
      { value: 2280, month: 'Mai' },
      { value: 2270, month: 'Jun' },
      { value: 2265, month: 'Jul' },
      { value: 2260, month: 'Ago' },
      { value: 2255, month: 'Set' },
      { value: 2250, month: 'Out' },
      { value: 2248, month: 'Nov' },
      { value: 2245, month: 'Dez' },
    ],
  },
  {
    name: 'Níquel',
    symbol: 'NICKEL',
    price: '17,850',
    change: 320.00,
    changePercent: '+1.83%',
    unit: 'USD/ton',
    icon: 'Níquel',
    category: 'metalicas',
    data: [
      { value: 17200 },
      { value: 17350 },
      { value: 17500 },
      { value: 17600 },
      { value: 17750 },
      { value: 17850 },
    ],
    chartData: [
      { value: 16500, month: 'Jan' },
      { value: 16700, month: 'Fev' },
      { value: 16900, month: 'Mar' },
      { value: 17100, month: 'Abr' },
      { value: 17200, month: 'Mai' },
      { value: 17350, month: 'Jun' },
      { value: 17500, month: 'Jul' },
      { value: 17550, month: 'Ago' },
      { value: 17600, month: 'Set' },
      { value: 17750, month: 'Out' },
      { value: 17800, month: 'Nov' },
      { value: 17850, month: 'Dez' },
    ],
  },

  // ÍNDICES
  {
    name: 'S&P 500',
    symbol: 'SPX',
    price: '4,785.35',
    change: 52.80,
    changePercent: '+1.12%',
    unit: 'pts',
    icon: 'S&P 500',
    category: 'indices',
    data: [
      { value: 4680 },
      { value: 4710 },
      { value: 4735 },
      { value: 4750 },
      { value: 4770 },
      { value: 4785.35 },
    ],
    chartData: [
      { value: 4400, month: 'Jan' },
      { value: 4450, month: 'Fev' },
      { value: 4500, month: 'Mar' },
      { value: 4550, month: 'Abr' },
      { value: 4600, month: 'Mai' },
      { value: 4650, month: 'Jun' },
      { value: 4680, month: 'Jul' },
      { value: 4710, month: 'Ago' },
      { value: 4735, month: 'Set' },
      { value: 4750, month: 'Out' },
      { value: 4770, month: 'Nov' },
      { value: 4785.35, month: 'Dez' },
    ],
  },
  {
    name: 'Dow Jones',
    symbol: 'DJI',
    price: '37,248.90',
    change: -125.60,
    changePercent: '-0.34%',
    unit: 'pts',
    icon: 'Dow Jones',
    category: 'indices',
    data: [
      { value: 37450 },
      { value: 37380 },
      { value: 37320 },
      { value: 37290 },
      { value: 37260 },
      { value: 37248.9 },
    ],
    chartData: [
      { value: 36800, month: 'Jan' },
      { value: 36950, month: 'Fev' },
      { value: 37100, month: 'Mar' },
      { value: 37250, month: 'Abr' },
      { value: 37350, month: 'Mai' },
      { value: 37450, month: 'Jun' },
      { value: 37380, month: 'Jul' },
      { value: 37340, month: 'Ago' },
      { value: 37320, month: 'Set' },
      { value: 37290, month: 'Out' },
      { value: 37260, month: 'Nov' },
      { value: 37248.9, month: 'Dez' },
    ],
  },
  {
    name: 'Nasdaq',
    symbol: 'IXIC',
    price: '14,925.20',
    change: 198.45,
    changePercent: '+1.35%',
    unit: 'pts',
    icon: 'Nasdaq',
    category: 'indices',
    data: [
      { value: 14500 },
      { value: 14600 },
      { value: 14720 },
      { value: 14800 },
      { value: 14880 },
      { value: 14925.2 },
    ],
    chartData: [
      { value: 13800, month: 'Jan' },
      { value: 13950, month: 'Fev' },
      { value: 14100, month: 'Mar' },
      { value: 14250, month: 'Abr' },
      { value: 14400, month: 'Mai' },
      { value: 14500, month: 'Jun' },
      { value: 14600, month: 'Jul' },
      { value: 14720, month: 'Ago' },
      { value: 14800, month: 'Set' },
      { value: 14850, month: 'Out' },
      { value: 14880, month: 'Nov' },
      { value: 14925.2, month: 'Dez' },
    ],
  },
  {
    name: 'Ibovespa',
    symbol: 'IBOV',
    price: '128,560',
    change: -842.30,
    changePercent: '-0.65%',
    unit: 'pts',
    icon: 'Ibovespa',
    category: 'indices',
    data: [
      { value: 130200 },
      { value: 129850 },
      { value: 129400 },
      { value: 129000 },
      { value: 128750 },
      { value: 128560 },
    ],
    chartData: [
      { value: 132000, month: 'Jan' },
      { value: 131500, month: 'Fev' },
      { value: 131000, month: 'Mar' },
      { value: 130500, month: 'Abr' },
      { value: 130200, month: 'Mai' },
      { value: 129850, month: 'Jun' },
      { value: 129400, month: 'Jul' },
      { value: 129200, month: 'Ago' },
      { value: 129000, month: 'Set' },
      { value: 128750, month: 'Out' },
      { value: 128650, month: 'Nov' },
      { value: 128560, month: 'Dez' },
    ],
  },
  {
    name: 'DAX',
    symbol: 'GDAXI',
    price: '16,785.45',
    change: 95.20,
    changePercent: '+0.57%',
    unit: 'pts',
    icon: 'DAX',
    category: 'indices',
    data: [
      { value: 16550 },
      { value: 16600 },
      { value: 16650 },
      { value: 16700 },
      { value: 16750 },
      { value: 16785.45 },
    ],
    chartData: [
      { value: 16000, month: 'Jan' },
      { value: 16100, month: 'Fev' },
      { value: 16200, month: 'Mar' },
      { value: 16300, month: 'Abr' },
      { value: 16450, month: 'Mai' },
      { value: 16550, month: 'Jun' },
      { value: 16600, month: 'Jul' },
      { value: 16630, month: 'Ago' },
      { value: 16650, month: 'Set' },
      { value: 16700, month: 'Out' },
      { value: 16750, month: 'Nov' },
      { value: 16785.45, month: 'Dez' },
    ],
  },

  // FX (Foreign Exchange)
  {
    name: 'USD/BRL',
    symbol: 'USDBRL',
    price: '4.9875',
    change: -0.0235,
    changePercent: '-0.47%',
    unit: 'BRL',
    icon: 'USD/BRL',
    category: 'fx',
    data: [
      { value: 5.085 },
      { value: 5.025 },
      { value: 5.110 },
      { value: 5.045 },
      { value: 5.015 },
      { value: 4.9875 },
    ],
    chartData: [
      { value: 5.250, month: 'Jan' },
      { value: 5.180, month: 'Fev' },
      { value: 5.320, month: 'Mar' },
      { value: 5.150, month: 'Abr' },
      { value: 5.280, month: 'Mai' },
      { value: 5.085, month: 'Jun' },
      { value: 5.200, month: 'Jul' },
      { value: 5.025, month: 'Ago' },
      { value: 5.110, month: 'Set' },
      { value: 5.045, month: 'Out' },
      { value: 5.015, month: 'Nov' },
      { value: 4.9875, month: 'Dez' },
    ],
  },
  {
    name: 'EUR/USD',
    symbol: 'EURUSD',
    price: '1.0885',
    change: 0.0042,
    changePercent: '+0.39%',
    unit: 'USD',
    icon: 'EUR/USD',
    category: 'fx',
    data: [
      { value: 1.0750 },
      { value: 1.0820 },
      { value: 1.0765 },
      { value: 1.0895 },
      { value: 1.0845 },
      { value: 1.0885 },
    ],
    chartData: [
      { value: 1.0580, month: 'Jan' },
      { value: 1.0720, month: 'Fev' },
      { value: 1.0650, month: 'Mar' },
      { value: 1.0780, month: 'Abr' },
      { value: 1.0690, month: 'Mai' },
      { value: 1.0750, month: 'Jun' },
      { value: 1.0820, month: 'Jul' },
      { value: 1.0765, month: 'Ago' },
      { value: 1.0895, month: 'Set' },
      { value: 1.0830, month: 'Out' },
      { value: 1.0845, month: 'Nov' },
      { value: 1.0885, month: 'Dez' },
    ],
  },
  {
    name: 'GBP/USD',
    symbol: 'GBPUSD',
    price: '1.2735',
    change: -0.0055,
    changePercent: '-0.43%',
    unit: 'USD',
    icon: 'GBP/USD',
    category: 'fx',
    data: [
      { value: 1.2920 },
      { value: 1.2780 },
      { value: 1.2850 },
      { value: 1.2720 },
      { value: 1.2805 },
      { value: 1.2735 },
    ],
    chartData: [
      { value: 1.3080, month: 'Jan' },
      { value: 1.2920, month: 'Fev' },
      { value: 1.3150, month: 'Mar' },
      { value: 1.2860, month: 'Abr' },
      { value: 1.3020, month: 'Mai' },
      { value: 1.2920, month: 'Jun' },
      { value: 1.2780, month: 'Jul' },
      { value: 1.2950, month: 'Ago' },
      { value: 1.2850, month: 'Set' },
      { value: 1.2720, month: 'Out' },
      { value: 1.2805, month: 'Nov' },
      { value: 1.2735, month: 'Dez' },
    ],
  },
  {
    name: 'USD/JPY',
    symbol: 'USDJPY',
    price: '149.85',
    change: 0.62,
    changePercent: '+0.42%',
    unit: 'JPY',
    icon: 'USD/JPY',
    category: 'fx',
    data: [
      { value: 147.2 },
      { value: 148.9 },
      { value: 146.8 },
      { value: 149.5 },
      { value: 148.3 },
      { value: 149.85 },
    ],
    chartData: [
      { value: 142.5, month: 'Jan' },
      { value: 145.8, month: 'Fev' },
      { value: 144.0, month: 'Mar' },
      { value: 147.5, month: 'Abr' },
      { value: 145.5, month: 'Mai' },
      { value: 147.2, month: 'Jun' },
      { value: 148.9, month: 'Jul' },
      { value: 146.8, month: 'Ago' },
      { value: 149.5, month: 'Set' },
      { value: 147.9, month: 'Out' },
      { value: 148.3, month: 'Nov' },
      { value: 149.85, month: 'Dez' },
    ],
  },
  {
    name: 'AUD/USD',
    symbol: 'AUDUSD',
    price: '0.6585',
    change: 0.0028,
    changePercent: '+0.43%',
    unit: 'USD',
    icon: 'AUD/USD',
    category: 'fx',
    data: [
      { value: 0.6480 },
      { value: 0.6595 },
      { value: 0.6520 },
      { value: 0.6610 },
      { value: 0.6545 },
      { value: 0.6585 },
    ],
    chartData: [
      { value: 0.6380, month: 'Jan' },
      { value: 0.6520, month: 'Fev' },
      { value: 0.6450, month: 'Mar' },
      { value: 0.6580, month: 'Abr' },
      { value: 0.6490, month: 'Mai' },
      { value: 0.6480, month: 'Jun' },
      { value: 0.6595, month: 'Jul' },
      { value: 0.6520, month: 'Ago' },
      { value: 0.6610, month: 'Set' },
      { value: 0.6565, month: 'Out' },
      { value: 0.6545, month: 'Nov' },
      { value: 0.6585, month: 'Dez' },
    ],
  },
]

interface MarketWidgetProps {
  category?: MarketCategory
  isActive?: boolean
}

// Interface para dados de performance
interface PerformanceData {
  '5 dias': number
  '10 dias': number
  '1 mês': number
  'Ano': number
}

// Função para gerar dados de performance baseados no preço atual e variação
const generatePerformanceData = (currentPrice: string, change: number): PerformanceData => {
  const baseChange = change / 100 // Converter para decimal
  
  // Calcular performance percentual para cada período
  // Baseado na variação atual, simulamos variações históricas proporcionais
  return {
    '5 dias': baseChange * 0.3 * 100, // ~30% da variação atual em 5 dias
    '10 dias': baseChange * 0.6 * 100, // ~60% da variação atual em 10 dias
    '1 mês': baseChange * 1.2 * 100, // ~120% da variação atual em 1 mês
    'Ano': baseChange * 2.5 * 100, // ~250% da variação atual no ano
  }
}

const MarketWidget = memo(function MarketWidget({ category = 'agricolas', isActive = true }: MarketWidgetProps) {
  const [activeTab, setActiveTab] = useState('Todas')
  const [activePeriod, setActivePeriod] = useState('1A')
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null)
  const [viewMode, setViewMode] = useState<'market' | 'performance'>('market')
  const [rankingPeriod, setRankingPeriod] = useState<keyof PerformanceData>('Ano')

  // Filtrar mercados pela categoria (memoizado)
  const categoryMarkets = useMemo(() => {
    return allMarkets.filter((market) => market.category === category)
  }, [category])

  // Filtrar commodities baseado na tab ativa (memoizado)
  const filteredMarkets = useMemo(() => {
    return categoryMarkets.filter((market) => {
      if (activeTab === 'Em Alta') return market.change > 0
      if (activeTab === 'Em Queda') return market.change < 0
      return true
    })
  }, [categoryMarkets, activeTab])

  // Atualizar mercado selecionado quando a categoria mudar
  useEffect(() => {
    if (categoryMarkets.length > 0) {
      setSelectedMarket(categoryMarkets[0])
      setActiveTab('Todas')
    }
  }, [category, categoryMarkets])

  // Garantir que sempre há um mercado selecionado
  useEffect(() => {
    if (!selectedMarket && filteredMarkets.length > 0) {
      setSelectedMarket(filteredMarkets[0])
    }
  }, [filteredMarkets, selectedMarket])

  // Função para trocar de tab e atualizar o mercado selecionado
  const handleTabChange = (tab: string) => {
    if (!isActive) return
    
    setActiveTab(tab)
    
    let newFilteredMarkets = categoryMarkets
    if (tab === 'Em Alta') {
      newFilteredMarkets = categoryMarkets.filter(m => m.change > 0)
    } else if (tab === 'Em Queda') {
      newFilteredMarkets = categoryMarkets.filter(m => m.change < 0)
    }
    
    if (newFilteredMarkets.length > 0) {
      setSelectedMarket(newFilteredMarkets[0])
    }
  }

  // Função para formatar percentual
  const formatPercent = (value: number): string => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  if (!selectedMarket) return null

  // Renderizar view de performance
  if (viewMode === 'performance') {
    return (
      <div 
        className="text-[11px]"
        style={{
          contain: !isActive ? 'style layout paint' : undefined,
        }}
      >
        {/* Header com botão de voltar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
          <h3 className="font-montserrat-semibold text-slate-900" style={{ fontSize: '12px' }}>
            Performance
          </h3>
          <button
            onClick={() => isActive && setViewMode('market')}
            className="flex items-center gap-1 px-2 py-1 rounded-md font-montserrat-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            disabled={!isActive}
          >
            <ICONS.ChevronLeft className="w-3 h-3" />
            Voltar
          </button>
        </div>

        <div className="px-3 pt-3 pb-2">
          {/* Tabs no topo */}
          <div className="flex items-stretch border-b border-slate-200 gap-0 mb-3">
            {['Todas', 'Em Alta', 'Em Queda'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-1.5 px-2 font-montserrat-semibold transition-all duration-200 relative text-center flex items-center justify-center group ${
                  activeTab === tab
                    ? 'text-[#2a9d8f] bg-emerald-50/50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                style={{ fontSize: '12px' }}
                disabled={!isActive}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a9d8f]" />
                )}
              </button>
            ))}
          </div>

          {/* Seletor de Período para Rankings e Rankings - apenas quando "Todas" */}
          {activeTab === 'Todas' && (
            <>
              {/* Seletor de Período para Rankings */}
              <div className="mb-3 flex items-center justify-center gap-1">
                {(['5 dias', '10 dias', '1 mês', 'Ano'] as Array<keyof PerformanceData>).map((period) => (
                  <button
                    key={period}
                    onClick={() => isActive && setRankingPeriod(period)}
                    className={`px-2 py-0.5 rounded font-montserrat-semibold transition-all ${
                      rankingPeriod === period
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={{ fontSize: '8px' }}
                    disabled={!isActive}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Rankings */}
              <div className="mb-4 space-y-2.5">
            {/* Top 5 Maiores Altas */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-2.5 py-1.5">
                <h4 className="font-montserrat-semibold text-slate-900" style={{ fontSize: '10px' }}>
                  Top 5 Maiores Altas ({rankingPeriod})
                </h4>
              </div>
              <div className="divide-y divide-slate-100">
                {(() => {
                  const topGains = filteredMarkets
                    .map((market) => {
                      const performance = generatePerformanceData(market.price, market.change)
                      return { market, performance: performance[rankingPeriod] }
                    })
                    .filter((item) => item.performance > 0)
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 5)
                  
                  if (topGains.length === 0) {
                    return (
                      <div className="px-2.5 py-2">
                        <span className="font-montserrat text-slate-500 text-[9px]">
                          Nenhuma alta no período
                        </span>
                      </div>
                    )
                  }
                  
                  return topGains.map((item, index) => (
                    <div key={item.market.symbol} className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat-semibold text-slate-400" style={{ fontSize: '9px', minWidth: '20px' }}>
                          {index + 1}º
                        </span>
                        <span className="font-montserrat-medium text-slate-900" style={{ fontSize: '10px' }}>
                          {item.market.icon}
                        </span>
                      </div>
                      <span className="font-montserrat-semibold text-emerald-700" style={{ fontSize: '10px' }}>
                        {formatPercent(item.performance)}
                      </span>
                    </div>
                  ))
                })()}
              </div>
            </div>

            {/* Top 5 Maiores Quedas */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-2.5 py-1.5">
                <h4 className="font-montserrat-semibold text-slate-900" style={{ fontSize: '10px' }}>
                  Top 5 Maiores Quedas ({rankingPeriod})
                </h4>
              </div>
              <div className="divide-y divide-slate-100">
                {(() => {
                  const topLosses = filteredMarkets
                    .map((market) => {
                      const performance = generatePerformanceData(market.price, market.change)
                      return { market, performance: performance[rankingPeriod] }
                    })
                    .filter((item) => item.performance < 0)
                    .sort((a, b) => a.performance - b.performance)
                    .slice(0, 5)
                  
                  if (topLosses.length === 0) {
                    return (
                      <div className="px-2.5 py-2">
                        <span className="font-montserrat text-slate-500 text-[9px]">
                          Nenhuma queda no período
                        </span>
                      </div>
                    )
                  }
                  
                  return topLosses.map((item, index) => (
                    <div key={item.market.symbol} className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat-semibold text-slate-400" style={{ fontSize: '9px', minWidth: '20px' }}>
                          {index + 1}º
                        </span>
                        <span className="font-montserrat-medium text-slate-900" style={{ fontSize: '10px' }}>
                          {item.market.icon}
                        </span>
                      </div>
                      <span className="font-montserrat-semibold text-red-600" style={{ fontSize: '10px' }}>
                        {formatPercent(item.performance)}
                      </span>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>
            </>
          )}

          {/* Lista de Performance */}
          <div>
            {filteredMarkets.map((market) => {
              const performance = generatePerformanceData(market.price, market.change)
              const periods: Array<keyof PerformanceData> = ['5 dias', '10 dias', '1 mês', 'Ano']
              
              return (
                <div
                  key={market.symbol}
                  className="py-2 px-2 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  {/* Nome da commodity e Var(%) */}
                  <div className="mb-1.5 flex items-center justify-between">
                    <span 
                      className="font-montserrat-semibold text-slate-900" 
                      style={{ 
                        fontSize: market.category === 'fx' ? '11px' : '12px', 
                        lineHeight: '1.2'
                      }}
                    >
                      {market.icon}
                    </span>
                    <span
                      className={`font-montserrat-semibold whitespace-nowrap ${
                        performance['Ano'] >= 0 ? 'text-emerald-700' : 'text-red-600'
                      }`}
                      style={{ fontSize: '10px' }}
                    >
                      {formatPercent(performance['Ano'])}
                    </span>
                  </div>

                  {/* Barras de Performance Horizontais */}
                  <div className="space-y-1.5">
                    {periods.map((period) => {
                      const perfPercent = performance[period]
                      const isPositive = perfPercent >= 0
                      const absPercent = Math.abs(perfPercent)
                      // Escala ajustada: usar escala logarítmica suave para melhor visualização
                      // Normalizar para máximo de 50% do espaço (já que dividimos por 2)
                      const maxScale = 50
                      const scaledPercent = Math.min(absPercent, maxScale * 2) // Limitar a 100% total
                      const barWidth = (scaledPercent / (maxScale * 2)) * 100 // Converter para porcentagem do espaço total
                      
                      return (
                        <div key={period} className="relative flex items-center gap-2">
                          {/* Label do período */}
                          <span className="font-montserrat-medium text-slate-600 whitespace-nowrap" style={{ fontSize: '9px', minWidth: '45px' }}>
                            {period}
                          </span>
                          
                          {/* Barra horizontal */}
                          <div className="relative flex-1 h-3 bg-slate-100 overflow-hidden border border-slate-200">
                            {/* Linha central (zero) - sempre visível */}
                            <div className="absolute top-0 left-1/2 w-px h-full bg-slate-300 -translate-x-1/2 z-10" />
                            
                            {/* Barra de performance */}
                            {isPositive ? (
                              <div
                                className="absolute top-0 left-1/2 h-full transition-all duration-700 ease-out bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700"
                                style={{ 
                                  width: `${barWidth / 2}%`,
                                  transform: 'translateX(0)'
                                }}
                              />
                            ) : (
                              <div
                                className="absolute top-0 right-1/2 h-full transition-all duration-700 ease-out bg-gradient-to-r from-red-700 via-red-600 to-red-500"
                                style={{ 
                                  width: `${barWidth / 2}%`,
                                  transform: 'translateX(0)'
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="text-[11px]"
      style={{
        contain: !isActive ? 'style layout paint' : undefined,
      }}
    >
      {/* Header com tabs e botão de Performance */}
      <div className="border-b border-slate-200">
        {/* Tabs no topo */}
        <div className="flex items-stretch gap-0">
          {['Todas', 'Em Alta', 'Em Queda'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-1.5 px-2 font-montserrat-semibold transition-all duration-200 relative text-center flex items-center justify-center group ${
                activeTab === tab
                  ? 'text-[#2a9d8f] bg-emerald-50/50'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              style={{ fontSize: '12px' }}
              disabled={!isActive}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a9d8f]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 pt-3 pb-1">
        {/* Gráfico Principal Grande */}
        <div className="mb-1">
          {/* Header com nome e cotação da commodity selecionada */}
          <div className="flex items-center justify-between mb-1.5">
            {/* Lado esquerdo: Nome e Cotação */}
            <div className="flex items-center gap-2">
              <span 
                className="font-montserrat-semibold text-slate-900" 
                style={{ 
                  fontSize: selectedMarket.category === 'fx' ? '12px' : '13px', 
                  lineHeight: '1.2'
                }}
              >
                {selectedMarket.icon}
              </span>
              <span className="num font-montserrat-semibold text-slate-900" style={{ fontSize: '11px', lineHeight: '1' }}>
                ${selectedMarket.price}
              </span>
            </div>
            
            {/* Lado direito: Seta e Variação Percentual */}
            <div
              className="num font-montserrat-semibold flex items-center gap-0.5"
              style={{ fontSize: '10px', lineHeight: '1' }}
            >
              {selectedMarket.change > 0 ? (
                <>
                  <ICONS.ChevronUp className="w-3 h-3 text-emerald-800" />
                  <span className="text-emerald-800">{selectedMarket.changePercent}</span>
                </>
              ) : (
                <>
                  <ICONS.ChevronDown className="w-3 h-3 text-red-800" />
                  <span className="text-red-800">{selectedMarket.changePercent}</span>
                </>
              )}
            </div>
          </div>

          <div className="h-24 select-none outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={selectedMarket.chartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="0%" 
                      stopColor={selectedMarket.change > 0 ? '#047857' : '#dc2626'} 
                      stopOpacity={0.3} 
                    />
                    <stop 
                      offset="100%" 
                      stopColor={selectedMarket.change > 0 ? '#047857' : '#dc2626'} 
                      stopOpacity={0} 
                    />
                  </linearGradient>
                </defs>
                <YAxis hide domain={['dataMin - 3', 'dataMax + 3']} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={selectedMarket.change > 0 ? '#047857' : '#dc2626'}
                  strokeWidth={1.5}
                  fill="url(#mainGradient)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Labels de tempo abaixo do gráfico */}
          <div className="flex justify-between px-2 mt-0.5">
            {['2025', 'Abr', 'Jul', 'Out'].map((month) => (
              <span
                key={month}
                className="font-montserrat text-slate-400"
                style={{ fontSize: '9px' }}
              >
                {month}
              </span>
            ))}
          </div>
        </div>

        {/* Botões de período */}
        <div className="flex items-center gap-2 mb-2.5">
          {['1D', '1M', '3M', '1A', '5A', 'Tudo'].map((period) => (
            <button
              key={period}
              onClick={() => isActive && setActivePeriod(period)}
              className={`px-2.5 py-1 rounded-md font-montserrat-semibold transition-all ${
                activePeriod === period
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={{ fontSize: '9px' }}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Lista de Commodities */}
        <div className="divide-y divide-slate-200 mb-2">
          {filteredMarkets.map((market, index) => (
            <div
              key={market.symbol}
              onClick={() => isActive && setSelectedMarket(market)}
              className={`py-1.5 px-2 hover:bg-slate-50 transition-colors cursor-pointer select-none outline-none ${
                selectedMarket.symbol === market.symbol ? 'bg-slate-50/50 border-l-2 border-slate-300' : ''
              }`}
            >
              {/* Nome, Cotação e Variação */}
              <div className="flex flex-col gap-0.5">
                <span 
                  className="font-montserrat-semibold text-slate-900" 
                  style={{ 
                    fontSize: market.category === 'fx' ? '11px' : '12px', 
                    lineHeight: '1.2'
                  }}
                >
                  {market.icon}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="num font-montserrat text-slate-600" style={{ fontSize: '9px', lineHeight: '1' }}>
                    ${market.price}
                  </span>
                  <span
                    className={`num font-montserrat-semibold ${
                      market.change > 0 ? 'text-emerald-700' : 'text-red-600'
                    }`}
                    style={{ fontSize: '9px', lineHeight: '1' }}
                  >
                    {market.changePercent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Performance - no bottom */}
        <div className="px-3 pt-3 pb-1 border-t border-slate-200">
          <button
            onClick={() => isActive && setViewMode('performance')}
            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md font-montserrat-semibold text-xs bg-slate-50 text-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 relative overflow-hidden group"
            disabled={!isActive}
            title="Ver Performance das Commodities"
          >
            {/* Gradiente de preenchimento progressivo da esquerda para direita no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-300/7 to-emerald-200/4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100" />
            <div className="relative z-10 flex items-center justify-center gap-1.5">
              <ICONS.BarChart3 className="w-3.5 h-3.5" />
              <span>Ver Performance</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
})

export default MarketWidget
