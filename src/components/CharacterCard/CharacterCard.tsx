import "./CharacterCard.css";

interface CharacterCardProps {
  id: string;
  image: string | undefined;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CharacterCard = ({ id, image, onClick }: CharacterCardProps) => {

  const domId = `character-card-${id}`

  return (
    <div className="character-card" id={ domId } onClick={ onClick }>
        {image ? (
            <img src={image} alt={id} className="character-img" />
        ) : (
            <div className="character-placeholder">No Image</div>
        )}
    </div>
  );
}

export default CharacterCard;
