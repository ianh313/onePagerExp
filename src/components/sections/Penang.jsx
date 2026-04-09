import { useState, useEffect, useRef } from 'react'

const KEYWORDS = ['有海', '有山', '美食', '人文', '慢活', '國際']

export default function Penang({ onActive }) {
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
      id="section-3"
      ref={ref}
      className="min-h-screen snap-start snap-always bg-navy overflow-hidden"
    >
      {/*
        Desktop: 3fr | 2fr grid, image spans 2 rows
        Mobile:  stacked — image → top text → bottom text
      */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] md:grid-rows-2 min-h-screen">

        {/* Image — spans both rows on desktop */}
        <div className="relative overflow-hidden bg-site-teal h-[55vw] md:h-auto md:row-span-2">
          <img
            src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=960&q=80"
            alt="檳城海岸風光"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/seed/penang2/960/900'
              e.target.onerror = null
            }}
            className={[
              'w-full h-full object-cover transition-transform duration-[7000ms] ease-linear',
              vis ? 'scale-[1.06]' : 'scale-100',
            ].join(' ')}
          />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent to-navy/35" />
        </div>

        {/* Top text */}
        <div className="flex flex-col justify-end px-7 md:px-11 pt-10 pb-7 border-b border-white/10 md:row-start-1">
          <span {...anim('0ms')} className={anim('0ms').className + ' inline-block w-fit bg-gold text-warm-dk font-sans text-[.65rem] tracking-[.25em] px-3 py-1 mb-4'}>
            PENANG · 檳城
          </span>
          <h2
            {...anim('150ms')}
            className={anim('150ms').className + ' text-[clamp(1.35rem,2.4vw,2.2rem)] font-bold text-white leading-[1.45]'}
          >
            不是驚豔的大都會，<br />卻讓你流連忘返
          </h2>
        </div>

        {/* Bottom text */}
        <div className="flex flex-col justify-start px-7 md:px-11 pt-7 pb-12 md:row-start-2">
          <p {...anim('300ms')} className={anim('300ms').className + ' font-light leading-[2] text-[clamp(.85rem,1.1vw,1rem)] text-white/80'}>
            語言、氣候、飲食、人文，都跟我合拍。有海、有山、有生活、還有一群好朋友。
          </p>
          <p {...anim('450ms')} className={anim('450ms').className + ' font-light leading-[2] text-[clamp(.85rem,1.1vw,1rem)] text-white/80 mt-3'}>
            這裡很放鬆，頗有嘉義市慢活的步調。我真的開始想像，在這裡醒來的日常。
          </p>
          <div {...anim('600ms')} className={anim('600ms').className + ' flex flex-wrap gap-2 mt-6'}>
            {KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="px-3.5 py-1 border border-gold/45 text-gold-lt font-sans text-[.78rem] tracking-[.1em]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
