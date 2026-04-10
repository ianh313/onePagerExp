import { useState, useEffect, useRef } from 'react'

export default function Context({ onActive }) {
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
      id="section-1"
      ref={ref}
      className="relative min-h-screen snap-start snap-always bg-brown-dk flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: [
            'linear-gradient(to bottom, rgba(26,18,10,.85), rgba(27,58,75,.65))',
            "url('https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=75')",
          ].join(','),
        }}
      />

      <div className="relative z-10 max-w-3xl px-8 py-16 md:py-24 text-center mx-auto">
        <p
          {...anim('0ms')}
          className={anim('0ms').className + ' font-sans text-[.7rem] tracking-[.45em] text-gold mb-12'}
        >
          台海局勢 · 海外選擇
        </p>

        <h2
          {...anim('200ms')}
          className={anim('200ms').className + ' text-[clamp(1.6rem,3.2vw,3rem)] font-semibold leading-[1.85] text-white'}
        >
          儘管兩岸僵持台海緊繃，<br />
          海外旅遊渡假依然絡繹，<br />
          馬來西亞檳城讓人流連忘返，<br />
          更躍昇海外<br />
          <em className="not-italic font-bold text-gold">第二家園的最佳選擇</em>
        </h2>
      </div>
    </section>
  )
}
