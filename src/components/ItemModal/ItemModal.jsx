import "./ItemModal.css";

function ItemModal({ isOpen, onClose, selectedCard, onDeleteItem, isLoading }) {
  const backgroundImage = {
    backgroundImage: `url(${selectedCard.link})`,
  };

  return (
    <div className={`modal ${isOpen ? "modal_isOpened" : ""}`}>
      <div className="item-modal">
        <div className="item-modal__image" style={backgroundImage}></div>
        <button
          className="button button_type_close button_color_white item-modal__button_type_close"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="item-modal__footer">
          <div>
            <h2 className="item-modal__title">{selectedCard.name}</h2>
            <p className="item-modal__weather">
              Weather: {selectedCard.weather}
            </p>
          </div>
          <button
            type="button"
            className="button button_color_red item-modal__delete-button"
            onClick={() => onDeleteItem(selectedCard.itemId)}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
