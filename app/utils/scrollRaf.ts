// Throttled scroll handler using requestAnimationFrame
export function bindScrollWithRaf(callback: (scrollY: number) => void) {
  let ticking = false
  let lastScrollY = 0

  const updateScroll = () => {
    callback(lastScrollY)
    ticking = false
  }

  const handleScroll = () => {
    lastScrollY = window.scrollY
    if (!ticking) {
      ticking = true
      requestAnimationFrame(updateScroll)
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initial call
  callback(window.scrollY)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

