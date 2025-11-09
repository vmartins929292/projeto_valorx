import { useEffect, useRef } from 'react'
import { bindScrollWithRaf } from '../utils/scrollRaf'

export function useScrollHeader(headerRef: React.RefObject<HTMLElement>) {
  const lastScrollFlagRef = useRef<boolean>(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const mountedId = requestAnimationFrame(() => {
      document.documentElement.classList.add('hdr-mounted')
    })

    const header = headerRef.current
    if (!header) return () => cancelAnimationFrame(mountedId)

    const cleanup = bindScrollWithRaf((y) => {
      const flag = y > 50
      if (flag !== lastScrollFlagRef.current) {
        lastScrollFlagRef.current = flag
        header.setAttribute('data-scrolled', flag ? 'true' : 'false')
        header.classList.toggle('is-scrolled', flag)
      }
    })

    return () => {
      cleanup()
      cancelAnimationFrame(mountedId)
    }
  }, [headerRef])
}

