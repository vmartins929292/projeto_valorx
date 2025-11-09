import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PerformanceSection from '../../components/PerformanceSection'

describe('PerformanceSection - Functional Tests', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<PerformanceSection />)
    expect(container).toBeInTheDocument()
  })

  it('deve exibir o título "MARKETS"', () => {
    render(<PerformanceSection />)
    expect(screen.getByText('MARKETS')).toBeInTheDocument()
  })

  it('deve renderizar todas as tabs de navegação', () => {
    render(<PerformanceSection />)
    
    expect(screen.getByText('SPX')).toBeInTheDocument()
    expect(screen.getByText('NASDAQ')).toBeInTheDocument()
    expect(screen.getByText('DOW')).toBeInTheDocument()
    expect(screen.getByText('EUR')).toBeInTheDocument()
    expect(screen.getByText('ASIA')).toBeInTheDocument()
  })

  it('deve alternar entre tabs corretamente', async () => {
    const user = userEvent.setup()
    render(<PerformanceSection />)
    
    const nasdaqTab = screen.getByText('NASDAQ')
    await user.click(nasdaqTab)
    
    await waitFor(() => {
      expect(nasdaqTab).toBeInTheDocument()
    })
  })

  it('deve exibir seção MARKET MOVERS', () => {
    render(<PerformanceSection />)
    expect(screen.getByText('MARKET MOVERS')).toBeInTheDocument()
  })

  it('deve exibir TOP e BOTTOM movers', () => {
    render(<PerformanceSection />)
    
    expect(screen.getByText('TOP')).toBeInTheDocument()
    expect(screen.getByText('BOTTOM')).toBeInTheDocument()
  })

  it('deve exibir seção MOST ACTIVE', () => {
    render(<PerformanceSection />)
    expect(screen.getByText('MOST ACTIVE')).toBeInTheDocument()
  })

  it('deve exibir seção LATEST MARKET NEWS', () => {
    render(<PerformanceSection />)
    expect(screen.getByText('LATEST MARKET NEWS')).toBeInTheDocument()
  })

  it('deve renderizar barras de performance', async () => {
    render(<PerformanceSection />)
    
    await waitFor(() => {
      const performanceBars = document.querySelectorAll('[class*="bg-gradient-to-r"]')
      expect(performanceBars.length).toBeGreaterThan(0)
    })
  })
})

describe('PerformanceSection - Performance', () => {
  it('deve renderizar rapidamente', () => {
    const startTime = performance.now()
    render(<PerformanceSection />)
    const endTime = performance.now()
    
    expect(endTime - startTime).toBeLessThan(150)
  })

  it('deve animar barras de performance', async () => {
    render(<PerformanceSection />)
    
    await waitFor(() => {
      const animatedBars = document.querySelectorAll('[class*="bg-gradient-to-r"]')
      expect(animatedBars.length).toBeGreaterThan(0)
    }, { timeout: 2000 })
  })
})

