# Pasta de Vídeos

Esta pasta contém os arquivos de vídeo usados no componente FeaturedCard.

## Como usar:

1. Adicione seus arquivos de vídeo nesta pasta (`public/videos/`)
2. Formatos suportados: `.mp4`, `.mov`, `.webm`, `.ogg`
3. No componente FeaturedCard, defina:
   ```typescript
   {
     video: '/videos/nome-do-video.mp4',
     image: '/images/imagem-fallback.jpg', // Obrigatório: usado como fallback
     videoPoster: '/images/poster.jpg' // Opcional: imagem específica para poster
   }
   ```

## Fallback automático:

- Se o vídeo não carregar ou falhar, a imagem será exibida automaticamente
- A imagem também é usada como poster do vídeo se `videoPoster` não for definido
- Sempre defina uma `image` quando usar vídeos para garantir o fallback

## Exemplo:

```typescript
{
  title: 'Título da notícia',
  video: '/videos/exemplo.mp4',
  image: '/images/exemplo-fallback.jpg', // Fallback obrigatório
  videoPoster: '/images/exemplo-poster.jpg' // Opcional
}
```

