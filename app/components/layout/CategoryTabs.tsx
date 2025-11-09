'use client'

import { useState, useRef, useEffect } from 'react'
import TactileButton from '../TactileButton'
import { MENU_ITEMS } from '../../data'
import { useTabIndicator } from '../../hooks/useTabIndicator'
import { useWaveAnimation } from '../../hooks/useWaveAnimation'
import svgPaths from '../legacy/svg-9po0gahbk9'

interface CategoryTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function CategoryTabs({ activeTab, setActiveTab }: CategoryTabsProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [hasOpenedSubmenu, setHasOpenedSubmenu] = useState(false)
  const submenuContainerRef = useRef<HTMLDivElement>(null)
  const buttonsContainerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const { indicatorStyle, tabRefs } = useTabIndicator(activeTab, buttonsContainerRef, submenuOpen)
  const itemsVisible = useWaveAnimation(MENU_ITEMS.length, submenuOpen)

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
  )
}

