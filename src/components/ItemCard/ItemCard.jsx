import "./ItemCard.css";

function ItemCard({ itemId, name, link, weather, onClick }) {
  const backgroundImage = {
    backgroundImage: `url(${link})`,
  };

  return (
    <div
      className="item-card"
      style={backgroundImage}
      onClick={() => onClick({ itemId, name, link, weather })}
    >
      <h2 className="item-card__title">{name}</h2>
    </div>
  );
}

export default ItemCard;
