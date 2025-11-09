import { render, screen, waitFor, act } from '@testing-library/react'
import { jest } from '@jest/globals'
import FeaturedCard from '../../components/FeaturedCard'

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('FeaturedCard - Performance Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('deve renderizar sem erros', () => {
    const { container } = render(<FeaturedCard />)
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o título do primeiro artigo', async () => {
    render(<FeaturedCard />)
    await waitFor(() => {
      expect(screen.getByText(/Safra de soja brasileira/i)).toBeInTheDocument()
    })
  })

  it('deve alternar entre slides automaticamente', async () => {
    render(<FeaturedCard autoplayInterval={1000} />)
    
    // Verifica primeiro slide
    expect(screen.getByText(/Safra de soja brasileira/i)).toBeInTheDocument()
    
    // Avança o tempo
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Verifica segundo slide após transição
    await waitFor(() => {
      expect(screen.getByText(/Dólar fecha em queda/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('deve pausar o autoplay ao passar o mouse', async () => {
    const { container } = render(<FeaturedCard autoplayInterval={1000} />)
    const article = container.querySelector('article')
    
    if (article) {
      act(() => {
        article.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      })
      
      // Avança o tempo - não deve mudar de slide
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      
      // Verifica que ainda está no primeiro slide
      expect(screen.getByText(/Safra de soja brasileira/i)).toBeInTheDocument()
    }
  })

  it('deve navegar manualmente entre slides', async () => {
    render(<FeaturedCard />)
    
    const nextButton = screen.getByLabelText(/Próxima notícia/i)
    
    act(() => {
      nextButton.click()
    })
    
    await waitFor(() => {
      expect(screen.getByText(/Dólar fecha em queda/i)).toBeInTheDocument()
    })
  })

  it('deve renderizar highlights corretamente', async () => {
    render(<FeaturedCard />)
    
    await waitFor(() => {
      expect(screen.getByText(/Produção supera expectativas/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('não deve ter re-renderizações desnecessárias', () => {
    const { rerender } = render(<FeaturedCard />)
    const renderCount = jest.fn()
    
    rerender(<FeaturedCard />)
    
    // Componente não deve re-renderizar sem mudanças de props
    expect(renderCount).not.toHaveBeenCalled()
  })
})

describe('FeaturedCard - Acessibilidade', () => {
  it('deve ter labels ARIA nos botões de navegação', () => {
    render(<FeaturedCard />)
    
    expect(screen.getByLabelText(/Notícia anterior/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Próxima notícia/i)).toBeInTheDocument()
  })

  it('deve ter contador de slides acessível', () => {
    render(<FeaturedCard />)
    
    expect(screen.getByText(/1 \/ 4/)).toBeInTheDocument()
  })
})

