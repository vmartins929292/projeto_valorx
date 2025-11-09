import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

function makeRafScheduler<T extends (...args: any[]) => void>(fn: T) {
  let scheduled = false
  let lastArgs: any[] = []

  return (...args: Parameters<T>) => {
    lastArgs = args
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      fn(...(lastArgs as Parameters<T>))
    })
  }
}

export function useTabIndicator(
  activeTab: string,
  buttonsContainerRef: React.RefObject<HTMLDivElement>,
  submenuOpen: boolean
) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, top: 0, height: 0 })
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[activeTab]
    const parent = buttonsContainerRef.current
    if (!btn || !parent) return

    const el = btn as HTMLElement
    const left = el.offsetLeft
    const top = el.offsetTop
    const width = el.offsetWidth
    const height = el.offsetHeight

    setIndicatorStyle(prev => {
      if (
        prev.left === left &&
        prev.top === top &&
        prev.width === width &&
        prev.height === height
      ) return prev
      return { left, top, width, height }
    })
  }, [activeTab, buttonsContainerRef])

  const scheduleUpdateIndicator = useMemo(
    () => makeRafScheduler(updateIndicator),
    [updateIndicator]
  )

  useEffect(() => {
    const parent = buttonsContainerRef.current
    if (!parent) return

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== parent) return
      if (e.propertyName === 'max-width' || e.propertyName === 'width' || e.propertyName === 'opacity') {
        scheduleUpdateIndicator()
      }
    }

    parent.addEventListener('transitionend', onEnd)
    return () => parent.removeEventListener('transitionend', onEnd)
  }, [scheduleUpdateIndicator, buttonsContainerRef])

  const roRef = useRef<ResizeObserver | null>(null)
  useEffect(() => {
    const el = buttonsContainerRef.current
    if (!el) return

    if (roRef.current) {
      roRef.current.disconnect()
      roRef.current = null
    }

    roRef.current = new ResizeObserver(() => {
      scheduleUpdateIndicator()
    })

    roRef.current.observe(el)

    return () => {
      if (roRef.current) {
        roRef.current.disconnect()
        roRef.current = null
      }
    }
  }, [scheduleUpdateIndicator, buttonsContainerRef])

  useEffect(() => {
    const onResize = () => scheduleUpdateIndicator()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [scheduleUpdateIndicator])

  useEffect(() => {
    scheduleUpdateIndicator()
  }, [activeTab, submenuOpen, scheduleUpdateIndicator])

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      scheduleUpdateIndicator()
    }))
  }, [scheduleUpdateIndicator])

  return { indicatorStyle, tabRefs }
}

