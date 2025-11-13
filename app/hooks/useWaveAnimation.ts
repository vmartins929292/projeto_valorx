import { useState, useEffect } from 'react'

export function useWaveAnimation(itemsCount: number, isOpen: boolean) {
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(
    () => Array(itemsCount).fill(false)
  )

  useEffect(() => {
    // Reset todos os itens quando o estado muda
    if (isOpen) {
      setItemsVisible(Array(itemsCount).fill(false))
    }
    
    // Duração total da animação (em ms)
    const TOTAL_DURATION = itemsCount > 0 ? Math.min(itemsCount * 50, 400) : 0
    // Calcula o delay entre cada item para distribuir uniformemente
    const STAGGER = itemsCount > 1 ? TOTAL_DURATION / (itemsCount - 1) : 0
    
    let cancelled = false
    const ids: number[] = []

    const run = () => {
      if (isOpen) {
        // Pequeno delay inicial para garantir que o reset foi aplicado
        const initialDelay = 10
        for (let i = 0; i < itemsCount; i++) {
          const delay = initialDelay + Math.round(i * STAGGER)
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[i] = true
                return n
              })
            }
          }, delay)
          ids.push(id)
        }
      } else {
        for (let i = 0; i < itemsCount; i++) {
          const j = itemsCount - 1 - i
          const delay = Math.round(i * STAGGER)
          const id = window.setTimeout(() => {
            if (!cancelled) {
              setItemsVisible((v) => {
                const n = v.slice()
                n[j] = false
                return n
              })
            }
          }, delay)
          ids.push(id)
        }
      }
    }

    // Pequeno delay para garantir que o reset foi aplicado antes de iniciar a animação
    const runId = window.setTimeout(() => {
      if (!cancelled) {
        run()
      }
    }, isOpen ? 10 : 0)
    ids.push(runId)

    return () => {
      cancelled = true
      ids.forEach(clearTimeout)
    }
  }, [isOpen, itemsCount])

  return itemsVisible
}

