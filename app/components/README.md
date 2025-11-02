# Componentes

Este diretório é para componentes React criados a partir de designs do Figma.

## Como usar designs do Figma

1. **Copiar elementos do Figma:**
   - Selecione o elemento no Figma
   - Copie (Ctrl+C / Cmd+C)
   - Cole aqui no código ou nas imagens

2. **Exportar assets:**
   - Selecione o elemento no Figma
   - Clique em "Export" no painel direito
   - Escolha o formato (PNG, SVG, JPG)
   - Salve em `public/images/`

3. **Usar no código:**
```tsx
import Image from 'next/image'

export default function MeuComponente() {
  return (
    <Image 
      src="/images/meu-design.png" 
      alt="Design do Figma"
      width={800}
      height={600}
    />
  )
}
```

