/**
 * SysComply identity: the Loop.
 *
 * An open ring closed by a single sage point, the moment a management system
 * "closes the loop". It also reads as a C, for Comply.
 *
 * Drawn on a 32-unit grid and shifted left so the ring and dot sit optically centred.
 * The gap leaves 2.3 units of clear space around the dot so it stays open at 16px.
 * public/favicon.svg and public/apple-touch-icon.png use the same geometry on an ink tile.
 */
type Tone = 'dark' | 'light'

const RING = 'M20.58 10.33A7.4 7.4 0 1 0 20.58 21.67'

/** The mark alone. `tile` puts it on a rounded ink square (app-icon style). */
export function LogoMark({ tone = 'dark', tile, className = 'size-7' }: { tone?: Tone; tile?: boolean; className?: string }) {
  const onDark = tone === 'light' || tile
  return (
    // Inline, the viewBox is cropped to the shape (x 6.62 to 25.37, y 6.8 to 25.2) so spacing beside text is true.
    <svg viewBox={tile ? '0 0 32 32' : '6.4 6.6 19.2 19.2'} fill="none" className={className} aria-hidden="true">
      {tile && <rect width="32" height="32" rx="9" fill="#141614" />}
      <path d={RING} stroke={onDark ? '#f7f6f2' : '#141614'} strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="23.22" cy="16" r="2.15" fill={onDark ? '#9db8a6' : '#4e7360'} />
    </svg>
  )
}

/** Mark plus wordmark. tone="dark" is for light backgrounds; tone="light" is for dark backgrounds. */
export function Logo({ tone = 'dark' }: { tone?: Tone }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark tone={tone} className="size-[22px]" />
      <span className={`text-[18px] font-semibold tracking-[-0.03em] ${tone === 'dark' ? 'text-ink' : 'text-paper'}`}>
        SysComply
      </span>
    </span>
  )
}
