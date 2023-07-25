import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ initialRating, onRate }:any) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="flex items-center gap-2 h-9">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={`cursor-pointer ${
            value <= rating ? "text-orange" : "text-[#f5ae51]"
          }`}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
