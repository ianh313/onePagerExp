import { useState, useEffect, useRef } from 'react'

export default function Reflection({ onActive }) {
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
      id="section-2"
      ref={ref}
      className="relative min-h-screen snap-start snap-always bg-brown-dk flex items-center justify-center overflow-hidden"
    >
      {/* Background with image + overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: [
            'linear-gradient(to bottom, rgba(26,18,10,.88), rgba(45,27,14,.72))',
            "url('https://images.unsplash.com/photo-1569701813229-33284b643e3c?auto=format&fit=crop&w=1600&q=75')",
          ].join(','),
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-10 py-20 text-center mx-auto">
        <p
          {...anim('0ms')}
          className={anim('0ms').className + ' font-sans text-[.7rem] tracking-[.45em] text-gold mb-11'}
        >
          在台灣生活了六十年之後
        </p>

        <h2
          {...anim('200ms')}
          className={anim('200ms').className + ' text-[clamp(1.9rem,4vw,3.8rem)] font-semibold leading-[1.65] text-cream mb-11'}
        >
          如果有一天<br />
          要換個地方生活，<br />
          <em className="not-italic text-gold font-bold">我有沒有安排好？</em>
        </h2>

        <p
          {...anim('400ms')}
          className={anim('400ms').className + ' font-light leading-[2] text-[clamp(.88rem,1.2vw,1.08rem)] text-cream/65'}
        >
          在台灣生活了六十年，其實從來沒想過別的可能。但這幾年，兩岸氛圍緊張、國際局勢動盪，
          不得不開始思考：如果有一天要換個地方生活，我有沒有安排好？
        </p>
      </div>
    </section>
  )
}
