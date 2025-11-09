'use client'

import { useState, useMemo } from 'react'
import { STOCKS } from '../data'

export default function StocksTicker() {
  const [isTickerPaused, setIsTickerPaused] = useState(false)
  
  // Memoized stocks duplication for ticker
  const stocksDup = useMemo(() => [...STOCKS, ...STOCKS], [])

  return (
    <section className="bg-cyan-950 overflow-hidden">
      <div className="site-container py-1">
        <div
          className={`flex gap-1.5 ticker ${isTickerPaused ? 'ticker-paused' : ''}`}
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
          aria-label="Market ticker autoscroll"
          role="region"
        >
          {stocksDup.map((stock, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-1.5 py-0.5 bg-cyan-900/40 rounded-sm border border-cyan-800/50"
            >
              <div className="flex items-center gap-0.5">
                <span className="font-montserrat-semibold text-slate-50 ticker-text">{stock.name}</span>
                <span className="font-montserrat text-slate-200 ticker-text opacity-90">{stock.value}</span>
                <span
                  className={`px-0.5 rounded-sm ${
                    stock.direction === 'down'
                      ? 'bg-red-950/50 text-red-500'
                      : 'bg-cyan-950/50 text-[#2a9d90]'
                  } font-montserrat-semibold ticker-text`}
                >
                  {stock.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

