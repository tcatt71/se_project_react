import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./Profile.css";

function Profile({ clothingList, onCardClick, onAddItem }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingList={clothingList}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
