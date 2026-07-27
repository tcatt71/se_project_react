import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./profile.css";

function Profile({ clothingItems, onCardClick, onAddItem, onEditProfile }) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
