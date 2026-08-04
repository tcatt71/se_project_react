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
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = likes?.some((id) => id === currentUser?._id);

  function handleLike(e) {
    e.stopPropagation();
    onCardLike(itemId, isLiked);
  }

  return (
    <div
      className="item-card"
      onClick={() => onCardClick({ itemId, name, link, weather, owner })}
    >
      <div className="item-card__header">
        <h2 className="item-card__title">{name}</h2>
        {isLoggedIn && (
          <button
            className={
              isLiked
                ? "button button_type_like button_liked"
                : "button button_type_like button_disliked"
            }
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
      <img className="item-card__image" src={link} alt={name} />
    </div>
  );
}

export default ItemCard;
