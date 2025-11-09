'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Mover {
  symbol: string
  name: string
  changePercent: number
  trend: 'up' | 'down'
}

interface ActiveStock {
  symbol: string
  name: string
  price: string
  change: number
  changePercent: number
  volume: string
}

const marketData = {
  spx: {
    top: [
      { symbol: 'SOJA', name: 'Soja', changePercent: 17.547 },
      { symbol: 'MILHO', name: 'Milho', changePercent: 14.712 },
      { symbol: 'TRIGO', name: 'Trigo', changePercent: 7.906 },
      { symbol: 'CAFE', name: 'Café Arábica', changePercent: 6.539 },
      { symbol: 'ACUCAR', name: 'Açúcar', changePercent: 6.487 }
    ],
    bottom: [
      { symbol: 'DOLAR', name: 'Dólar', changePercent: -8.082 },
      { symbol: 'EURO', name: 'Euro', changePercent: -7.726 },
      { symbol: 'PETRO', name: 'Petróleo', changePercent: -6.318 },
      { symbol: 'OURO', name: 'Ouro', changePercent: -5.205 },
      { symbol: 'COBRE', name: 'Cobre', changePercent: -5.173 }
    ],
    mostActive: [
      { symbol: 'SOJA', name: 'Soja', price: '1,425', change: 8.50, changePercent: 0.59, volume: '453.879.480' },
      { symbol: 'DOLAR', name: 'Dólar', price: '4.9875', change: -0.0235, changePercent: -0.47, volume: '264.942.255' },
      { symbol: 'PETRO', name: 'Petróleo Brent', price: '94.50', change: 12.80, changePercent: 2.09, volume: '214.509.192' },
      { symbol: 'OURO', name: 'Ouro', price: '2,045', change: -28.50, changePercent: -1.41, volume: '153.846.617' },
      { symbol: 'MILHO', name: 'Milho', price: '482.75', change: 2.25, changePercent: 0.46, volume: '143.987.663' }
    ]
  },
  nasdaq: {
    top: [
      { symbol: 'SOJA', name: 'Soja', changePercent: 15.2 },
      { symbol: 'MILHO', name: 'Milho', changePercent: 12.5 },
      { symbol: 'TRIGO', name: 'Trigo', changePercent: 8.3 },
      { symbol: 'CAFE', name: 'Café Arábica', changePercent: 7.1 },
      { symbol: 'ACUCAR', name: 'Açúcar', changePercent: 5.9 }
    ],
    bottom: [
      { symbol: 'DOLAR', name: 'Dólar', changePercent: -7.5 },
      { symbol: 'EURO', name: 'Euro', changePercent: -6.8 },
      { symbol: 'PETRO', name: 'Petróleo', changePercent: -5.2 },
      { symbol: 'OURO', name: 'Ouro', changePercent: -4.9 },
      { symbol: 'COBRE', name: 'Cobre', changePercent: -4.5 }
    ],
    mostActive: [
      { symbol: 'SOJA', name: 'Soja', price: '1,425', change: 8.50, changePercent: 0.59, volume: '453.879.480' },
      { symbol: 'DOLAR', name: 'Dólar', price: '4.9875', change: -0.0235, changePercent: -0.47, volume: '264.942.255' },
      { symbol: 'PETRO', name: 'Petróleo Brent', price: '94.50', change: 12.80, changePercent: 2.09, volume: '214.509.192' },
      { symbol: 'OURO', name: 'Ouro', price: '2,045', change: -28.50, changePercent: -1.41, volume: '153.846.617' },
      { symbol: 'MILHO', name: 'Milho', price: '482.75', change: 2.25, changePercent: 0.46, volume: '143.987.663' }
    ]
  }
}

