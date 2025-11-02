# Como Adicionar Novos Ícones

## 📍 Onde encontrar ícones
- Site oficial: https://lucide.dev/icons
- Procure pelo nome do ícone (ex: `Heart`, `Star`, `Settings`)

## 📝 Passo a Passo

### 1. Abra o arquivo `app/icons.tsx`

### 2. Adicione o nome do ícone no import (primeira parte):
```tsx
import {
  Search,
  Menu,
  // ... outros ícones existentes ...
  
  // Adicione aqui (exemplo):
  Heart,
  Star,
  Settings,
  Bell,
} from "lucide-react"
```

### 3. Adicione no objeto ICONS (segunda parte):
```tsx
export const ICONS = {
  Search,
  Menu,
  // ... outros ícones existentes ...
  
  // Adicione aqui também:
  Heart,
  Star,
  Settings,
  Bell,
} as const
```

### 4. Use o ícone no seu componente:
```tsx
import { ICONS } from '../icons'

// No JSX:
<ICONS.Heart className="w-5 h-5" />
<ICONS.Star size={20} />
<ICONS.Settings className="w-6 h-6 text-blue-500" />
```

## ✅ Exemplo Completo

Suponha que você queira adicionar `Heart` e `Star`:

**Arquivo `app/icons.tsx` após adicionar:**
```tsx
import {
  // ... ícones existentes ...
  TrendingUp,
  TrendingDown,
  Heart,      // ← Novo
  Star,        // ← Novo
} from "lucide-react"

export const ICONS = {
  // ... ícones existentes ...
  TrendingUp,
  TrendingDown,
  Heart,      // ← Novo
  Star,        // ← Novo
} as const
```

**Uso no componente:**
```tsx
<ICONS.Heart className="w-5 h-5 text-red-500" />
<ICONS.Star size={20} className="text-yellow-500" />
```

## 💡 Dicas

1. **Nomes dos ícones:** Use PascalCase (primeira letra maiúscula)
   - ✅ `Heart`, `Star`, `Settings`
   - ❌ `heart`, `star`, `settings`

2. **Tamanho do ícone:**
   - Com className: `<ICONS.Heart className="w-5 h-5" />`
   - Com prop size: `<ICONS.Heart size={20} />`

3. **Cores:**
   - Use classes Tailwind: `className="text-blue-500"`
   - Ou cores customizadas: `className="text-[#ff0000]"`

4. **Verificar se o ícone existe:**
   - Acesse https://lucide.dev/icons
   - Procure pelo nome exato
   - O nome deve estar em PascalCase

