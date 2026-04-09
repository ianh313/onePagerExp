import { useState, useEffect, useRef } from 'react'

export default function Thought({ onActive }) {
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

  const anim = (delay = '0ms') => ({
    className: `transition-all duration-700 ease-[cubic-bezier(.22,.9,.3,1)] ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`,
    style: { transitionDelay: vis ? delay : '0ms' },
  })

  return (
    <section
      id="section-4"
      ref={ref}
      className="relative min-h-screen snap-start snap-always bg-warm-dk flex items-center justify-center overflow-hidden"
    >
      {/* Ghost character backdrop */}
      <div
        className="absolute select-none pointer-events-none text-white/[.018] font-black leading-[.85]"
        style={{ fontSize: '42vw', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        aria-hidden="true"
      >
        ？
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-10 py-20 text-center mx-auto">
        <p
          {...anim('0ms')}
          className={anim('0ms').className + ' font-sans text-[.68rem] tracking-[.55em] text-gold mb-14'}
        >
          關 鍵 一 問
        </p>

        <h2
          {...anim('200ms')}
          className={anim('200ms').className + ' text-[clamp(2.2rem,4.8vw,4.5rem)] font-bold leading-[1.6] text-cream mb-9'}
        >
          如果人生有<br />
          {/* Animated underline span */}
          <span className="relative inline-block text-gold">
            第二個選項
            <span
              className={[
                'absolute bottom-0 left-0 h-[2px] bg-gold',
                'transition-[width] duration-1000 ease-in-out',
                vis ? 'w-full' : 'w-0',
              ].join(' ')}
              style={{ transitionDelay: vis ? '1100ms' : '0ms' }}
            />
          </span>
          ，<br />
          那應該長<br />什麼樣子？
        </h2>

        <p
          {...anim('400ms')}
          className={anim('400ms').className + ' font-light text-[clamp(.88rem,1.3vw,1.1rem)] text-cream/45 tracking-[.05em]'}
        >
          我只想跟你分享這一個念頭
        </p>
      </div>
    </section>
  )
}
