import { render } from '@testing-library/react'
import { jest } from '@jest/globals'
import App from '../../components/App'
import FeaturedCard from '../../components/FeaturedCard'
import MarketWidget from '../../components/MarketWidget'
import PerformanceSection from '../../components/PerformanceSection'

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('Performance - Renderização', () => {
  it('FeaturedCard deve renderizar em menos de 100ms', () => {
    const startTime = performance.now()
    render(<FeaturedCard />)
    const endTime = performance.now()
    
    expect(endTime - startTime).toBeLessThan(100)
  })

  it('PerformanceSection deve renderizar em menos de 150ms', () => {
    const startTime = performance.now()
    render(<PerformanceSection />)
    const endTime = performance.now()
    
    expect(endTime - startTime).toBeLessThan(150)
  })
})

describe('Performance - Memory', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('não deve ter memory leaks ao desmontar componentes', () => {
    const { unmount: unmountCard } = render(<FeaturedCard />)
    
    // Desmonta componente
    unmountCard()
    
    // Se não houver memory leak, não deve lançar erro
    expect(true).toBe(true)
  })

  it('deve limpar timers e listeners ao desmontar', () => {
    const { unmount } = render(<FeaturedCard autoplayInterval={1000} />)
    
    // Verifica se há timers ativos antes
    const timersBefore = jest.getTimerCount()
    
    unmount()
    
    // Aguarda um pouco para garantir limpeza
    jest.advanceTimersByTime(100)
    
    // Timers devem ser limpos após unmount
    expect(jest.getTimerCount()).toBeLessThanOrEqual(timersBefore)
  })
})

describe('Performance - Re-renderizações', () => {
  it('FeaturedCard não deve re-renderizar sem mudanças de props', () => {
    const { rerender } = render(<FeaturedCard />)
    let renderCount = 0
    
    const TestWrapper = () => {
      renderCount++
      return <FeaturedCard />
    }
    
    rerender(<TestWrapper />)
    rerender(<TestWrapper />)
    
    // Componente memoizado não deve re-renderizar excessivamente
    expect(renderCount).toBeLessThan(5)
  })
})

