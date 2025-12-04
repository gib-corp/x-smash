import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import CursorDefault from '../../assets/cursors/default.png'
import CursorHold from '../../assets/cursors/hold.png'
import CursorDrop from '../../assets/cursors/drop.png'
import './Cursor.css'

type CursorType = 'default' | 'hold' | 'drop'

interface CursorProps {
  cursorType: CursorType;
}

const getCursorImage = (type: CursorType) => {
  const cursor: Record<CursorType, string> = {
    hold: CursorHold,
    drop: CursorDrop,
    default: CursorDefault,
  }

  return cursor[type]
}

const Cursor = ({ cursorType }: CursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const offsetX = -26
    const offsetY = -22

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
