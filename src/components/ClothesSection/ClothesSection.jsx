import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./ClothesSection.css";
import "./../../layout/card-container.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddItem,
  onCardLike,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section>
      <header className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="button button_color_gray"
          type="button"
          onClick={onAddItem}
        >
          + Add new
        </button>
      </header>
      <ul className="card-container clothes-section__card-container">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <li className="main__list-item" key={item._id}>
              <ItemCard
                owner={item.owner}
                itemId={item._id}
                name={item.name}
                link={item.imageUrl}
                weather={item.weather}
                likes={item.likes}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}
export default ClothesSection;
