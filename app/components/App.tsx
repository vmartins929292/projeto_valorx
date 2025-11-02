'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ICONS } from '../icons'
import svgPaths from '../imports/svg-9po0gahbk9'
import Card from '../imports/Card'
import EventsCalendar from '../imports/EventsCalendar'
import TactileButton from './TactileButton'
import FeaturedCard from './FeaturedCard'
import NewsCard, { type NewsArticle } from './NewsCard'
import MarketWidget from './MarketWidget'
import StocksTicker from './StocksTicker'
import Frame3Logo from '../imports/Frame3-6-444'
import { bindScrollWithRaf } from '../utils/scrollRaf'
import { MENU_ITEMS, NEWS_ARTICLES } from '../data'

// Throttle por rAF para evitar estouro de cálculos
function makeRafScheduler<T extends (...args: any[]) => void>(fn: T) {
  let scheduled = false
  let lastArgs: any[] = []

  return (...args: Parameters<T>) => {
    lastArgs = args
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      fn(...(lastArgs as Parameters<T>))
    })
  }
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [hasOpenedSubmenu, setHasOpenedSubmenu] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [stocksScrollPos, setStocksScrollPos] = useState(0)
  const [greetingExpanded, setGreetingExpanded] = useState(true)
  const [showExpandButton, setShowExpandButton] = useState(false)
  const greetingHasBeenToggled = useRef(false)
  const [selectedMarketCategory, setSelectedMarketCategory] = useState<'agricolas' | 'metalicas' | 'indices' | 'fx'>('agricolas')
  const [widgetExpanded, setWidgetExpanded] = useState(false)
  const [showWidgetButton, setShowWidgetButton] = useState(false)
  const [rightButtonClicked, setRightButtonClicked] = useState(false)
  const [leftButtonClicked, setLeftButtonClicked] = useState(false)
  
  const stocksRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollFlagRef = useRef<boolean>(false)

  // Sliding indicator states and refs
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({
    all: null,
    soja: null,
    milho: null,
    algodao: null,
    oleos: null,
    macro: null,
    dolar: null,
    clima: null,
    logistica: null,
    'boi-gordo': null
  })
  const navRef = useRef<HTMLElement>(null)
  const submenuContainerRef = useRef<HTMLDivElement>(null)
  const buttonsContainerRef = useRef<HTMLDivElement>(null)

  // Wave animation state
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(
    () => Array(MENU_ITEMS.length).fill(false)
  )

  // Header scroll optimization with rAF
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const mountedId = requestAnimationFrame(() => {
      document.documentElement.classList.add('hdr-mounted')
    })

    const header = headerRef.current
    if (!header) return () => cancelAnimationFrame(mountedId)

    const cleanup = bindScrollWithRaf((y) => {
      const flag = y > 50
      if (flag !== lastScrollFlagRef.current) {
        lastScrollFlagRef.current = flag
        header.setAttribute('data-scrolled', flag ? 'true' : 'false')
        header.classList.toggle('is-scrolled', flag)
      }
    })

    return () => {
      cleanup()
      cancelAnimationFrame(mountedId)
    }
  }, [])

  // Calcula a posição e tamanho do indicador baseado na aba ativa
  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[activeTab]
    const parent = buttonsContainerRef.current
    if (!btn || !parent) return

    const el = btn as HTMLElement
    const left = el.offsetLeft
    const top = el.offsetTop
    const width = el.offsetWidth
    const height = el.offsetHeight

    setIndicatorStyle(prev => {
      if (
        prev.left === left &&
        prev.top === top &&
        prev.width === width &&
        prev.height === height
      ) return prev
      return { left, top, width, height }
    })
  }, [activeTab])

  // Scheduler com useMemo (otimização de performance)
  const scheduleUpdateIndicator = useMemo(
    () => makeRafScheduler(updateIndicator), 
    [updateIndicator]
  )

  // Wave animation on submenu open/close
  useEffect(() => {
    const STAGGER = 60
    let cancelled = false
    const ids: number[] = []

    const run = () => {
      if (submenuOpen) {
        MENU_ITEMS.forEach((_, i) => {
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[i] = true
                return n
              })
            }
          }, i * STAGGER)
          ids.push(id)
        })
      } else {
        MENU_ITEMS.forEach((_, i) => {
          const j = MENU_ITEMS.length - 1 - i
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[j] = false
                return n
              })
            }
          }, i * STAGGER)
          ids.push(id)
        })
      }
    }

    run()

    return () => {
      cancelled = true
      ids.forEach(clearTimeout)
    }
  }, [submenuOpen])

  // Transition end listener
  useEffect(() => {
    const parent = buttonsContainerRef.current
    if (!parent) return

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== parent) return
      if (e.propertyName === 'max-width' || e.propertyName === 'width' || e.propertyName === 'opacity') {
        scheduleUpdateIndicator()
      }
    }

    parent.addEventListener('transitionend', onEnd)
    return () => parent.removeEventListener('transitionend', onEnd)
  }, [scheduleUpdateIndicator])

  // ResizeObserver
  const roRef = useRef<ResizeObserver | null>(null)
  useEffect(() => {
    const el = buttonsContainerRef.current
    if (!el) return

    if (roRef.current) {
      roRef.current.disconnect()
      roRef.current = null
    }

    roRef.current = new ResizeObserver(() => {
      scheduleUpdateIndicator()
    })

    roRef.current.observe(el)

    return () => {
      if (roRef.current) {
        roRef.current.disconnect()
        roRef.current = null
      }
    }
  }, [scheduleUpdateIndicator])

  // Window resize
  useEffect(() => {
    const onResize = () => scheduleUpdateIndicator()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [scheduleUpdateIndicator])

  // Recalculate when tab or submenu changes
  useEffect(() => {
    scheduleUpdateIndicator()
  }, [activeTab, submenuOpen, scheduleUpdateIndicator])

  // Initial call
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      scheduleUpdateIndicator()
    }))
  }, [scheduleUpdateIndicator])

  // Close submenu on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submenuOpen) {
        setSubmenuOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [submenuOpen])

  return (
    <div className="min-h-screen bg-[#fffffd] flex flex-col">
      {/* Stocks Ticker */}
      <StocksTicker />

      {/* Navigation - Sticky */}
      <header ref={headerRef} className="header-root sticky top-0 z-50 bg-white/95 border-b border-slate-200">
          <div className="site-container">
            {/* Top Row: Logo and Search */}
            <div className="header-top-row flex items-center gap-4 py-4">
              {/* Left Group: Logo + Search */}
              <div className="flex items-center gap-3 flex-1">
                {/* Logo */}
                <Frame3Logo />

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex items-center ml-6">
                  <div className="relative" style={{ width: 'clamp(200px, 22vw, 380px)' }}>
                    <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder=""
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md font-montserrat text-xs text-cyan-950 placeholder:text-slate-400 focus:outline-none focus:border-[#01b792] focus:ring-1 focus:ring-[#01b792] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button - Right */}
              <button 
                className="lg:hidden p-2 hover:bg-slate-100 rounded-md transition-colors flex-shrink-0 ml-auto"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <ICONS.X size={24} /> : <ICONS.Menu size={24} />}
              </button>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:flex items-center gap-1 pb-2 border-t border-slate-100 pt-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat-medium text-[12.5px] uppercase text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-full after:bg-emerald-900 border-r border-slate-100">
                <ICONS.Home size={16} />
                Home
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-red-600 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.Radio size={16} className="text-red-600 animate-pulse" />
                Live Feed
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.FileText size={16} />
                Notícias
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.BarChart3 size={16} />
                Dados & Indicadores
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.Calculator size={16} />
                Valor Quant
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.FileStack size={16} />
                Relatórios 
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
                <ICONS.Shield size={16} />
                Risk Management
              </a>
              <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                <ICONS.Newspaper size={16} />
                Valor Trading School
              </a>
            </nav>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white">
              <div className="px-4 py-4 flex flex-col gap-2">
                <div className="relative mb-2">
                  <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar notícias, commoditie"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md font-montserrat text-sm text-cyan-950 placeholder:text-slate-400 focus:outline-none focus:border-[#01b792] focus:ring-1 focus:ring-[#01b792] transition-colors"
                  />
                </div>
                
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md bg-slate-100 font-montserrat-medium text-sm text-cyan-950">
                  <ICONS.Home size={18} />
                  Home
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.Radio size={18} />
                  Live Feed
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.FileText size={18} />
                  News
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.BarChart3 size={18} />
                  Data & Indicators
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.Calculator size={18} />
                  Valor Quant
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.FileStack size={18} />
                  Reports
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.Shield size={18} />
                  Risk Management
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
                  <ICONS.Newspaper size={18} />
                  Weekend Edition
                </a>
              </div>
            </div>
          )}
        </header>

      <main className="flex-1">
        {/* Category Tabs */}
        <section className="site-container py-6">
          <div ref={submenuContainerRef} className="flex items-center gap-3 -mt-2">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => {
                setSubmenuOpen(!submenuOpen)
                if (!hasOpenedSubmenu) {
                  setHasOpenedSubmenu(true)
                }
              }}
              className="group relative flex-shrink-0 p-2 transition-all hover:bg-slate-100/50 rounded-lg -mt-1"
              aria-label={submenuOpen ? 'Fechar filtros' : 'Abrir filtros'}
              aria-expanded={submenuOpen}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span 
                  className={`absolute h-[1.5px] w-5 bg-cyan-950 rounded-full transition-all duration-300 ${
                    submenuOpen ? 'rotate-90 -translate-x-1.5' : '-translate-y-1.5'
                  }`}
                />
                <span 
                  className={`absolute h-[1.5px] w-5 bg-cyan-950 rounded-full transition-all duration-300 ${
                    submenuOpen ? 'rotate-90' : ''
                  }`}
                />
                <span 
                  className={`absolute h-[1.5px] w-5 bg-cyan-950 rounded-full transition-all duration-300 ${
                    submenuOpen ? 'rotate-90 translate-x-1.5' : 'translate-y-1.5'
                  }`}
                />
              </div>
              {!submenuOpen && !hasOpenedSubmenu && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#01b792] rounded-full border border-white animate-pulse"></span>
              )}
            </button>

            {/* Inline Wave Submenu */}
            <div 
              className="relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.25,.8,.25,1)]"
              style={{
                maxWidth: submenuOpen ? '1000px' : '0px',
                width: submenuOpen ? 'fit-content' : '0px',
                opacity: submenuOpen ? 1 : 0,
              }}
            >
              <nav 
                ref={navRef}
                className="relative bg-gradient-to-br from-slate-100/90 via-blue-50/80 to-cyan-50/90 backdrop-blur-xl rounded-[10px] shadow-none border-0 inline-block"
              >
                <div 
                  className="relative overflow-x-auto overflow-y-hidden border-0 shadow-none [-webkit-overflow-scrolling:touch]"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  <div ref={buttonsContainerRef} className="relative flex items-center gap-2 flex-nowrap px-3 py-1 overflow-x-auto scrollbar-hide">
                    {/* Animated sliding indicator */}
                    <div 
                      className="absolute rounded-lg bg-white/95 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/80 backdrop-blur-md pointer-events-none"
                      style={{
                        left: indicatorStyle.left,
                        top: indicatorStyle.top,
                        width: indicatorStyle.width,
                        height: indicatorStyle.height,
                        transition: 'all 0.35s cubic-bezier(.34,1.56,.64,1)',
                        opacity: submenuOpen ? 1 : 0,
                      }}
                    />
                    
                    {MENU_ITEMS.map((item, index) => (
                      <TactileButton 
                        key={item.id}
                        ref={(el) => { tabRefs.current[item.id] = el }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTab(item.id)
                        }}
                        className={`relative inline-flex items-center justify-center gap-1 h-[24px] px-2.5 rounded-lg font-montserrat-medium whitespace-nowrap flex-shrink-0 ${
                          activeTab === item.id 
                            ? 'text-cyan-950' 
                            : 'text-gray-600 hover:text-cyan-950'
                        }`}
                        style={{
                          opacity: itemsVisible[index] ? 1 : 0,
                          transform: itemsVisible[index] 
                            ? 'translateY(0) scale(1)'
                            : 'translateY(6px) scale(0.98)',
                          transition: 'all 280ms cubic-bezier(.25,.8,.25,1)',
                        }}
                      >
                        {'iconPath' in item && item.iconPath && (
                          <svg className="w-3.5 h-3.5 block" fill="none" viewBox="0 0 24 24">
                            <path 
                              clipRule="evenodd" 
                              d={item.iconPath} 
                              fill="currentColor" 
                              fillRule="evenodd" 
                            />
                          </svg>
                        )}
                        
                        {'icon' in item && item.icon && (
                          <item.icon className="w-3.5 h-3.5 block" />
                        )}
                        
                        <span className="block !text-[12px] !leading-[1.1]">{item.label}</span>
                      </TactileButton>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="site-container pb-8 -mt-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Feed */}
            <div className="flex-1">
              {/* Featured Article */}
              <FeaturedCard />

              {/* News Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {NEWS_ARTICLES.map((article, i) => (
                  <NewsCard key={i} article={article} />
                ))}
              </div>

              {/* Most Read Section */}
              <section className="bg-slate-100 rounded-xl card-border shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat-semibold text-2xl text-cyan-950">Mais lidas do mes</h2>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 rounded transition-colors">
                    <ICONS.ChevronRight className="w-6 h-6 text-cyan-950" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <article key={i} className="bg-white rounded-lg card-border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-1 mb-4">
                        <h3 className="font-montserrat-medium text-[16px] md:text-[18px] text-cyan-950 line-clamp-2">Trump Announces Reopening of US Economy</h3>
                        <p className="font-montserrat text-xs text-cyan-950 line-clamp-3">Collaborative efforts in space exploration achieve a major breakthrough...</p>
                        <span className="px-2.5 py-0.5 border border-slate-200 rounded-full text-cyan-950 text-xs font-montserrat-semibold self-start">Dólar</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-montserrat text-xs text-slate-500">09 jan 2025</span>
                        <div className="flex gap-2">
                          <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.p302ae540} fill="#083344" fillRule="evenodd" />
                            </svg>
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                              <g>
                                <path d={svgPaths.p2ea4ddf0} fill="#083344" />
                                <path d={svgPaths.pcf00cc0} fill="#083344" />
                                <path clipRule="evenodd" d={svgPaths.p34593b80} fill="#083344" fillRule="evenodd" />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-[344px] space-y-4">
              {/* Personalized Card */}
              <div className="bg-white rounded-xl card-border shadow-sm overflow-hidden personalized-card relative">
                <div className={`${greetingExpanded ? 'p-6 pb-8 space-y-5' : 'p-6 pb-8'}`}>
                  {/* Saudação */}
                  {greetingHasBeenToggled.current ? (
                    <AnimatePresence mode="wait">
                      {greetingExpanded && (
                        <motion.div
                          key="greeting-card"
                          className="relative rounded-lg p-4 overflow-hidden mb-5"
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: 'auto',
                            marginBottom: '1.25rem'
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0, 
                            marginBottom: 0
                          }}
                          transition={{ 
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/35 border border-emerald-100/30"></div>
                          
                          <div className="relative z-10">
                            <motion.p 
                              className="font-montserrat-semibold title text-cyan-950 mb-3"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: 0.1, duration: 0.25 }}
                            >
                              Boa tarde, Alex Monteiro
                            </motion.p>
                            <motion.p 
                              className="font-montserrat lead leading-relaxed" 
                              style={{ fontSize: '10px', lineHeight: '1.8' }}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: 0.15, duration: 0.25 }}
                            >
                              • Bolsas sobem com possibilidade de acordo China e EUA<br/>
                              • Soja dispara na CBOT e atinge máximas de 5 meses<br/>
                              • Prêmios no Brasil recuam com maior pressão de fixações<br/>
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ) : (
                    greetingExpanded && (
                      <div className="relative rounded-lg p-4 overflow-hidden mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/35 border border-emerald-100/30"></div>
                        
                        <div className="relative z-10">
                          <p className="font-montserrat-semibold title text-cyan-950 mb-3">
                            Boa tarde, Alex Monteiro
                          </p>
                          <p 
                            className="font-montserrat lead leading-relaxed" 
                            style={{ fontSize: '10px', lineHeight: '1.8' }}
                          >
                            • Bolsas sobem com possibilidade de acordo China e EUA<br/>
                            • Soja dispara na CBOT e atinge máximas de 5 meses<br/>
                            • Prêmios no Brasil recuam com maior pressão de fixações<br/>
                          </p>
                        </div>
                      </div>
                    )
                  )}

                  {/* Separador Estilizado com Botão */}
                  <AnimatePresence>
                    {(greetingExpanded || showExpandButton) && (
                      <motion.div
                        key="separator-button"
                        className="relative py-2 flex items-center justify-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="absolute inset-0 flex items-center">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                        </div>
                        <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          greetingHasBeenToggled.current = true
                          setGreetingExpanded(!greetingExpanded)
                          setShowExpandButton(false)
                        }}
                          className="relative z-10 bg-white border border-slate-300 rounded-full p-0.5"
                          aria-label={greetingExpanded ? 'Minimizar saudação' : 'Expandir saudação'}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AnimatePresence mode="wait">
                            {greetingExpanded ? (
                              <motion.div
                                key="chevron-up"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ICONS.ChevronUp size={12} className="text-slate-600" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="chevron-down"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ICONS.ChevronDown size={12} className="text-slate-600" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Área de hover para mostrar botão quando minimizado */}
                  {!greetingExpanded && (
                    <div 
                      className="absolute top-0 left-0 right-0 h-10 z-20 cursor-pointer"
                      onMouseEnter={() => setShowExpandButton(true)}
                      onMouseLeave={() => setShowExpandButton(false)}
                      onClick={() => {
                        greetingHasBeenToggled.current = true
                        setGreetingExpanded(true)
                        setShowExpandButton(false)
                      }}
                    />
                  )}

                  {/* Widget de Cotações - Renderizado com animação suave */}
                  <motion.div 
                    className="mt-2 relative z-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                  >
                    <motion.div 
                      className="flex items-center justify-between gap-2 mb-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                    >
                      <motion.h2 
                        className="cursor-default flex-shrink-0" 
                        style={{ 
                          fontSize: '13px',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          color: 'rgb(100, 116, 139)',
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                      >
                        Monitor de Mercado Diário
                      </motion.h2>
                      
                      <motion.div 
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
                      >
                        <motion.div 
                          className="flex items-center justify-center bg-white border border-slate-300 rounded-md px-2.5 py-0.5 min-w-[85px]"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                        >
                          <motion.span
                            key={selectedMarketCategory}
                            style={{
                              fontFamily: 'Montserrat, sans-serif',
                              fontSize: '10px',
                              fontWeight: 600,
                              color: 'rgb(100, 116, 139)',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {selectedMarketCategory === 'agricolas' && 'Agrícolas'}
                            {selectedMarketCategory === 'metalicas' && 'Metálicas'}
                            {selectedMarketCategory === 'indices' && 'Índices'}
                            {selectedMarketCategory === 'fx' && 'FX'}
                          </motion.span>
                        </motion.div>
                        
                        <motion.button
                          onClick={() => {
                            const categories = ['agricolas', 'metalicas', 'indices', 'fx'] as const
                            const currentIndex = categories.indexOf(selectedMarketCategory)
                            const nextIndex = (currentIndex + 1) % categories.length
                            setSelectedMarketCategory(categories[nextIndex])
                          }}
                          className="bg-white border border-slate-300 rounded-full p-0.5 flex-shrink-0"
                          aria-label="Próxima categoria de mercado"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                        >
                          <ICONS.ChevronRight size={12} className="text-slate-600" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="mb-3 h-[1px] w-full"
                      style={{
                        background: 'linear-gradient(to right, rgb(148, 163, 184) 0%, rgb(203, 213, 225) 60%, rgb(226, 232, 240) 85%, transparent 100%)'
                      }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                    >
                      <MarketWidget category={selectedMarketCategory} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Latest News Feed - Desktop Only */}
              <div className="hidden lg:block h-[600px]">
                <Card />
              </div>

              {/* Events Calendar - Desktop Only */}
              <div className="hidden lg:block h-[600px]">
                <EventsCalendar />
              </div>

              {/* Latest News Feed - Mobile/Tablet Only */}
              <div className="lg:hidden bg-white rounded-xl card-border shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-montserrat-semibold text-base text-cyan-950">Últimas</h3>
                  <select className="px-3 py-2 bg-white border border-slate-200 rounded text-sm font-montserrat">
                    <option>Todas</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <article key={i} className="bg-white rounded-lg card-border shadow-sm p-4">
                      <h4 className="font-montserrat-medium text-[16px] md:text-[18px] text-cyan-950 line-clamp-2 mb-2">South Africa Reaches Peak of Coronavirus Outbreak</h4>
                      <p className="font-montserrat text-xs text-cyan-950 line-clamp-2 mb-2">Global sporting events foster unity as nations come together...</p>
                      <span className="px-2.5 py-0.5 border border-slate-200 rounded-full text-cyan-950 text-xs font-montserrat-semibold inline-block mb-2">Dólar</span>
                      <div className="flex items-center justify-between">
                        <span className="font-montserrat text-xs text-slate-500">09 jan 2025</span>
                        <div className="flex gap-2">
                          <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.p302ae540} fill="#083344" fillRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#073a47] text-slate-50 border-t-2 border-[#01b792]/20 animate-fade-in">
        <div className="site-container pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <a href="#" className="text-2xl mb-4 inline-block group">
                <span className="font-sora text-[#01b792] transition-all duration-300 group-hover:text-[#00bfa5]">valor</span>
                <span className="font-sora font-semibold text-slate-100">news</span>
              </a>
              <p className="font-montserrat text-sm text-slate-400 leading-relaxed max-w-xs mt-4">
                Análises precisas e notícias em tempo real sobre commodities e mercados financeiros.
              </p>
            </div>
            
            {/* Navigation Column */}
            <div>
              <h3 className="font-montserrat-semibold text-slate-100 mb-4">Navegação</h3>
              <ul className="space-y-2.5 font-montserrat text-sm">
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Home</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Commodities</a></li>
                <li className="pl-4">
                  <ul className="space-y-2 mt-2">
                    <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Soja</a></li>
                    <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Milho</a></li>
                    <li><a href="#" className="text-slate-500 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">→ Trigo</a></li>
                  </ul>
                </li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Análises</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Mercado Global</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Live Feed</a></li>
              </ul>
            </div>
            
            {/* Institutional Column */}
            <div>
              <h3 className="font-montserrat-semibold text-slate-100 mb-4">Institucional</h3>
              <ul className="space-y-2.5 font-montserrat text-sm">
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Sobre Nós</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Contato</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">FAQ</a></li>
                <li className="mt-4">
                  <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-[#01b792]/10 hover:bg-[#01b792]/20 border border-[#01b792]/30 rounded-md font-montserrat-medium text-[#01b792] transition-all duration-200 hover:scale-105">
                    Assine o Pro
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Legal & Social Column */}
            <div>
              <h3 className="font-montserrat-semibold text-slate-100 mb-4">Legal</h3>
              <ul className="space-y-2.5 font-montserrat text-sm mb-6">
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Termos de Uso</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Política de Privacidade</a></li>
                <li><a href="#" className="text-slate-400 hover:text-[#01b792] transition-all duration-200 hover:translate-x-1 inline-block">Política de Cookies</a></li>
              </ul>
              
              <div className="mt-8">
                <h4 className="font-montserrat-medium text-sm text-slate-300 mb-3">Redes Sociais</h4>
                <div className="flex gap-3">
                  {['facebook', 'x', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="w-9 h-9 flex items-center justify-center border border-slate-600 rounded-md hover:border-[#01b792] hover:bg-[#01b792]/10 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#01b792]/20"
                      aria-label={social}
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-4 h-4 bg-slate-400 rounded"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-montserrat text-sm text-slate-400 opacity-60">
              © 2025 Valornews. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 font-montserrat text-xs text-slate-500">
              <a href="#" className="hover:text-[#01b792] transition-colors">Mapa do Site</a>
              <a href="#" className="hover:text-[#01b792] transition-colors">Acessibilidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

