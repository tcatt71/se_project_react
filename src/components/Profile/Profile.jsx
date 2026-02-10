import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./Profile.css";

function Profile({ clothingList, onCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingList={clothingList} onCardClick={onCardClick} />
    </div>
  );
}

export default Profile;
