import { useState, useEffect } from 'react'

export function useWaveAnimation(itemsCount: number, isOpen: boolean) {
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(
    () => Array(itemsCount).fill(false)
  )

  useEffect(() => {
    const STAGGER = 60
    let cancelled = false
    const ids: number[] = []

    const run = () => {
      if (isOpen) {
        for (let i = 0; i < itemsCount; i++) {
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[i] = true
                return n
              })
            }
          }, i * STAGGER)
          ids.push(id)
        }
      } else {
        for (let i = 0; i < itemsCount; i++) {
          const j = itemsCount - 1 - i
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[j] = false
                return n
              })
            }
          }, i * STAGGER)
          ids.push(id)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      ids.forEach(clearTimeout)
    }
  }, [isOpen, itemsCount])

  return itemsVisible
}

