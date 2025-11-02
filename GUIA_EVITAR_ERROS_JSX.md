# Guia para Evitar Erros de Sintaxe JSX

## 📋 Checklist Antes de Fazer Mudanças Estruturais

### 1. **Verificar Tags de Abertura e Fechamento**
Antes de remover ou mover um elemento, conte as tags:
```tsx
// ✅ BOM: Sempre verifique
<div>        {/* tag aberta */}
  <header>   {/* tag aberta */}
    ...
  </header>  {/* tag fechada */}
</div>        {/* tag fechada - CORRETO! */}
```

### 2. **Usar a Ferramenta de Validação do Editor**
- **VS Code / Cursor**: Use `Ctrl+Shift+P` → "Format Document" para formatar
- Verifique se há linhas vermelhas ou amarelas sublinhadas
- Os erros aparecem em tempo real enquanto você digita

### 3. **Verificar Erros no Terminal**
Sempre monitore o terminal onde o `npm run dev` está rodando:
```bash
# Se aparecer erro, pare imediatamente:
# "Failed to compile"
# "Syntax Error"
# "Expected '...', got '...'"
```

### 4. **Antes de Remover um Container:**
1. Identifique todas as tags que o container envolve
2. Verifique se há tags de fechamento `</div>` correspondentes
3. Remova TANTO a abertura QUANTO o fechamento juntos

### 5. **Dica: Comentar em vez de Deletar**
Se não tiver certeza, comente primeiro:
```tsx
{/* <div className="sticky top-0 z-50"> */}
  {/* conteúdo */}
{/* </div> */}
```
Depois teste. Se funcionar, aí delete.

### 6. **Usar o Linter**
Execute antes de fazer push:
```bash
npm run lint
```
Isso detecta muitos erros antes de compilar.

### 7. **Estrutura Correta do Header (Exemplo)**
```tsx
<header>              {/* Abre header */}
  <div>               {/* Abre div container */}
    {/* conteúdo */}
  </div>              {/* Fecha div container */}
  
  {/* Mobile Menu - FORA do site-container mas DENTRO do header */}
  {condition && (
    <div>...</div>
  )}
</header>             {/* Fecha header */}
```

## 🚨 Sinais de Alerta

Se você ver esses erros no terminal, algo está errado:
- `Expected ',', got 'className'`
- `Expected '}', got '...'`
- `Unclosed JSX element`
- `Failed to compile`

## ✅ Boas Práticas

1. **Salvar Frequentemente**: Ctrl+S sempre que fizer mudanças
2. **Testar Depois de Cada Mudança Estrutural**: Não acumule várias mudanças
3. **Usar Indentação**: Facilita ver a hierarquia das tags
4. **Comentários Úteis**: Marque seções grandes com comentários

## 🔧 Ferramentas Úteis

### Extensões VS Code/Cursor Recomendadas:
- **ES7+ React/Redux/React-Native snippets** - Autocomplete
- **ESLint** - Detecta erros em tempo real
- **Prettier** - Formata código automaticamente

### Comandos Úteis:
```bash
# Verificar erros de sintaxe
npm run lint

# Limpar cache e recompilar
rm -rf .next
npm run dev

# No Windows PowerShell:
Remove-Item -Recurse -Force .next
npm run dev
```

## 📝 Exemplo do Erro que Aconteceu

**ANTES (Errado):**
```tsx
<div className="sticky top-0 z-50">  {/* Container removido */}
  <section>...</section>
  <header>...</header>
</div>                                {/* ❌ Esta tag ficou sobrando! */}
<main>...</main>
```

**DEPOIS (Correto):**
```tsx
<section>...</section>
<header>...</header>                 {/* ✅ Agora sticky direto no header */}
<main>...</main>
```

## 💡 Dica Final

Sempre que remover um elemento que envolve outros elementos, verifique:
1. Quantas tags abrem? (`<div>`, `<section>`, etc.)
2. Quantas tags fecham? (`</div>`, `</section>`, etc.)
3. Elas devem ser **iguais em número**!



