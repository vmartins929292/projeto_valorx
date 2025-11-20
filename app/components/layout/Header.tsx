'use client'

import { useState, useRef } from 'react'
import { ICONS } from '../../icons'
import Frame3Logo from '../legacy/Frame3Logo'
import { useScrollHeader } from '../../hooks/useScrollHeader'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  useScrollHeader(headerRef)

  return (
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
          {/* 🔧 AQUI: adicionado after:left-0 para o sublinhado ficar no botão certo */}
          <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
            <ICONS.FileText size={16} />
            Notícias
          </a>
          <a href="#" className="relative flex items-center gap-2 px-3 py-2 font-montserrat text-[12.5px] uppercase text-slate-500 hover:text-cyan-950 hover:bg-slate-50 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-0 after:bg-emerald-900 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full border-r border-slate-100">
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
                placeholder="Buscar notícias, commodities"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md font-montserrat text-sm text-cyan-950 placeholder:text-slate-400 focus:outline-none focus:border-[#01b792] focus:ring-1 focus:ring-[#01b792] transition-colors"
              />
            </div>
            
            {/* Mesmos menus do desktop, mesma ordem */}
            <a className="flex items-center gap-3 px-4 py-3 rounded-md bg-slate-100 font-montserrat-medium text-sm text-cyan-950">
              <ICONS.Home size={18} />
              Home
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.Radio size={18} className="text-red-600" />
              Live Feed
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.FileText size={18} />
              Notícias
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.BarChart3 size={18} />
              Dados & Indicadores
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.Calculator size={18} />
              Valor Quant
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.FileStack size={18} />
              Relatórios
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.Shield size={18} />
              Risk Management
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-md font-montserrat text-sm text-slate-600 hover:bg-slate-50">
              <ICONS.Newspaper size={18} />
              Valor Trading School
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

