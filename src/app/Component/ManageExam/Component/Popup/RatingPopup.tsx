import React, { useState } from "react";

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (rating: any) => void;
  
}

const RatingPopup: React.FC<RatingPopupProps> = ({
  isOpen,
  onClose,
  handleSubmit,
}) => {
  const [rating, setRating] = useState<any>(0);

  if (!isOpen) return null;

  const submitRating = () => {
    handleSubmit(rating); // pass rating dynamically
  };
  const submitRatingNO=()=>{
    handleSubmit("NA"); // pass 0 for "No, Thanks!"
  }

  return (
    <div className="overlay">
      <div className="card">
        {/* Top Section */}
        <div className="top-section">
          <div className="emoji">⭐</div>
        </div>

        <h3>How Would You Rate Our App Experience?</h3>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "active" : ""}
              onClick={() => setRating(star)}
              style={{ cursor: "pointer", fontSize: "24px" }}
            >
              ★
            </span>
          ))}
        </div>

        <button className="submit-btn" onClick={submitRating}>
          Submit
        </button>

        <p className="skip" onClick={submitRatingNO}>
          No, Thanks!
        </p>
      </div>
    </div>
  );
};

export default RatingPopup;