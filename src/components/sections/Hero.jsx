import { useState, useEffect, useRef } from 'react'

export default function Hero({ onActive }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); onActive?.() } },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fade = (delay = '0ms', extra = '') => ({
    className: [
      'transition-all duration-700 ease-[cubic-bezier(.22,.9,.3,1)]',
      vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      extra,
    ].join(' '),
    style: { transitionDelay: vis ? delay : '0ms' },
  })

  return (
    <section
      id="section-0"
      ref={ref}
      className="relative min-h-screen snap-start snap-always flex items-center justify-center overflow-hidden bg-warm-dk"
    >
      {/* Layered gradient bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 25% 55%, rgba(196,163,90,.18), transparent 65%)',
            'radial-gradient(ellipse 60% 50% at 75% 30%, rgba(58,112,104,.22), transparent 60%)',
            'linear-gradient(140deg, #1A120A 0%, #2D1B0E 45%, #1B3A4B 100%)',
          ].join(','),
        }}
      />
      {/* Decorative vertical lines */}
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0, rgba(255,255,255,.025) 1px, transparent 1px, transparent 80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-7 py-20 max-w-4xl mx-auto">
        <p
          {...fade('150ms')}
          className={fade('150ms').className + ' font-sans text-[.72rem] tracking-[.4em] text-gold mb-9'}
          style={fade('150ms').style}
        >
          一個真實的旅人手記
        </p>

        <h1
          className={fade('350ms').className + ' text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold leading-[1.35] tracking-[.06em] text-cream mb-7'}
          style={fade('350ms').style}
        >
          暢享第二人生<br />暢遊美好檳城
        </h1>

        {/* Animated rule line */}
        <div
          className={[
            'mx-auto h-px bg-gold transition-all duration-700 ease-in-out mb-7',
            vis ? 'w-20 opacity-100' : 'w-12 opacity-0',
          ].join(' ')}
          style={{ transitionDelay: vis ? '600ms' : '0ms' }}
        />

        <p
          className={fade('750ms').className + ' font-sans text-[clamp(.85rem,1.5vw,1.05rem)] tracking-[.2em] text-gold-lt font-light'}
          style={fade('750ms').style}
        >
          朝雲親筆 &nbsp;·&nbsp; 04/13 嘉義分享會
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-9 left-1/2 flex flex-col items-center gap-1.5 animate-cue text-white/30 font-sans text-[.68rem] tracking-[.25em]"
        aria-hidden="true"
      >
        <span>往下探索</span>
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
