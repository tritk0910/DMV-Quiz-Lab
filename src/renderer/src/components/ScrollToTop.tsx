import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@renderer/lib/utils'

interface ScrollToTopProps {
  isDark: boolean
}

export function ScrollToTop({ isDark }: ScrollToTopProps): React.JSX.Element {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > 300)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 left-6 z-30 inline-flex items-center justify-center rounded-xl border p-3 shadow-lg backdrop-blur transition-opacity duration-200',
        isDark
          ? 'border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800'
          : 'border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
