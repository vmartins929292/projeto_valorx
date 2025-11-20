import type { WebSocketMessage, LiveFeedEntry, LiveFeedChartData, LiveFeedHeaderData, WebSocketEventType, ConnectionStatus } from '../types'

/**
 * Valida se uma mensagem WebSocket tem a estrutura esperada
 */
export const isValidWebSocketMessage = (data: unknown): data is WebSocketMessage => {
  if (!data || typeof data !== 'object') return false
  
  const message = data as Record<string, unknown>
  
  return (
    typeof message.type === 'string' &&
    typeof message.timestamp === 'string' &&
    'payload' in message
  )
}

/**
 * Processa uma mensagem WebSocket e retorna o tipo e payload tipado
 */
export const processWebSocketMessage = (message: WebSocketMessage): {
  type: WebSocketEventType
  payload: LiveFeedEntry | LiveFeedChartData | LiveFeedHeaderData | ConnectionStatus
} => {
  if (!isValidWebSocketMessage(message)) {
    throw new Error('Mensagem WebSocket inválida')
  }

  return {
    type: message.type,
    payload: message.payload,
  }
}

/**
 * Valida se um payload é uma LiveFeedEntry
 */
export const isLiveFeedEntry = (payload: unknown): payload is LiveFeedEntry => {
  if (!payload || typeof payload !== 'object') return false
  
  const entry = payload as Record<string, unknown>
  
  return (
    typeof entry.id === 'string' &&
    typeof entry.timestamp === 'string' &&
    typeof entry.title === 'string' &&
    Array.isArray(entry.content)
  )
}

/**
 * Valida se um payload é LiveFeedChartData
 */
export const isChartData = (payload: unknown): payload is LiveFeedChartData => {
  if (!payload || typeof payload !== 'object') return false
  
  const chartData = payload as Record<string, unknown>
  
  return (
    Array.isArray(chartData.series) &&
    typeof chartData.lastUpdate === 'string'
  )
}

/**
 * Valida se um payload é LiveFeedHeaderData
 */
export const isHeaderData = (payload: unknown): payload is LiveFeedHeaderData => {
  if (!payload || typeof payload !== 'object') return false
  
  const headerData = payload as Record<string, unknown>
  
  return (
    typeof headerData.headline === 'string' &&
    typeof headerData.subheadline === 'string' &&
    typeof headerData.lastUpdate === 'string'
  )
}

/**
 * Formata timestamp para exibição em português
 */
export const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('pt-BR', { month: 'short' })
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    
    return `${day} ${month} ${year} • ${hours}:${minutes}`
  } catch {
    return timestamp
  }
}

/**
 * Simula mensagens WebSocket para desenvolvimento
 */
export const createMockMessage = (
  type: WebSocketEventType,
  payload: unknown
): WebSocketMessage => {
  return {
    type,
    payload: payload as LiveFeedEntry | LiveFeedChartData | LiveFeedHeaderData | string,
    timestamp: new Date().toISOString(),
  }
}

