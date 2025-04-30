import React from "react";
import { useReviews } from "@/contexts/ReviewContext";
import { Star } from "lucide-react";

interface ReviewsListProps {
  limit?: number;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ limit }) => {
  const { reviews } = useReviews();
  
  // Sort reviews by date (most recent first) and limit if needed
  const displayedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit || reviews.length);

  return (
    <div className="space-y-6">
      {displayedReviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{review.userName}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < review.rating ? "fill-accent-gold-500 text-accent-gold-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(review.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {review.roomType && (
                <p className="text-sm text-primary-600 mt-1">
                  Habitación: {review.roomType}
                </p>
              )}
            </div>
          </div>
          <p className="mt-3 text-gray-700">{review.comment}</p>
        </div>
      ))}
      
      {displayedReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">Aún no hay reseñas disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;