import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useCursor } from '../../contexts/CursorContext'
import CursorDefault from '../../assets/cursors/default.png'
import CursorHold from '../../assets/cursors/hold.png'
import CursorDrop from '../../assets/cursors/drop.png'
import './Cursor.css'

type CursorType = 'default' | 'hold' | 'drop'

const getCursorImage = (type: CursorType) => {
  const cursor: Record<CursorType, string> = {
    hold: CursorHold,
    drop: CursorDrop,
    default: CursorDefault,
  }

  return cursor[type]
}

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { cursorType } = useCursor()

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    
    const cursorWidth = el.offsetWidth
    const cursorHeight = el.offsetHeight

    const offsetX = -(cursorWidth * 0.26)
    const offsetY = -(cursorHeight * 0.22)

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
      <img src={getCursorImage(cursorType)} alt="Cursor" />
    </div>
  )
}

export default Cursor
