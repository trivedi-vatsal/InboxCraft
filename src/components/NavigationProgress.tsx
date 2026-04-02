import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function NavigationProgress() {
  const location = useLocation()
  const [width, setWidth] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const schedule = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay)
    timers.current.push(t)
  }

  useEffect(() => {
    clear()

    // Start
    setWidth(0)
    setOpacity(1)

    schedule(() => setWidth(30), 20)
    schedule(() => setWidth(70), 200)
    schedule(() => setWidth(90), 500)

    // Complete
    schedule(() => {
      setWidth(100)
      schedule(() => setOpacity(0), 250)
      schedule(() => setWidth(0), 600)
    }, 700)

    return clear
  }, [location.key])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px] bg-[#533afd] origin-left"
      style={{
        width: `${width}%`,
        opacity,
        transition: width === 0
          ? 'none'
          : width === 100
          ? 'width 200ms ease-out, opacity 250ms ease 250ms'
          : 'width 500ms cubic-bezier(0.1,0.4,0.2,1)',
      }}
    />
  )
}
