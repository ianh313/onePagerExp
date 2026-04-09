export default function ProgressBar({ active, total }) {
  const width = total > 1 ? (active / (total - 1)) * 100 : 0

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-gold z-[900] transition-[width] duration-500 ease-in-out"
      style={{ width: `${width}%` }}
    />
  )
}
