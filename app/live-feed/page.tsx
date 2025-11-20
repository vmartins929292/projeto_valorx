'use client'

import { useState } from 'react'
import StocksTicker from '../components/StocksTicker'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import LiveFeedContainer from '../components/LiveFeedContainer'

export default function LiveFeedPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fffffd] flex flex-col">
      {/* Stocks Ticker */}
      <StocksTicker />

      {/* Navigation - Sticky */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-1">
        <div className="site-container pb-8 pt-6">
          <LiveFeedContainer />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

