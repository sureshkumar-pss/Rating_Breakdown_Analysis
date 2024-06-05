import { useState } from "react";
import "./RatingBreakdown.css";
import {
  APPLE_GREEN,
  CRIMSON_RED,
  LEMON_YELLOW,
  ORANGE,
} from "../shared/constants/colors";

// Define interfaces
interface RatingBreakdownProps {}


const initialRatings = [5, 50, 40, 22, 30];
const initialNoOfRatings = [50, 40, 30, 20, 10];

export const RatingBreakdown: React.FC<RatingBreakdownProps> = () => {
  const [ratings, setRatings] = useState<number[]>(initialRatings);

  const handleRegenerate = () => {
    setRatings(generateRandomRatings());
  };

  const findLargeRating = () => {
    const largestValue = Math.max(...initialNoOfRatings);
    return largestValue;
  };

  const generateRandomRatings = () => {
    return Array.from({ length: initialRatings.length }, () =>
      Math.floor(Math.random() * findLargeRating())
    );
  };

  // To get bar color using rating
  const getBarColor = (rating: number) => {
    if (rating > 40) return APPLE_GREEN;
    if (rating > 30) return LEMON_YELLOW;
    if (rating > 20) return ORANGE;
    if (rating > 10) return CRIMSON_RED;
    return "#9e9e9e";
  };

  return (
    <div className="rating-breakdown">
      <h1>Rating Breakdown Analysis</h1>
      <div className="chart-container">
        <div className="y-axis">
          {initialNoOfRatings?.map((value) => (
            <div key={value} className="y-axis-label">
              {value}
            </div>
          ))}
          <div className="y-axis-label-text">No of Ratings</div>
        </div>
        <div className="chart">
          {ratings.map((count, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{
                  height: `${count * 5}px`,
                  backgroundColor: getBarColor(count),
                }}
              >
                <div className="toast">{count}</div>
              </div>
              <div className="x-axis-label">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="x-axis-label-text">Ratings</div>
      <button className="regenerate-button" onClick={handleRegenerate}>
        Regenerate
      </button>
    </div>
  );
};
