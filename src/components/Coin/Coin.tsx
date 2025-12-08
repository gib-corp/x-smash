import { useRef, useEffect } from 'react'
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
    const { cursorType } = useCursor()

    useEffect(() => {
        const el = coinRef.current;
        if (!el) return;

        const coinWidth = el.offsetWidth
        const coinHeight = el.offsetHeight

        const offsetX = -(coinWidth * 0.51)
        const offsetY = -(coinHeight * 0.552)

        const move = (e: MouseEvent) => {
            gsap.set(el, { x: e.clientX + offsetX, y: e.clientY + offsetY });
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    useEffect(() => {
        const el = coinRef.current;
        if (!el) return;

        const opacity = isCoinVisible(cursorType) ? 1 : 0;
        gsap.set(el, { opacity: opacity }); 

    }, [cursorType])

  return (
    <div className="coin-red" ref={coinRef}>
      <img src={CoinRed} alt="Coin" />
    </div>
  )
}

export default Coin