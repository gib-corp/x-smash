import CharacterCard from "../CharacterCard/CharacterCard"
import { useCursor } from "../../contexts/CursorContext"
import "./CharacterGrid.css"

const fighterImages = import.meta.glob<{
  default: string
}>("/src/assets/fighters/**/*", { eager: true })

interface Character {
  id: string;
  name: string;
}

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid = ({ characters }: CharacterGridProps) => {

    const {
        setCursorType,
        selectedCharacterId,
        setSelectedCharacterId,
        setLockedRelativeOffset,
        setClickTargetPosition
    } = useCursor()

    const handleMouseEnter = () => {
        if (selectedCharacterId === null) {
            setCursorType('hold')
        }
    }

    const handleMouseLeave = () => {
        if (selectedCharacterId === null) {
            setCursorType('default')
        }
    }

    const handleCharacterClick = (e: React.MouseEvent<HTMLDivElement>, characterId: string) => {
        
        if (selectedCharacterId !== null) {
            
            setClickTargetPosition({ x: e.clientX, y: e.clientY });

            setSelectedCharacterId(null);
            setLockedRelativeOffset({ x: null, y: null });
            
            setCursorType('hold');
            return;
        }
        
        if (selectedCharacterId === null) {
        
            const domId = `character-card-${characterId}`
            const cardElement = document.getElementById(domId)

            if (cardElement) {
                const rect = cardElement.getBoundingClientRect();

                const relativeX = e.clientX - rect.left
                const relativeY = e.clientY - rect.top

                setLockedRelativeOffset({ x: relativeX, y: relativeY })
                setSelectedCharacterId(domId);
                setCursorType('drop');
            }
        } 
    }

    const getPortrait = (character: Character) => {
        const file = fighterImages[`/src/assets/fighters/${character.id}/chara_7_${character.id}_00.png`]

        if (!file) {
            return "/src/assets/fighters/steve/chara_7_steve_00.png";
        }

        return typeof file === "string" ? file : file.default;
    }

    return (
        <div
        className="character-grid"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            {characters.map((char) => (
                <CharacterCard
                    key={char.id}
                    id={char.id}
                    image={getPortrait(char)}
                    onClick={(e) => handleCharacterClick(e, char.id)}
                />
            ))}
        </div>
    );
}

export default CharacterGrid;
