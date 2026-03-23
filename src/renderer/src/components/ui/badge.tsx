import type * as React from 'react'
import { cn } from '@renderer/lib/utils'

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-200',
        className
      )}
      {...props}
    />
  )
}
