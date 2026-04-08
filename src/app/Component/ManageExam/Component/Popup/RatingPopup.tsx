import React, { useState } from "react";

const labels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const emoji: Record<number, string> = {
  1: "😞",
  2: "😕",
  3: "😊",
  4: "😄",
  5: "🤩",
};

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (rating: number | "NA") => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({
  isOpen,
  onClose,
  handleSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  if (!isOpen) return null;

  const active = hovered || rating;

  const submitRating = () => {
    if (!rating) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    handleSubmit(rating);
    setSubmitted(true);
  };

  const submitNo = () => {
    handleSubmit("NA");
    setSkipped(true);
  };

  const reset = () => {
    setRating(0);
    setHovered(0);
    setSubmitted(false);
    setSkipped(false);
    setError(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .rp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 8, 20, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: rp-fade-in 0.25s ease;
        }

        @keyframes rp-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes rp-slide-up {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes rp-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        @keyframes rp-pop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes rp-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        .rp-card {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          border-radius: 28px;
          padding: 36px 32px 28px;
          width: 100%;
          max-width: 380px;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.06),
            0 24px 60px rgba(0,0,0,0.18),
            0 8px 20px rgba(0,0,0,0.08);
          animation: rp-slide-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .rp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b, #f97316, #ec4899, #8b5cf6);
          border-radius: 28px 28px 0 0;
        }

        .rp-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: none;
          background: #f4f4f5;
          color: #71717a;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
          font-family: inherit;
        }

        .rp-close:hover {
          background: #e4e4e7;
          color: #3f3f46;
        }

        .rp-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          margin: 0 auto 20px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: rp-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }

        .rp-title {
          font-size: 19px;
          font-weight: 700;
          color: #18181b;
          text-align: center;
          margin: 0 0 6px;
          letter-spacing: -0.3px;
          line-height: 1.3;
        }

        .rp-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #71717a;
          text-align: center;
          margin: 0 0 28px;
        }

        .rp-stars {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .rp-star {
          font-size: 36px;
          cursor: pointer;
          transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.15s;
          filter: grayscale(1) opacity(0.3);
          user-select: none;
          line-height: 1;
        }

        .rp-star.active {
          filter: grayscale(0) opacity(1);
          transform: scale(1.15);
        }

        .rp-star:hover {
          transform: scale(1.25);
        }

        .rp-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          min-height: 22px;
          margin-bottom: 24px;
          color: #f59e0b;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }

        .rp-error-label {
          color: #ef4444 !important;
          animation: rp-shake 0.4s ease;
        }

        .rp-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          color: #ffffff;
          transition: opacity 0.15s, transform 0.15s;
          letter-spacing: -0.2px;
          margin-bottom: 12px;
        }

        .rp-submit:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .rp-submit:active {
          transform: scale(0.98);
        }

        .rp-skip {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #a1a1aa;
          text-align: center;
          cursor: pointer;
          transition: color 0.15s;
          background: none;
          border: none;
          width: 100%;
          padding: 4px;
        }

        .rp-skip:hover {
          color: #71717a;
          text-decoration: underline;
        }

        /* Success state */
        .rp-success {
          text-align: center;
          padding: 8px 0 4px;
          animation: rp-slide-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .rp-success-icon {
          font-size: 56px;
          display: block;
          margin: 0 auto 16px;
          animation: rp-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .rp-success-title {
          font-size: 20px;
          font-weight: 700;
          color: #18181b;
          margin: 0 0 8px;
          letter-spacing: -0.3px;
        }

        .rp-success-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #71717a;
          margin: 0 0 28px;
          line-height: 1.5;
        }

        .rp-sparkles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .rp-sparkle {
          position: absolute;
          width: 8px; height: 8px;
          border-radius: 50%;
          animation: rp-sparkle 1.2s ease forwards;
        }

        .rp-try-again {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #a1a1aa;
          background: none;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          padding: 8px 20px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .rp-try-again:hover {
          border-color: #d4d4d8;
          color: #52525b;
        }
      `}</style>

      <div className="rp-overlay" onClick={onClose}>
        <div className="rp-card" onClick={(e) => e.stopPropagation()}>
          <button className="rp-close" onClick={onClose}>✕</button>

          {submitted || skipped ? (
            <div className="rp-success">
              <div className="rp-sparkles">
                {submitted && [
                  { top: "10%", left: "10%", color: "#f59e0b", delay: "0s" },
                  { top: "15%", left: "80%", color: "#ec4899", delay: "0.15s" },
                  { top: "75%", left: "15%", color: "#8b5cf6", delay: "0.3s" },
                  { top: "80%", left: "85%", color: "#f97316", delay: "0.45s" },
                  { top: "50%", left: "5%", color: "#10b981", delay: "0.2s" },
                  { top: "40%", left: "92%", color: "#3b82f6", delay: "0.35s" },
                ].map((s, i) => (
                  <span
                    key={i}
                    className="rp-sparkle"
                    style={{
                      top: s.top,
                      left: s.left,
                      background: s.color,
                      animationDelay: s.delay,
                    }}
                  />
                ))}
              </div>

              <span className="rp-success-icon">
                {skipped ? "🙏" : rating === 5 ? "🎉" : "💛"}
              </span>
              <p className="rp-success-title">
                {skipped ? "Maybe next time!" : "Thanks for rating!"}
              </p>
              <p className="rp-success-sub">
                {skipped
                  ? "We appreciate you taking a look. We're always working to improve."
                  : `You gave us ${rating} out of 5 — ${labels[rating]}! Your feedback means a lot to us.`}
              </p>
              <button className="rp-try-again" onClick={reset}>
                Rate again
              </button>
            </div>
          ) : (
            <>
              <div
                className="rp-icon-wrap"
                style={{ fontSize: active ? "32px" : "36px" }}
              >
                {active ? emoji[active] : "⭐"}
              </div>

              <h3 className="rp-title">How would you rate?</h3>
              <p className="rp-subtitle">Your feedback helps us get better.</p>

              <div className="rp-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`rp-star ${star <= active ? "active" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className={`rp-label ${error ? "rp-error-label" : ""}`}>
                {error
                  ? "Please select a rating"
                  : active
                  ? labels[active]
                  : ""}
              </p>

              <button className="rp-submit" onClick={submitRating}>
                Submit Rating
              </button>
              <button className="rp-skip" onClick={submitNo}>
                {/* No, thanks! */}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RatingPopup;

/* ── Usage example ──────────────────────────────────────────────────────────

import React, { useState } from "react";
import RatingPopup from "./RatingPopup";

export default function App() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (rating: number | "NA") => {
    console.log("Rating submitted:", rating);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Rate Us</button>
      <RatingPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

────────────────────────────────────────────────────────────────────────────── */