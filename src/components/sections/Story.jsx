import { useState, useEffect, useRef } from 'react'

export default function Story({ onActive }) {
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
      className="min-h-screen snap-start snap-always bg-cream text-ink overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* Image column */}
        <div className="relative overflow-hidden bg-navy h-[52vw] md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=960&q=80"
            alt="檳城喬治市街景"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.style.background = 'linear-gradient(135deg,#1B3A4B,#3A7068)'
            }}
            className={[
              'w-full h-full object-cover transition-transform duration-[7000ms] ease-linear',
              vis ? 'scale-[1.06]' : 'scale-100',
            ].join(' ')}
          />
          {/* Gradient overlay (desktop only) */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-transparent to-cream" />
        </div>

        {/* Text column */}
        <div className="flex flex-col justify-center px-7 md:px-12 lg:px-14 py-16">
          <p {...anim('0ms')} className={anim('0ms').className + ' font-sans text-[.72rem] tracking-[.3em] text-site-teal mb-6'}>
            2025 · 04/03 ── 檳城歸來
          </p>

          <h2
            {...anim('150ms')}
            className={anim('150ms').className + ' text-[clamp(1.6rem,2.8vw,2.8rem)] font-bold leading-[1.45] text-navy border-l-[3px] border-gold pl-5 mb-7'}
          >
            我的好友，<br />我是朝雲
          </h2>

          <div {...anim('300ms')} className={anim('300ms').className + ' font-light leading-[2.05] text-[clamp(.9rem,1.15vw,1.05rem)] text-ink-mid space-y-4'}>
            <p>
              04/03 我剛從檳城回來。原本只是朋友邀約旅遊，沒想太多，卻意外地愛上了那裡。
            </p>
            <p>
              我來過馬來西亞很多次，這是第一次到檳城。很奇怪，我竟然開始想：「如果以後住在這裡，好像也可以？」
            </p>
            <p>
              一個念頭突然冒出來：
              <strong className="font-semibold text-navy">原來人生，也可以在別的地方繼續。</strong>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
