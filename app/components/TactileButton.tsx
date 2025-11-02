'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "transition-all duration-200 active:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TactileButton.displayName = 'TactileButton'

export default TactileButton

