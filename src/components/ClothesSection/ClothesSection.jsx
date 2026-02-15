import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";
import "./../../layout/card-container.css";

function ClothesSection({ clothingList, onCardClick, onAddItem }) {
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
        {clothingList.map((item) => (
          <li className="main__list-item" key={item._id}>
            <ItemCard
              name={item.name}
              link={item.imageUrl}
              weather={item.weather}
              onClick={onCardClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
