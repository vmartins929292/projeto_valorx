'use client'

import { useState } from 'react'
import StocksTicker from './StocksTicker'
import Header from './layout/Header'
import CategoryTabs from './layout/CategoryTabs'
import FeaturedCard from './FeaturedCard'
import NewsGrid from './NewsGrid'
import HighlightsSection from './HighlightsSection'
import MostReadSection from './MostReadSection'
import IntelligencePanel from './layout/IntelligencePanel'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'
import { NEWS_ARTICLES } from '../data'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="min-h-screen bg-[#fffffd] flex flex-col">
      {/* Stocks Ticker */}
      <StocksTicker />

      {/* Navigation - Sticky */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-1">
        {/* Category Tabs */}
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="site-container pb-8 -mt-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Feed */}
            <div className="flex-1">
              {/* Featured Article */}
              <FeaturedCard />

              {/* Linha Divisória */}
              <div className="mb-2">
                <div className="h-[0.5px] w-full bg-slate-300/30"></div>
              </div>

              {/* Radar do Mercado Section */}
              <div className="mb-2 sm:mb-3">
                <div className="mb-2 sm:mb-3 relative pl-3.5 sm:pl-4">
                  {/* Linha vertical contínua */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-[#01b792] to-cyan-500 rounded-full"></div>
                  
                  {/* Conteúdo */}
                  <div>
                    <h2 className="font-montserrat-semibold text-base sm:text-lg md:text-xl text-cyan-950 mb-0">
                      Radar do Mercado
                    </h2>
                    <p className="font-montserrat text-[9px] sm:text-[10px] text-slate-600 italic">
                      Drivers e insights que movem o mercado no curto prazo
                    </p>
                  </div>
                </div>
              </div>

              {/* News Grid */}
              <NewsGrid articles={NEWS_ARTICLES} />

              {/* Linha Divisória */}
              <div className="mb-2">
                <div className="h-[0.5px] w-full bg-slate-300/30"></div>
              </div>

              {/* Highlights Section */}
              <HighlightsSection />

              {/* Most Read Section */}
              <MostReadSection />

              {/* Painel de Inteligência */}
              <IntelligencePanel />
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
