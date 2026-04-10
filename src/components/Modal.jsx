import { useEffect } from 'react'

const EVENTS = [
  {
    date: '04 / 13',
    day: '星期一',
    city: '嘉義場',
    venue: '嘉義安娜與國王飯店',
    href: 'https://hello-act-bot.web.app/acts/PFMB5OF7/register',
  },
  {
    date: '04 / 14',
    day: '星期二',
    city: '高雄場',
    venue: '漢來大飯店 15F',
    href: 'https://hello-act-bot.web.app/acts/PFMB5OF7/register', // TODO: replace with 高雄 link
  },
]

export default function Modal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className={[
        'fixed inset-0 z-[2000] flex items-center justify-center px-4',
        'bg-warm-dk/88 backdrop-blur-md',
        'transition-opacity duration-[450ms]',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div
        className={[
          'relative bg-cream text-ink w-full max-w-[600px] px-7 py-12 md:px-12',
          'transition-all duration-[450ms] ease-[cubic-bezier(.22,.9,.3,1)]',
          open ? 'translate-y-0 scale-100' : 'translate-y-6 scale-[.97]',
        ].join(' ')}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-4 right-5 text-ink-lt hover:text-ink text-lg leading-none transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-navy text-cream font-sans text-[.65rem] tracking-[.25em] px-3 py-1 mb-5">
            選擇場次 · 立即報名
          </span>
          <h3 id="modal-title" className="text-[1.6rem] font-bold text-navy leading-snug">
            暢享第二人生<br />暢遊美好檳城分享會
          </h3>
        </div>

        {/* Two event cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          {EVENTS.map(({ date, day, city, venue, href }) => (
            <a
              key={city}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'group flex flex-col items-center text-center',
                'border border-navy/20 px-6 py-7',
                'transition-all duration-300',
                'hover:bg-navy hover:border-navy hover:-translate-y-1',
                'hover:shadow-[0_10px_28px_rgba(27,58,75,.25)]',
              ].join(' ')}
            >
              <span className="font-sans text-[.65rem] tracking-[.3em] text-gold group-hover:text-gold-lt mb-3 transition-colors">
                2026 · {date}
              </span>
              <span className="text-[1.5rem] font-bold text-navy group-hover:text-cream mb-1 transition-colors">
                {city}
              </span>
              <span className="font-sans text-[.8rem] text-ink-lt group-hover:text-cream/70 mb-1 transition-colors">
                {day} · 14:00
              </span>
              <span className="font-sans text-[.78rem] text-ink-mid group-hover:text-cream/60 mb-6 transition-colors">
                {venue}
              </span>
              <span className={[
                'text-[.8rem] font-sans tracking-[.15em] px-5 py-2',
                'border border-navy text-navy',
                'group-hover:border-cream group-hover:text-cream',
                'transition-colors',
              ].join(' ')}>
                我要報名
              </span>
            </a>
          ))}
        </div>

        <p className="font-sans text-[.73rem] text-ink-lt text-center tracking-[.08em]">
          入場免費 &nbsp;·&nbsp; 歡迎攜伴參加
        </p>
      </div>
    </div>
  )
}
