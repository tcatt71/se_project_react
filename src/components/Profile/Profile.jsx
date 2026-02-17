import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddItem }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
