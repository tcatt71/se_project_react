import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({
  itemId,
  name,
  link,
  weather,
  onCardClick,
  owner,
  onCardLike,
  likes,
  isLoggedIn = false,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const backgroundImage = {
    backgroundImage: `url(${link})`,
  };

  const isLiked = likes?.some((id) => id === currentUser?._id);

  function handleLike(e) {
    e.stopPropagation();
    onCardLike(itemId, isLiked);
  }

  return (
    <div
      className="item-card"
      style={backgroundImage}
      onClick={() => onCardClick({ itemId, name, link, weather, owner })}
    >
      <div className="item-card__header">
        <h2 className="item-card__title">{name}</h2>

        <button
          className={
            isLiked
              ? "button button_type_like button_liked"
              : "button button_type_like button_disliked"
          }
          type="button"
          onClick={handleLike}
          disabled={!isLoggedIn}
        />
      </div>
    </div>
  );
}

export default ItemCard;
