/* eslint-disable react/prop-types */
import type * as React from 'react'
import { cn } from '@renderer/lib/utils'

export function Input({
  className,
  type = 'text',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): React.JSX.Element {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
        className
      )}
      {...props}
    />
  )
}
