function ItemModal({ isOpen, selectedCard }) {
  const backgroundImage = {
    backgroundImage: `url(${selectedCard.link})`,
  };

  return (
    <div className={`modal ${isOpen ? "modal_isOpened" : ""}`}>
      <div className="modal__content">
        <div className="modal__image" style={backgroundImage}></div>
        <h2 className="modal__title">{selectedCard.name}</h2>
        <p className="modal__weather">Weather: {selectedCard.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
