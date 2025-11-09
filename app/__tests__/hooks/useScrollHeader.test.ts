import { renderHook, act } from '@testing-library/react'
import { jest } from '@jest/globals'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import React from 'react'

// Mock window.scrollY
const mockScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value,
  })
}

describe('useScrollHeader - Performance Tests', () => {
  let headerRef: React.RefObject<HTMLElement>

  beforeEach(() => {
    jest.useFakeTimers()
    mockScrollY(0)
    headerRef = React.createRef<HTMLElement>()
    // Cria um elemento DOM mockado
    const mockElement = document.createElement('header')
    headerRef.current = mockElement
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    if (headerRef.current) {
      document.body.removeChild(headerRef.current)
    }
  })

  it('deve executar sem erros', () => {
    renderHook(() => useScrollHeader(headerRef))
    expect(headerRef.current).toBeTruthy()
  })

  it('deve usar requestAnimationFrame para otimização', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame')
    renderHook(() => useScrollHeader(headerRef))
    
    // Simula scroll
    mockScrollY(100)
    window.dispatchEvent(new Event('scroll'))
    
    act(() => {
      jest.advanceTimersByTime(16) // ~1 frame
    })
    
    expect(rafSpy).toHaveBeenCalled()
    rafSpy.mockRestore()
  })

  it('deve atualizar atributo data-scrolled ao fazer scroll', () => {
    renderHook(() => useScrollHeader(headerRef))
    
    mockScrollY(100)
    window.dispatchEvent(new Event('scroll'))
    
    act(() => {
      jest.advanceTimersByTime(16)
    })
    
    expect(headerRef.current?.getAttribute('data-scrolled')).toBe('true')
  })

  it('não deve executar callback excessivamente', () => {
    renderHook(() => useScrollHeader(headerRef))
    
    // Simula múltiplos eventos de scroll
    for (let i = 0; i < 10; i++) {
      mockScrollY(i * 10)
      window.dispatchEvent(new Event('scroll'))
    }
    
    act(() => {
      jest.advanceTimersByTime(16)
    })
    
    // Verifica que o atributo foi atualizado apenas quando necessário
    expect(headerRef.current?.getAttribute('data-scrolled')).toBeTruthy()
  })
})

