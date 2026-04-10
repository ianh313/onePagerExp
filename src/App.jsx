import { useState, useCallback, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import NavDots from './components/NavDots'
import Modal from './components/Modal'
import Hero from './components/sections/Hero'
import Context from './components/sections/Context'
import People from './components/sections/People'
import Event from './components/sections/Event'

const TOTAL = 4

export default function App() {
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const goTo = useCallback((i) => {
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const openModal  = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { closeModal(); return }
      if (modalOpen) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goTo(Math.min(active + 1, TOTAL - 1))
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goTo(Math.max(active - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, modalOpen, goTo, closeModal])

  return (
    <div className="bg-warm-dk">
      <ProgressBar active={active} total={TOTAL} />
      <NavDots active={active} total={TOTAL} onGoTo={goTo} />

      <Hero    onActive={() => setActive(0)} />
      <Context onActive={() => setActive(1)} />
      <People  onActive={() => setActive(2)} />
      <Event   onActive={() => setActive(3)} onOpenModal={openModal} />

      <Modal open={modalOpen} onClose={closeModal} />
    </div>
  )
}
