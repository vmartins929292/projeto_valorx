# Valor News - Projeto Next.js

Projeto criado com Next.js 14, TypeScript e App Router, importado do Figma.

## Como começar

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Depois, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do projeto

- `app/` - Diretório principal com as páginas e layouts (App Router)
- `public/` - Arquivos estáticos (imagens, ícones, etc.)
- `package.json` - Dependências e scripts do projeto
- `tsconfig.json` - Configuração do TypeScript
- `next.config.js` - Configuração do Next.js

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma build de produção
- `npm run start` - Inicia o servidor de produção (após o build)
- `npm run lint` - Executa o linter

## Próximos passos

Você pode começar a editar a página modificando `app/page.tsx`. A página será atualizada automaticamente conforme você edita o arquivo.

## Importação do Figma

Este projeto foi importado do Figma. Alguns itens precisam ser ajustados:

### 1. Imagens
- Substitua `/public/images/hero-field.jpg` pela imagem real exportada do Figma
- Atualize o caminho em `app/assets.ts` se necessário

### 2. SVG Paths
- Os caminhos SVG em `app/imports/svg-9po0gahbk9.ts` são placeholders
- Exporte os SVGs do Figma e substitua os paths pelos reais

### 3. Componentes Placeholder
- `Card.tsx` e `EventsCalendar.tsx` são componentes básicos
- Implemente a lógica real conforme necessário

### 4. Dados
- Os dados em `app/data.ts` são exemplos
- Substitua por dados reais da sua API ou fonte de dados

## Estrutura do Projeto

- `app/components/App.tsx` - Componente principal da aplicação
- `app/components/ui/` - Componentes UI (Select, etc.)
- `app/components/` - Componentes customizados (FeaturedCard, NewsCard, etc.)
- `app/imports/` - Componentes e assets importados do Figma
- `app/data.ts` - Dados estáticos da aplicação
- `app/icons.tsx` - Ícones da aplicação (Lucide React)
- `app/assets.ts` - Assets estáticos (imagens, etc.)

