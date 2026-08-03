import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddItem,
  onEditProfile,
  onCardLike,
  onLogout,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
