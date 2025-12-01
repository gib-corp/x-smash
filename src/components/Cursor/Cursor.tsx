import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import CursorDefault from '../../assets/DEFAULT.png'
import './Cursor.css'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const offsetX = -16
    const offsetY = -12

    const move = (e: MouseEvent) => {
      gsap.set(el, { x: e.clientX + offsetX, y: e.clientY + offsetY, opacity: 1 })
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!(e.relatedTarget)) {
        gsap.set(el, { opacity: 0 })
      }
    }

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <div className="cursor" ref={cursorRef}>
      <img src={CursorDefault} alt="Curseur" />
    </div>
  )
}

export default Cursor