export default function PerformanceSection() {
  const [activeTab, setActiveTab] = useState<'spx' | 'nasdaq' | 'dow' | 'eur' | 'asia'>('spx')
  const currentData = marketData[activeTab] || marketData.spx

  const getMaxPercent = (items: Mover[]) => {
    return Math.max(...items.map(item => Math.abs(item.changePercent)))
  }

  const maxTop = getMaxPercent(currentData.top)
  const maxBottom = getMaxPercent(currentData.bottom)

  return (
    <section className="mb-8">
      {/* Linha Divisória */}
      <div className="mb-6">
        <div className="h-[0.5px] w-full bg-slate-300/30"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-montserrat-semibold text-2xl text-cyan-950 mb-4">
          Markets
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200">
          {(['spx', 'nasdaq', 'dow', 'eur', 'asia'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-montserrat-semibold text-sm transition-all duration-200 relative ${
                activeTab === tab
                  ? 'text-cyan-950'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.toUpperCase()}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Market Movers */}
      <div className="mb-8">
        <h3 className="font-montserrat-semibold text-lg text-cyan-950 mb-4">MARKET MOVERS</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* TOP Movers */}
          <div>
            <div className="text-xs font-montserrat-semibold text-emerald-700 mb-3 uppercase">TOP</div>
            <div className="space-y-2">
              {currentData.top.map((item, index) => (
                <motion.div
                  key={item.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-emerald-600 font-montserrat-semibold text-sm">+</span>
                    <span className="font-montserrat-semibold text-sm text-cyan-950">{item.symbol}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-montserrat text-xs text-slate-600 truncate">{item.name}</span>
                      <span className="font-montserrat-semibold text-sm text-emerald-700">
                        {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(3)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(Math.abs(item.changePercent) / maxTop) * 100}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BOTTOM Movers */}
          <div>
            <div className="text-xs font-montserrat-semibold text-red-600 mb-3 uppercase">BOTTOM</div>
            <div className="space-y-2">
              {currentData.bottom.map((item, index) => (
                <motion.div
                  key={item.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="text-red-600 font-montserrat-semibold text-sm">+</span>
                    <span className="font-montserrat-semibold text-sm text-cyan-950">{item.symbol}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-montserrat text-xs text-slate-600 truncate">{item.name}</span>
                      <span className="font-montserrat-semibold text-sm text-red-600">
                        {item.changePercent.toFixed(3)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(Math.abs(item.changePercent) / maxBottom) * 100}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Most Active e Latest News */}
      <div className="grid md:grid-cols-[1fr_1fr] gap-6">
        {/* MOST ACTIVE */}
        <div>
          <h3 className="font-montserrat-semibold text-lg text-cyan-950 mb-4">MOST ACTIVE</h3>
          <div className="bg-white rounded-lg card-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 text-xs font-montserrat-semibold text-slate-600 uppercase">NAME</th>
                    <th className="text-right py-2 px-3 text-xs font-montserrat-semibold text-slate-600 uppercase">PRICE</th>
                    <th className="text-right py-2 px-3 text-xs font-montserrat-semibold text-slate-600 uppercase">CHG</th>
                    <th className="text-right py-2 px-3 text-xs font-montserrat-semibold text-slate-600 uppercase">%CHG</th>
                    <th className="text-right py-2 px-3 text-xs font-montserrat-semibold text-slate-600 uppercase">VOL</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.mostActive.map((stock, index) => (
                    <motion.tr
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-montserrat-semibold text-xs">+</span>
                          <div>
                            <div className="font-montserrat-semibold text-sm text-cyan-950">{stock.symbol}</div>
                            <div className="font-montserrat text-xs text-slate-500">{stock.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-2.5 px-3 font-montserrat-semibold text-sm text-cyan-950">
                        {stock.price}
                      </td>
                      <td className={`text-right py-2.5 px-3 font-montserrat text-sm ${
                        stock.change >= 0 ? 'text-emerald-700' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(4)}
                      </td>
                      <td className={`text-right py-2.5 px-3 font-montserrat-semibold text-sm ${
                        stock.changePercent >= 0 ? 'text-emerald-700' : 'text-red-600'
                      }`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(3)}% 
                        {stock.changePercent >= 0 ? ' ▲' : ' ▼'}
                      </td>
                      <td className="text-right py-2.5 px-3 font-montserrat text-xs text-slate-600">
                        {stock.volume}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LATEST MARKET NEWS */}
        <div>
          <h3 className="font-montserrat-semibold text-lg text-cyan-950 mb-4">LATEST MARKET NEWS</h3>
          <div className="space-y-4">
            {[
              { prefix: 'PRO', title: 'These stocks are the most oversold in the selloff and could be due for a bounce', author: 'Pia Singh' },
              { prefix: 'PRO', title: 'Markets could face a digestion period next week as earnings, data slow to a trickle', author: 'Sarah Min' }
            ].map((news, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg card-border shadow-sm p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs font-montserrat-semibold rounded">
                    {news.prefix}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-montserrat-semibold text-sm text-cyan-950 mb-2 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="font-montserrat text-xs text-slate-500">{news.author}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
