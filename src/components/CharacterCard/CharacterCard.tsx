import React, { useEffect, useRef, useState } from "react"
import { useCursor } from "../../contexts/CursorContext"
import { gsap } from "gsap"
import "./CharacterCard.css";

interface CharacterCardProps {
  id: string;
  name: string;
  image: string | undefined;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CharacterCard = ({ id, name, image, onMouseDown }: CharacterCardProps) => {

  const pathRef = useRef(null);
  const domId = `character-card-${id}`
  const { cursorType, selectedCharacterId } = useCursor()
  const [isHovered, setIsHovered] = useState(false)

  const isHoverActive = isHovered && cursorType === 'hold';
  const isCoinActive = cursorType === 'drop' && domId === selectedCharacterId;

  const handleMouseEnter = () => {
    setIsHovered(true)
  };

  const handleMouseLeave = () => {
    setIsHovered(false)
  };

  const frameClasses = [
    "character-frame",
    isHoverActive ? "is-hover-active" : "",
    isCoinActive ? "is-coin-active" : "",
  ].filter(Boolean).join(" ");

  useEffect(() => {
    const pathElement = pathRef.current;

    if (pathElement) {
      const color1 = "#FFDCDA";
      const color2 = "#FE3636";

      gsap.set(pathElement, { attr: { fill: color1 } })
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });

      timeline.to(pathElement, {
        duration: .4,
        attr: { fill: color2 },
        ease: "power1.inOut"
      });
      return () => {
        timeline.kill();
      };
    }
  }, [id])

  return (
    <div
      className="character-card"
      id={ domId }
      onMouseDown={ onMouseDown }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={frameClasses}>
        <svg width="124" height="85" viewBox="0 0 124 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref={pathRef}
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M124 85H0V0H124V85ZM5 10.752V80H113.248L119 74.248V5H10.752L5 10.752Z" 
              
              fill="#FFDCDA"/>
        </svg>  
      </div>
      <div className="character-name">
        {name}
      </div>
      <div className="character-container">
        {image ? (
          <img src={image} alt={id} className="character-img" />
        ) : (
          <div className="character-placeholder">No Image</div>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
