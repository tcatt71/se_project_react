import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";
import "./../../layout/card-container.css";

function ClothesSection({ clothingItems, onCardClick, onAddItem }) {
  return (
    <div>
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
        {clothingItems.map((item) => (
          <li className="main__list-item" key={item._id}>
            <ItemCard
              itemId={item._id}
              name={item.name}
              link={item.imageUrl}
              weather={item.weather}
              onCardClick={onCardClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
