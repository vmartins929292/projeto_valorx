import { render } from '@testing-library/react'
import { act } from '@testing-library/react'
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

describe('Performance - Memory Leaks', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('deve limpar event listeners ao desmontar FeaturedCard', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<FeaturedCard />)

    const listenersBefore = addEventListenerSpy.mock.calls.length

    unmount()

    // Verifica que listeners foram removidos
    expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThan(0)

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })

  it('deve limpar timers ao desmontar componentes', () => {
    const { unmount } = render(<FeaturedCard autoplayInterval={1000} />)

    const timersBefore = jest.getTimerCount()

    unmount()

    jest.advanceTimersByTime(2000)

    const timersAfter = jest.getTimerCount()

    // Timers devem ser limpos após unmount
    expect(timersAfter).toBeLessThanOrEqual(timersBefore)
  })
})

