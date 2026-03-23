import type * as React from 'react'
import { cn } from '@renderer/lib/utils'

export function Separator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn('h-px w-full bg-zinc-800', className)}
      role="separator"
      {...props}
    />
  )
}
