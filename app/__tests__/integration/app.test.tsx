import { render, screen, waitFor } from '@testing-library/react'
import { jest } from '@jest/globals'
import App from '../../components/App'

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

describe('App - Integration Tests', () => {
  it('deve renderizar todos os componentes principais', async () => {
    render(<App />)
    
    await waitFor(() => {
      // Verifica se componentes principais estão presentes
      expect(screen.getByText(/Mais lidas/i)).toBeInTheDocument()
      expect(screen.getByText(/Performance dos Mercados/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('deve renderizar header e navegação', () => {
    render(<App />)
    
    // Verifica se há elementos de navegação
    const navigation = screen.queryByRole('navigation')
    expect(navigation || document.querySelector('header')).toBeTruthy()
  })

  it('deve renderizar sidebar', () => {
    render(<App />)
    
    // Verifica se há sidebar (aside element)
    const sidebar = document.querySelector('aside')
    expect(sidebar).toBeInTheDocument()
  })

  it('deve renderizar footer', () => {
    render(<App />)
    
    // Verifica se há footer
    const footer = document.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('deve ter layout responsivo', () => {
    const { container } = render(<App />)
    
    // Verifica estrutura de grid/flex
    const mainContent = container.querySelector('.flex.flex-col.lg\\:flex-row')
    expect(mainContent).toBeInTheDocument()
  })
})

describe('App - Performance Integration', () => {
  it('deve carregar todos os componentes em menos de 500ms', async () => {
    const startTime = performance.now()
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByText(/Mais lidas/i)).toBeInTheDocument()
    }, { timeout: 1000 })
    
    const endTime = performance.now()
    expect(endTime - startTime).toBeLessThan(500)
  })

  it('não deve ter erros de console', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    
    render(<App />)
    
    expect(consoleError).not.toHaveBeenCalled()
    expect(consoleWarn).not.toHaveBeenCalled()
    
    consoleError.mockRestore()
    consoleWarn.mockRestore()
  })
})

