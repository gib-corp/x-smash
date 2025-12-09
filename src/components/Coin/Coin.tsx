import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { useCursor } from "../../contexts/CursorContext"
import type { CursorType } from "../../contexts/CursorContext"
import CoinRed from '../../assets/cursors/red.png'
import './Coin.css'

const isCoinVisible = (type: CursorType) => {
    return type === "hold" || type === "drop"
}

const Coin = () => {
    const coinRef = useRef<HTMLDivElement>(null)
    const { cursorType, selectedCharacterId, lockedRelativeOffset } = useCursor()

    const getCoinOffsets = useCallback((el: HTMLDivElement) => {
        const coinWidth = el.offsetWidth
        const coinHeight = el.offsetHeight
        
        const adjustX = -(coinWidth * 0.51)
        const adjustY = -(coinHeight * 0.552)
        return { adjustX, adjustY }
    }, []);

    const calculateAndSetPosition = useCallback(() => {
        const coinEl = coinRef.current
        const { x: offsetX, y: offsetY } = lockedRelativeOffset

        if (!coinEl || cursorType !== 'drop' || !selectedCharacterId || offsetX === null || offsetY === null) {
            return;
        }

        const cardElement = document.getElementById(selectedCharacterId);

        if (cardElement) {
            const rect = cardElement.getBoundingClientRect()

            const targetX = rect.left + offsetX
            const targetY = rect.top + offsetY

            const { adjustX, adjustY } = getCoinOffsets(coinEl)

            gsap.set(coinEl, {
                x: targetX + adjustX,
                y: targetY + adjustY,
            });
        }
    }, [selectedCharacterId, cursorType, lockedRelativeOffset])

    useEffect(() => {
      const el = coinRef.current
      if (!el) return

      if (cursorType === 'drop') {
        return
      }

      const coinWidth = el.offsetWidth
      const coinHeight = el.offsetHeight

      const offsetX = -(coinWidth * 0.51)
      const offsetY = -(coinHeight * 0.552)

      const move = (e: MouseEvent) => {
          gsap.set(el, { x: e.clientX + offsetX, y: e.clientY + offsetY })
      };

      window.addEventListener("mousemove", move)

      return () => {
          window.removeEventListener("mousemove", move)
      }
    }, [cursorType])

    useEffect(() => {
        if (cursorType === 'drop' && selectedCharacterId) {
            calculateAndSetPosition();
        }
    }, [cursorType, selectedCharacterId, calculateAndSetPosition])

    useEffect(() => {
        window.addEventListener('resize', calculateAndSetPosition)
        
        return () => {
            window.removeEventListener('resize', calculateAndSetPosition)
        }
    }, [calculateAndSetPosition])

    useEffect(() => {
        const el = coinRef.current
        if (!el) return

        const opacity = isCoinVisible(cursorType) ? 1 : 0
        gsap.set(el, { opacity: opacity });

    }, [cursorType])

  return (
    <div className="coin-red" ref={coinRef}>
      <img src={CoinRed} alt="Coin" />
    </div>
  )
}

export default Coin