import { renderHook, waitFor } from '@testing-library/react'
import { useWaveAnimation } from '../../hooks/useWaveAnimation'

describe('useWaveAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should initialize with all items invisible', () => {
    const { result } = renderHook(() => useWaveAnimation(3, false))
    expect(result.current).toEqual([false, false, false])
  })

  it('should animate items when opened', async () => {
    const { result } = renderHook(() => useWaveAnimation(3, true))

    // Initially all false
    expect(result.current).toEqual([false, false, false])

    // After first stagger (60ms)
    jest.advanceTimersByTime(60)
    await waitFor(() => {
      expect(result.current[0]).toBe(true)
    })

    // After second stagger (120ms)
    jest.advanceTimersByTime(60)
    await waitFor(() => {
      expect(result.current[1]).toBe(true)
    })
  })
})

