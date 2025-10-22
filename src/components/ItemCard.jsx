function ItemCard({ name, link }) {
  const backgroundImage = {
    backgroundImage: `url(${link})`,
  };

  return (
    <div className="item-card" style={backgroundImage}>
      <h2 className="item-card__title">{name}</h2>
    </div>
  );
}

export default ItemCard;
