import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterGrid.css"
const fighterImages = import.meta.glob("/src/assets/fighters/**/*", { eager: true })

interface Character {
  id: string;
  name: string;
}

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid = ({ characters }: CharacterGridProps) => {

    const getPortrait = (character: Character) => {
        return fighterImages[`/src/assets/fighters/${character.id}/chara_7_${character.id}_00.png`]?.default || "/src/assets/fighters/default.png";
    }

    return (
        <div className="character-grid">
            {characters.map((char) => (
                <CharacterCard
                    key={char.id}
                    id={char.id}
                    image={getPortrait(char)}
                />
            ))}
        </div>
    );
}

export default CharacterGrid;
