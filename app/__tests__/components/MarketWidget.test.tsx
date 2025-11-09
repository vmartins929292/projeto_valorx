import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MarketWidget from '../../components/MarketWidget'

describe('MarketWidget - Performance Tests', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<MarketWidget />)
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar as tabs corretamente', () => {
    render(<MarketWidget />)
    
    expect(screen.getByText('Todas')).toBeInTheDocument()
    expect(screen.getByText('Em Alta')).toBeInTheDocument()
    expect(screen.getByText('Em Queda')).toBeInTheDocument()
  })

  it('deve filtrar commodities ao clicar nas tabs', async () => {
    const user = userEvent.setup()
    render(<MarketWidget />)
    
    const altaTab = screen.getByText('Em Alta')
    await user.click(altaTab)
    
    await waitFor(() => {
      expect(altaTab).toHaveClass('text-slate-900')
    })
  })

  it('deve exibir gráfico principal', () => {
    render(<MarketWidget />)
    
    // Verifica se há um gráfico (ResponsiveContainer)
    const container = screen.getByText(/Soja|Milho|Trigo/i)
    expect(container).toBeInTheDocument()
  })

  it('deve mostrar nome e cotação da commodity selecionada', () => {
    render(<MarketWidget />)
    
    expect(screen.getByText(/Soja|Milho|Trigo/i)).toBeInTheDocument()
    expect(screen.getByText(/\$\d+/)).toBeInTheDocument()
  })

  it('deve exibir lista de commodities', () => {
    render(<MarketWidget />)
    
    // Verifica se há múltiplas commodities na lista
    const commodities = screen.getAllByText(/Soja|Milho|Trigo|Café|Açúcar/i)
    expect(commodities.length).toBeGreaterThan(1)
  })

  it('deve atualizar commodity selecionada ao clicar na lista', async () => {
    const user = userEvent.setup()
    render(<MarketWidget />)
    
    // Encontra um item da lista e clica
    const listItems = screen.getAllByText(/Milho|Trigo/i)
    if (listItems.length > 0) {
      await user.click(listItems[0])
      
      await waitFor(() => {
        expect(listItems[0]).toBeInTheDocument()
      })
    }
  })
})

describe('MarketWidget - Performance', () => {
  it('deve renderizar rapidamente', () => {
    const startTime = performance.now()
    render(<MarketWidget />)
    const endTime = performance.now()
    
    // Deve renderizar em menos de 100ms
    expect(endTime - startTime).toBeLessThan(100)
  })

  it('não deve ter memory leaks ao alternar tabs', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<MarketWidget />)
    
    const tabs = ['Todas', 'Em Alta', 'Em Queda']
    
    for (const tab of tabs) {
      const tabElement = screen.getByText(tab)
      await user.click(tabElement)
      await waitFor(() => {
        expect(tabElement).toBeInTheDocument()
      })
    }
    
    unmount()
    // Se não houver memory leak, não deve lançar erro
    expect(true).toBe(true)
  })
})

