export default function NavDots({ active, total, onGoTo }) {
  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-[10px] z-[800] hidden md:flex"
      aria-label="頁面導覽"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          aria-label={`第 ${i + 1} 節`}
          className={[
            'w-[7px] h-[7px] rounded-full border-none cursor-pointer transition-all duration-300',
            i === active
              ? 'bg-gold scale-[1.6]'
              : 'bg-white/25 hover:bg-white/50',
          ].join(' ')}
        />
      ))}
    </nav>
  )
}
