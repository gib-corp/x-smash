import "./CharacterCard.css";

interface CharacterCardProps {
  id: string;
  image: string | undefined;
}

const CharacterCard = ({ id, image }: CharacterCardProps) => {
  return (
    <div className="character-card">
        {image ? (
            <img src={image} alt={id} className="character-img" />
        ) : (
            <div className="character-placeholder">No Image</div>
        )}
    </div>
  );
}

export default CharacterCard;
