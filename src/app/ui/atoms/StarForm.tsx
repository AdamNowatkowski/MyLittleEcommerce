"use client"

import { useState } from 'react';

export const StarRating = () => {
  const [rating, setRating] = useState(5);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="overflow-hidden rounded-md bg-black">
        <div className="mb-4">
          <label htmlFor="ratingStars" className="block ml-2 font-bold mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                name='ratingStars'
                value={ rating.toString()}
                className={`ml-2 text-2xl ${rating >= value ? 'text-yellow-400' : 'text-gray-400'} mr-1`}
                onClick={() => handleStarClick(value)}
              >
                ★
              </button>
                
              ))}

          </div>
          <input
                name="rating"
                value={rating}
                type="range"
                // hidden
                min="1"
                max="5"
                step="1"
                onChange={(e) => setRating(Number(e.target.value))}
              ></input>
        </div>
    </div>
  );
};