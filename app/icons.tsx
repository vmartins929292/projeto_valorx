import {
  Search,
  Menu,
  X,
  Home,
  Radio,
  FileText,
  BarChart3,
  Calculator,
  FileStack,
  Shield,
  Newspaper,
  DollarSign,
  Cloud,
  Truck,
  Beef,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
} from "lucide-react"

export const ICONS = {
  Search,
  Menu,
  X,
  Home,
  Radio,
  FileText,
  BarChart3,
  Calculator,
  FileStack,
  Shield,
  Newspaper,
  DollarSign,
  Cloud,
  Truck,
  Beef,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
} as const

/**
 * COMO ADICIONAR NOVOS ÍCONES:
 * 
 * 1. Encontre o ícone em: https://lucide.dev/icons
 * 2. Adicione o nome no import acima (linha ~2-23)
 *    Exemplo: Heart, Star, Settings, Bell, etc.
 * 3. Adicione também no objeto ICONS abaixo (linha ~25-47)
 * 4. Use no seu componente: <ICONS.NomeDoIcone size={20} />
 * 
 * Exemplo completo:
 * 
 * import {
 *   // ... ícones existentes ...
 *   Heart,  // ← Adicione aqui
 * } from "lucide-react"
 * 
 * export const ICONS = {
 *   // ... ícones existentes ...
 *   Heart,  // ← E também aqui
 * } as const
 */

