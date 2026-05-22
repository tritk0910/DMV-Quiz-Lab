const signImages = import.meta.glob<{ default: string }>(
  '../assets/signs/*.png',
  { eager: true }
)

export function signUrl(name: string): string {
  const match = signImages[`../assets/signs/${name}.png`]
  if (!match) throw new Error(`Missing sign image: ${name}`)
  return match.default
}
