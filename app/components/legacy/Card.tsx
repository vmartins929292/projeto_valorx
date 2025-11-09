'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICONS } from '../../icons'

// Componente principal que exporta o card "Últimas"
function Col() {
  const items = [
    { time: '14:32', date: '10 jan', title: 'Bolsa sobe 2,3% com expectativa de acordo comercial', category: 'Mercados', excerpt: 'Principais índices registram forte alta após declarações positivas sobre negociações comerciais entre grandes economias.' },
    { time: '13:15', date: '10 jan', title: 'Dólar cai para R$ 5,87 em dia de otimismo', category: 'Câmbio', excerpt: 'Moeda americana recua frente ao real impulsionada por entrada de capital estrangeiro no mercado.' },
    { time: '11:48', date: '10 jan', title: 'Petróleo sobe 3% após corte na produção', category: 'Commodities', excerpt: 'Cotação do barril atinge maior valor em três meses com anúncio de redução na oferta.' },
    { time: '10:25', date: '10 jan', title: 'Banco Central mantém taxa Selic em 10,75%', category: 'Economia', excerpt: 'Copom decide por unanimidade pela manutenção da taxa básica de juros, conforme esperado pelo mercado.' },
    { time: '09:03', date: '10 jan', title: 'Safra de soja deve atingir recorde em 2025', category: 'Agrícola', excerpt: 'Estimativas apontam para produção de 165 milhões de toneladas, superando temporada anterior.' },
    { time: '16:45', date: '09 jan', title: 'Vale anuncia dividendos extraordinários', category: 'Empresas', excerpt: 'Mineradora divulga pagamento de R$ 2,5 bilhões em proventos aos acionistas.' },
    { time: '15:20', date: '09 jan', title: 'Inflação acelera para 0,52% em dezembro', category: 'Economia', excerpt: 'IPCA registra alta acima das expectativas, puxado por alimentos e combustíveis.' },
    { time: '14:10', date: '09 jan', title: 'Mercado de ouro bate recorde histórico', category: 'Metais', excerpt: 'Metal precioso ultrapassa US$ 2.100 a onça em meio a incertezas geopolíticas.' },
    { time: '12:55', date: '09 jan', title: 'China reduz taxa de juros em 0,25%', category: 'Internacional', excerpt: 'Banco central chinês busca estimular economia com corte na taxa básica de empréstimos.' },
    { time: '11:30', date: '09 jan', title: 'Startup brasileira capta US$ 50 milhões', category: 'Tecnologia', excerpt: 'Fintech anuncia nova rodada de investimentos liderada por fundos internacionais.' }
  ]

  return (
    <div className="px-4 py-0 w-full">
      <div className="">
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              relative pl-20 py-4
              ${index !== items.length - 1 ? 'border-b border-slate-100' : ''}
              ${index === 0 ? 'mt-5' : ''}
            `}
          >
            {/* Linha vertical - continua até o próximo item */}
            {index < items.length - 1 && (
              <div className="absolute left-[52px] top-6 bottom-0 w-[1px] bg-slate-200" />
            )}
            
            {/* Timestamp e marcador */}
            <div className="absolute left-0 top-0 flex items-start gap-2">
              <div className="text-right" style={{ width: '40px' }}>
                <div className={`font-montserrat-semibold ${index === 0 ? 'text-red-600' : 'text-cyan-950'}`} style={{ fontSize: '11px', lineHeight: '1.2' }}>
                  {item.time}
                </div>
                <div className={`font-montserrat ${index === 0 ? 'text-red-600' : 'text-slate-500'}`} style={{ fontSize: '9px', lineHeight: '1.2', marginTop: '2px' }}>
                  {item.date}
                </div>
              </div>
              {/* Círculo marcador */}
              <div className="relative flex-shrink-0" style={{ marginTop: '2px' }}>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-cyan-950" />
                {index === 0 && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-950 animate-ping opacity-30" />
                )}
              </div>
            </div>

            {/* Conteúdo da notícia */}
            <div className="group cursor-pointer">
              <h3
                className="font-montserrat-semibold text-cyan-950 mb-1.5 group-hover:text-[#2a9d8f] transition-colors"
                style={{ fontSize: '13px', lineHeight: '1.3' }}
              >
                {item.title}
              </h3>
              <p className="font-montserrat text-slate-600" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Wrapper com scrollbar customizada
function Tbody() {
  return (
    <div 
      className="content-stretch flex-none items-start max-h-[600px] overflow-y-auto overflow-x-clip relative w-full z-[1]
                [&::-webkit-scrollbar]:w-[6px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[3px]
                [&::-webkit-scrollbar-thumb]:transition-all [&::-webkit-scrollbar-thumb]:duration-300
                hover:[&::-webkit-scrollbar-thumb]:bg-[#065f46]/75"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.scrollbarColor = 'rgba(6, 95, 70, 0.75) transparent';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.scrollbarColor = 'transparent transparent';
      }}
      data-name="Tbody"
    >
      <Col />
    </div>
  )
}

// Select de filtro customizado
function Select1() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('todas')
  const selectRef = useRef<HTMLDivElement>(null)

  const options = [
    { value: 'todas', label: 'Todas' },
    { value: 'mercados', label: 'Mercados' },
    { value: 'economia', label: 'Economia' },
    { value: 'commodities', label: 'Commodities' }
  ]

  const selectedOption = options.find(opt => opt.value === selectedValue) || options[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative z-[100]" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-[130px] h-9 text-xs bg-white border border-slate-200 rounded-lg px-4 py-2 font-montserrat-semibold text-cyan-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#01b792] cursor-pointer transition-all duration-300 hover:border-[#01b792]/50 hover:shadow-lg hover:shadow-[#01b792]/10 flex items-center justify-between"
        style={{
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        }}
      >
        <span>{selectedOption.label}</span>
        <ICONS.ChevronDown 
          size={14} 
          className={`text-cyan-950 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-1 w-[130px] rounded-lg shadow-xl overflow-hidden backdrop-blur-md pointer-events-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
              zIndex: 10000,
              position: 'absolute',
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedValue(option.value)
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-montserrat-medium transition-all duration-200 text-cyan-950 hover:text-cyan-950"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(4, 120, 87, 0.15)'
                  e.currentTarget.style.color = '#047857'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.color = '#083344'
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Header com título "Últimas" e botão de filtro
function Row() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col font-montserrat-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-red-600 text-nowrap">
        <p className="leading-[24px] whitespace-pre">Últimas</p>
      </div>
      <ICONS.ChevronRight size={16} className="text-red-600" />
    </div>
  )
}

function Div() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Div">
      <div className="content-stretch flex items-center justify-between pb-3 pt-4 px-5 relative w-full 
                      bg-gradient-to-b from-white to-white/95
                      border-b border-slate-100/80
                      backdrop-blur-sm
                      shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_16px_-8px_rgba(8,51,68,0.08)]
                      transition-all duration-300
                      hover:shadow-[0_1px_3px_rgba(0,0,0,0.03),0_12px_20px_-8px_rgba(8,51,68,0.12)]">
        <Row />
        <Select1 />
      </div>
    </div>
  )
}

// Card principal exportado
export default function Card() {
  return (
    <div className="bg-white relative rounded-[12px]" data-name="Card">
      <div className="content-stretch flex flex-col isolate items-start relative rounded-[inherit] w-full pb-4">
        <Div />
        <div className="w-full px-0">
          <Tbody />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]" />
    </div>
  )
}

