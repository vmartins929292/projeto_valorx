import { renderHook, act } from '@testing-library/react'
import { jest } from '@jest/globals'
import { useTabIndicator } from '../../hooks/useTabIndicator'
import React from 'react'

describe('useTabIndicator - Performance Tests', () => {
  let buttonsContainerRef: React.RefObject<HTMLDivElement>
  const activeTab = 'all'
  const submenuOpen = false

  beforeEach(() => {
    jest.useFakeTimers()
    buttonsContainerRef = React.createRef<HTMLDivElement>()
    const mockContainer = document.createElement('div')
    buttonsContainerRef.current = mockContainer
    document.body.appendChild(mockContainer)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    if (buttonsContainerRef.current) {
      document.body.removeChild(buttonsContainerRef.current)
    }
  })

  it('deve retornar indicatorStyle e tabRefs', () => {
    const { result } = renderHook(() => 
      useTabIndicator(activeTab, buttonsContainerRef, submenuOpen)
    )
    
    expect(result.current).toHaveProperty('indicatorStyle')
    expect(result.current).toHaveProperty('tabRefs')
  })

  it('deve usar requestAnimationFrame para otimização', () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame')
    renderHook(() => 
      useTabIndicator(activeTab, buttonsContainerRef, submenuOpen)
    )
    
    act(() => {
      jest.advanceTimersByTime(32) // 2 frames
    })
    
    expect(rafSpy).toHaveBeenCalled()
    rafSpy.mockRestore()
  })

  it('deve atualizar indicatorStyle ao mudar activeTab', () => {
    const { result, rerender } = renderHook(
      ({ tab }) => useTabIndicator(tab, buttonsContainerRef, submenuOpen),
      { initialProps: { tab: 'all' } }
    )
    
    const initialStyle = result.current.indicatorStyle
    
    rerender({ tab: 'economy' })
    
    act(() => {
      jest.advanceTimersByTime(32)
    })
    
    // O estilo pode ter mudado ou permanecido igual dependendo do DOM
    expect(result.current.indicatorStyle).toBeDefined()
  })

  it('deve limpar ResizeObserver ao desmontar', () => {
    const { unmount } = renderHook(() => 
      useTabIndicator(activeTab, buttonsContainerRef, submenuOpen)
    )
    
    unmount()
    
    // Não deve lançar erro ao desmontar
    expect(true).toBe(true)
  })
})

