import { useEffect } from 'react'

export default function Modal({ open, onClose }) {
  // Lock body scroll when open
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
        'fixed inset-0 z-[2000] flex items-center justify-center',
        'bg-warm-dk/85 backdrop-blur-md',
        'transition-opacity duration-[450ms]',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div
        className={[
          'relative bg-cream text-ink w-[92%] max-w-[520px] px-8 py-14 md:px-14 text-center',
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

        {/* Badge */}
        <span className="inline-block bg-navy text-cream font-sans text-[.65rem] tracking-[.25em] px-3 py-1 mb-6">
          立即報名
        </span>

        <h3 id="modal-title" className="text-[1.85rem] font-bold text-navy leading-snug mb-4">
          04/13 我們嘉義見
        </h3>

        <p className="font-sans text-[.92rem] text-ink-lt leading-[1.9] font-light mb-9">
          暢享第二人生，暢遊美好檳城<br />
          分享會 · 嘉義安娜與國王酒店<br />
          2025/04/13（一）下午 14:00<br /><br />
          填寫報名表，確認您的出席。<br />
          名額有限，歡迎把握機會。
        </p>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'block w-fit mx-auto px-11 py-4',
            'bg-navy text-cream font-bold tracking-[.1em]',
            'transition-all duration-300',
            'hover:-translate-y-0.5 hover:bg-navy-2 hover:shadow-[0_8px_24px_rgba(27,58,75,.4)]',
            'mb-4',
          ].join(' ')}
        >
          點此填寫報名表
        </a>

        <p className="font-sans text-[.75rem] text-ink-lt tracking-[.1em]">
          入場免費 &nbsp;·&nbsp; 歡迎攜伴參加
        </p>
      </div>
    </div>
  )
}
