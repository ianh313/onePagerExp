import { useState, useEffect, useRef } from 'react'

const ROLES = [
  '行家旅人',
  '投資達人',
  '地產專人',
  '爬山領路人',
  '移居過來人',
  '企業掌門人',
  '在地華人',
]

export default function People({ onActive }) {
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

  return (
    <section
      id="section-2"
      ref={ref}
      className="relative min-h-screen snap-start snap-always bg-navy flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1600&q=60')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy/80 via-transparent to-navy/80" />

      <div className="relative z-10 max-w-3xl px-8 py-14 md:py-20 text-center mx-auto">

        {/* Lead-in */}
        <p
          className={[
            'font-sans text-[.78rem] tracking-[.4em] text-white/40 mb-10',
            'transition-all duration-700',
            vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
          ].join(' ')}
          style={{ transitionDelay: vis ? '0ms' : '0ms' }}
        >
          跟著
        </p>

        {/* Role pills — staggered */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ROLES.map((role, i) => (
            <span
              key={role}
              className={[
                'px-5 py-2 border border-gold/60 text-gold font-sans text-[.9rem] tracking-[.08em]',
                'transition-all duration-700 ease-[cubic-bezier(.22,.9,.3,1)]',
                vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
              ].join(' ')}
              style={{ transitionDelay: vis ? `${100 + i * 80}ms` : '0ms' }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Payoff line */}
        <p
          className={[
            'text-[clamp(1.5rem,3vw,2.6rem)] font-bold text-white leading-[1.7]',
            'transition-all duration-700',
            vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
          ].join(' ')}
          style={{ transitionDelay: vis ? '750ms' : '0ms' }}
        >
          一走進美好檳城<br />
          <span className="text-gold-lt">全方位的體驗檳城</span>
        </p>

      </div>
    </section>
  )
}
