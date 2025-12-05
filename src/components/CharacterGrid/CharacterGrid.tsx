import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterGrid.css"

const fighterImages = import.meta.glob<{
  default: string
}>("/src/assets/fighters/**/*", { eager: true });

interface Character {
  id: string;
  name: string;
}

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid = ({ characters }: CharacterGridProps) => {

    const getPortrait = (character: Character) => {
        const file = fighterImages[`/src/assets/fighters/${character.id}/chara_7_${character.id}_00.png`]

        if (!file) {
            return "/src/assets/fighters/steve/chara_7_steve_00.png";
        }

        return typeof file === "string" ? file : file.default;
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
