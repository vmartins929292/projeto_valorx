'use client'

import { useState } from 'react'
import StocksTicker from './StocksTicker'
import Header from './layout/Header'
import CategoryTabs from './layout/CategoryTabs'
import FeaturedCard from './FeaturedCard'
import NewsGrid from './NewsGrid'
import MostReadSection from './MostReadSection'
import PerformanceSection from './PerformanceSection'
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

              {/* News Grid */}
              <NewsGrid articles={NEWS_ARTICLES} />

              {/* Linha Divisória */}
              <div className="mb-2">
                <div className="h-[0.5px] w-full bg-slate-300/30"></div>
              </div>

              {/* Most Read Section */}
              <MostReadSection />

              {/* Performance Section */}
              <PerformanceSection />
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
