import { render, screen } from '@testing-library/react'
import NewsCard from '../../components/NewsCard'
import type { NewsArticle } from '../../types'

describe('NewsCard', () => {
  const mockArticle: NewsArticle = {
    title: 'Test Article',
    excerpt: 'This is a test excerpt',
    tag: 'Test Tag',
    date: '01 jan 2025',
  }

  it('renders article title', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('renders article excerpt', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument()
  })

  it('renders article tag', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByText('Test Tag')).toBeInTheDocument()
  })

  it('renders article date', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByText('01 jan 2025')).toBeInTheDocument()
  })
})

