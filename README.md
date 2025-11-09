# Valor News - Projeto Next.js

Projeto profissional de notícias sobre commodities e mercados financeiros, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 📁 Estrutura do Projeto

```
app/
├── __tests__/              # Testes unitários e de integração
│   ├── components/
│   └── hooks/
├── components/              # Componentes React
│   ├── layout/             # Componentes de layout (Header, Footer, Sidebar)
│   ├── legacy/             # Componentes legados (importados de outras fontes)
│   └── ui/                  # Componentes de UI reutilizáveis
├── hooks/                   # Hooks customizados
├── types/                   # Definições de tipos TypeScript
├── utils/                   # Funções utilitárias
├── data.ts                 # Dados mockados e constantes
├── icons.tsx               # Ícones do projeto
├── assets.ts               # Assets e recursos estáticos
├── globals.css             # Estilos globais
├── layout.tsx              # Layout raiz do Next.js
└── page.tsx                # Página inicial

lib/
└── utils.ts                # Utilitários compartilhados

public/
└── images/                 # Imagens estáticas
```

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações
- **Recharts** - Gráficos e visualizações
- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React

## 📦 Instalação

```bash
npm install
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint

# Testes
npm test
npm run test:watch
```

## 🏗️ Arquitetura

### Componentes

- **Layout Components** (`app/components/layout/`): Componentes estruturais como Header, Footer e Sidebar
- **UI Components** (`app/components/ui/`): Componentes reutilizáveis de interface
- **Legacy Components** (`app/components/legacy/`): Componentes importados de outras fontes que precisam ser refatorados

### Hooks Customizados

- `useScrollHeader`: Gerencia o comportamento do header ao fazer scroll
- `useTabIndicator`: Controla o indicador animado das abas
- `useWaveAnimation`: Gerencia animações em onda para listas

### Tipos TypeScript

Todos os tipos compartilhados estão em `app/types/index.ts`:

- `NewsArticle`
- `FeaturedArticle`
- `MenuItem`
- `Stock`
- `MarketCategory`
- `MarketData`

## 🧪 Testes

O projeto inclui estrutura de testes com Jest e Testing Library. Exemplos de testes estão em `app/__tests__/`.

## 📝 Convenções

- Componentes funcionais com TypeScript
- Nomenclatura PascalCase para componentes
- camelCase para funções e variáveis
- Pastas em lowercase
- Tipos exportados de `app/types/`
- Hooks customizados em `app/hooks/`

## 🔄 Próximos Passos

- [ ] Migrar componentes legacy para estrutura moderna
- [ ] Adicionar mais testes unitários
- [ ] Implementar testes E2E
- [ ] Otimizar performance com React.memo onde necessário
- [ ] Adicionar documentação de componentes com Storybook

## 📄 Licença

Este projeto é privado e proprietário.
