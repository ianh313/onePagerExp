import { useState, useEffect, useRef } from 'react'

const AGENDA = [
  '探索美好檳城',
  '分析政經局勢',
  '講解第二家園',
  'Stark 酒店公寓',
  '檳城旅遊團召集',
  '先行者真心分享',
]

const SPEAKERS = [
  { name: 'Leon',              role: '檳城益安不動產總監' },
  { name: '台灣新晶投資 董事長',  role: 'Taiwan Sinjing Investment' },
  { name: 'Lawrance',          role: '檳城投資企業家' },
  { name: '蔡俊章 博士',        role: '台灣水墨畫家' },
  { name: '張仕賢',             role: '中華港澳之友協會' },
  { name: '黃朝雲',             role: '老爺建設董事長 · 主理人' },
]

export default function Event({ onActive, onOpenModal }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const autoFired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true)
          onActive?.()
          if (!autoFired.current) {
            autoFired.current = true
            setTimeout(() => onOpenModal?.(), 1800)
          }
        }
      },
      { threshold: 0.6 }
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
      className="h-screen snap-start snap-always bg-navy flex flex-col overflow-hidden"
    >
      {/* Scrollable inner */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1080px] mx-auto px-6 md:px-11 py-16">

          {/* Header */}
          <div {...anim('0ms')} className={anim('0ms').className + ' text-center mb-14'}>
            <span className="inline-block bg-gold text-warm-dk font-sans text-[.68rem] tracking-[.3em] px-4 py-1 mb-6">
              04 / 13 &nbsp;·&nbsp; 嘉義
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-cream leading-[1.4] mb-5">
              暢享第二人生<br />暢遊美好檳城分享會
            </h2>
            <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 font-sans text-[.92rem] text-gold-lt tracking-[.05em]">
              <span>🕑&nbsp; 04/13（星期一）14:00</span>
              <span>📍&nbsp; 嘉義安娜與國王酒店</span>
            </div>
          </div>

          {/* Grid: agenda + speakers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

            {/* Agenda */}
            <div {...anim('150ms')} className={anim('150ms').className}>
              <p className="font-sans text-[.68rem] tracking-[.35em] text-gold mb-5 uppercase">
                活動內容
              </p>
              <ul className="space-y-0">
                {AGENDA.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 py-3 border-b border-white/8 text-[.95rem] text-cream/85 leading-snug items-start"
                  >
                    <span className="text-gold font-sans text-[.7rem] w-5 shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Speakers */}
            <div {...anim('300ms')} className={anim('300ms').className}>
              <p className="font-sans text-[.68rem] tracking-[.35em] text-gold mb-5 uppercase">
                與會來賓
              </p>
              <ul className="space-y-0">
                {SPEAKERS.map(({ name, role }) => (
                  <li key={name} className="py-3.5 border-b border-white/8">
                    <div className="text-[.98rem] text-cream font-medium mb-1">{name}</div>
                    <div className="font-sans text-[.75rem] text-gold/70">{role}</div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* CTA */}
          <div {...anim('450ms')} className={anim('450ms').className + ' text-center pb-4'}>
            <button
              onClick={onOpenModal}
              className={[
                'bg-gold text-warm-dk font-bold tracking-[.12em] text-[1.05rem]',
                'px-16 py-[17px] border-none cursor-pointer',
                'transition-all duration-300',
                'hover:-translate-y-[3px] hover:bg-gold-lt hover:shadow-[0_10px_30px_rgba(196,163,90,.35)]',
              ].join(' ')}
            >
              立即報名 &nbsp;·&nbsp; 04/13 等你來
            </button>
            <p className="mt-4 font-sans text-[.75rem] text-cream/30 tracking-[.15em]">
              入場免費 &nbsp;·&nbsp; 名額有限
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
