import { useEffect, useState } from 'react'
import { SCRIPT_URL } from '../config'

const EVENTS = [
  { id: '嘉義場 04/13（一）安娜與國王飯店', label: '04/13（一）嘉義', venue: '安娜與國王飯店' },
  { id: '高雄場 04/14（二）漢來大飯店15F',  label: '04/14（二）高雄', venue: '漢來大飯店 15F'  },
]

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}

export default function Modal({ open, onClose }) {
  const [form, setForm]     = useState({ name: '', phone: '', event: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  // Lock body scroll + reset form on close
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) {
      const t = setTimeout(() => { setForm({ name: '', phone: '', event: '' }); setStatus('idle') }, 400)
      return () => clearTimeout(t)
    }
  }, [open])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.event) return
    setStatus('loading')
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script does not need preflight this way
        body: new URLSearchParams(form),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const chosen = EVENTS.find(ev => ev.id === form.event)
  const valid  = form.name.trim() && form.phone.trim() && form.event

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
          'relative bg-cream text-ink w-full max-w-[480px] px-8 py-12 md:px-12',
          'transition-all duration-[450ms] ease-[cubic-bezier(.22,.9,.3,1)]',
          open ? 'translate-y-0 scale-100' : 'translate-y-6 scale-[.97]',
        ].join(' ')}
      >
        <button
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-4 right-5 text-ink-lt hover:text-ink text-lg leading-none transition-colors"
        >✕</button>

        {/* ── SUCCESS ── */}
        {status === 'success' && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-site-teal/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-site-teal" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 className="text-[1.5rem] font-bold text-navy mb-2">報名成功！</h3>
            {chosen && (
              <p className="font-sans text-[.9rem] text-ink-mid leading-[1.9]">
                我們 <strong className="text-navy font-semibold">{chosen.label}</strong><br />
                {chosen.venue} 14:00 等你
              </p>
            )}
            <button
              onClick={onClose}
              className="mt-8 px-10 py-3 bg-navy text-cream font-sans text-[.85rem] tracking-[.1em] hover:bg-navy-2 transition-colors"
            >
              關閉
            </button>
          </div>
        )}

        {/* ── FORM ── */}
        {status !== 'success' && (
          <>
            <div className="text-center mb-8">
              <span className="inline-block bg-navy text-cream font-sans text-[.65rem] tracking-[.25em] px-3 py-1 mb-4">
                免費報名
              </span>
              <h3 id="modal-title" className="text-[1.4rem] font-bold text-navy leading-snug">
                暢遊美好檳城分享會
              </h3>
            </div>

            <form onSubmit={submit} className="space-y-5">

              {/* 姓名 */}
              <div>
                <label className="block font-sans text-[.72rem] tracking-[.15em] text-ink-lt mb-1.5">
                  姓名
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="您的姓名"
                  required
                  className="w-full border border-ink/20 px-4 py-3 font-sans text-[.95rem] text-ink placeholder:text-ink-lt/50 focus:outline-none focus:border-navy transition-colors bg-transparent"
                />
              </div>

              {/* 電話 */}
              <div>
                <label className="block font-sans text-[.72rem] tracking-[.15em] text-ink-lt mb-1.5">
                  電話
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="0912 345 678"
                  required
                  className="w-full border border-ink/20 px-4 py-3 font-sans text-[.95rem] text-ink placeholder:text-ink-lt/50 focus:outline-none focus:border-navy transition-colors bg-transparent"
                />
              </div>

              {/* 場次 */}
              <div>
                <label className="block font-sans text-[.72rem] tracking-[.15em] text-ink-lt mb-2">
                  場次
                </label>
                <div className="space-y-2.5">
                  {EVENTS.map(ev => (
                    <label
                      key={ev.id}
                      className={[
                        'flex items-center gap-4 px-4 py-3.5 border cursor-pointer transition-all',
                        form.event === ev.id
                          ? 'border-navy bg-navy text-cream'
                          : 'border-ink/20 hover:border-navy/50 text-ink',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="event"
                        value={ev.id}
                        checked={form.event === ev.id}
                        onChange={() => setForm(f => ({ ...f, event: ev.id }))}
                        className="sr-only"
                      />
                      {/* Custom radio dot */}
                      <span className={[
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                        form.event === ev.id ? 'border-cream' : 'border-ink/30',
                      ].join(' ')}>
                        {form.event === ev.id && (
                          <span className="w-2 h-2 rounded-full bg-cream" />
                        )}
                      </span>
                      <span>
                        <span className="font-semibold text-[.95rem]">{ev.label}</span>
                        <span className={[
                          'font-sans text-[.78rem] ml-2',
                          form.event === ev.id ? 'text-cream/70' : 'text-ink-lt',
                        ].join(' ')}>
                          {ev.venue}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="font-sans text-[.8rem] text-red-500">
                  送出失敗，請稍後再試或來電洽詢。
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!valid || status === 'loading'}
                className={[
                  'w-full py-4 font-bold tracking-[.12em] text-[.95rem]',
                  'flex items-center justify-center gap-2',
                  'transition-all duration-300',
                  valid && status !== 'loading'
                    ? 'bg-navy text-cream hover:bg-navy-2 hover:shadow-[0_8px_24px_rgba(27,58,75,.3)]'
                    : 'bg-ink/10 text-ink/30 cursor-not-allowed',
                ].join(' ')}
              >
                {status === 'loading' ? <><Spinner /> 送出中…</> : '確認報名'}
              </button>

            </form>

            <p className="font-sans text-[.72rem] text-ink-lt text-center mt-5 tracking-[.08em]">
              入場免費 &nbsp;·&nbsp; 歡迎攜伴參加
            </p>
          </>
        )}

      </div>
    </div>
  )
}
