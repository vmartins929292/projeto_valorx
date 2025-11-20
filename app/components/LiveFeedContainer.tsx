'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { processWebSocketMessage, isLiveFeedEntry, isChartData, isHeaderData } from '../utils/websocket'
import type { LiveFeedEntry, LiveFeedChartData, LiveFeedHeaderData, WebSocketMessage } from '../types'
import LiveFeed from './LiveFeed'
import { LIVE_FEED_ENTRIES, LIVE_FEED_CHART_DATA, LIVE_FEED_HEADER } from '../data'

export default function LiveFeedContainer() {
  const [entries, setEntries] = useState<LiveFeedEntry[]>(LIVE_FEED_ENTRIES)
  const [chartData, setChartData] = useState<LiveFeedChartData>(LIVE_FEED_CHART_DATA)
  const [headerData, setHeaderData] = useState<LiveFeedHeaderData>(LIVE_FEED_HEADER)

  const handleMessage = useCallback((message: WebSocketMessage) => {
    const { type, payload } = processWebSocketMessage(message)

    switch (type) {
      case 'feed_update':
        if (isLiveFeedEntry(payload)) {
          setEntries((prev) => [payload, ...prev])
        }
        break
      
      case 'chart_update':
        if (isChartData(payload)) {
          setChartData(payload)
        }
        break
      
      case 'header_update':
        if (isHeaderData(payload)) {
          setHeaderData(payload)
        }
        break
      
      default:
        break
    }
  }, [])

  // URL do WebSocket da variável de ambiente ou modo mockado
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || ''

  const { connectionStatus } = useWebSocket({
    url: wsUrl,
    onMessage: handleMessage,
  })

  // Simulação de dados mockados em desenvolvimento quando não há WebSocket
  useEffect(() => {
    if (!wsUrl && process.env.NODE_ENV === 'development') {
      // Simula atualizações periódicas em modo desenvolvimento
      const interval = setInterval(() => {
        // Simula nova entrada a cada 30 segundos
        const mockEntry: LiveFeedEntry = {
          id: `mock-${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: 'Atualização em tempo real do mercado',
          excerpt: 'Esta é uma simulação de atualização em tempo real.',
          content: [
            'Esta é uma simulação de atualização em tempo real.',
            'Quando o WebSocket estiver configurado, as atualizações virão automaticamente.',
          ],
          category: 'Mercado',
          tag: 'Live',
          author: 'Sistema',
        }
        setEntries((prev) => [mockEntry, ...prev].slice(0, 20)) // Limita a 20 entradas
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [wsUrl])

  return (
    <LiveFeed
      connectionStatus={connectionStatus}
      headerData={headerData}
      chartData={chartData}
      entries={entries}
    />
  )
}

