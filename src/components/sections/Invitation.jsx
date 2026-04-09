import { useState, useEffect, useRef } from 'react'

export default function Invitation({ onActive }) {
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
      id="section-5"
      ref={ref}
      className="min-h-screen snap-start snap-always bg-cream text-ink overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* Text (first on mobile) */}
        <div className="flex flex-col justify-center px-7 md:px-14 lg:px-16 py-16 order-2 md:order-1 bg-cream">
          <p
            {...anim('0ms')}
            className={anim('0ms').className + ' font-sans text-[.72rem] tracking-[.35em] text-site-teal mb-6'}
          >
            一場真心話的分享會
          </p>

          <h2
            {...anim('150ms')}
            className={anim('150ms').className + ' text-[clamp(1.5rem,2.6vw,2.6rem)] font-bold text-navy leading-[1.5] mb-7'}
          >
            難得這次，<br />
            我的檳城好友<br />
            特別來嘉義
          </h2>

          <p
            {...anim('300ms')}
            className={anim('300ms').className + ' font-light leading-[2.05] text-[clamp(.9rem,1.15vw,1.05rem)] text-ink-mid mb-5'}
          >
            不是推銷，也不是一般的投資說明會。只是想把我看見、感受到的美好檳城，好好跟你聊一聊。
          </p>

          <p
            {...anim('450ms')}
            className={anim('450ms').className + ' font-semibold text-[clamp(1rem,1.4vw,1.15rem)] text-navy tracking-[.05em]'}
          >
            歡迎你來。
          </p>
        </div>

        {/* Image (shown at top on mobile) */}
        <div className="relative overflow-hidden bg-navy-2 h-[52vw] md:h-auto order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=960&q=80"
            alt="分享聚會"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/seed/gather1/960/900'
              e.target.onerror = null
            }}
            className={[
              'w-full h-full object-cover transition-transform duration-[7000ms] ease-linear',
              vis ? 'scale-[1.06]' : 'scale-100',
            ].join(' ')}
          />
          {/* Overlay fade toward text column (desktop only) */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-l from-transparent via-transparent to-cream" />
        </div>

      </div>
    </section>
  )
}
