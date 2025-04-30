import React, { createContext, useContext, useState, useEffect } from "react";
import { Review } from "@/types";
import { reviews as initialReviews } from "@/data/reviews";

type ReviewContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  deleteReview: (id: string) => void;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load reviews from localStorage or use initial data
    const storedReviews = localStorage.getItem("hotelReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(initialReviews);
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("hotelReviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews((prev) => [...prev, newReview]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const value = {
    reviews,
    addReview,
    deleteReview,
  };

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
};